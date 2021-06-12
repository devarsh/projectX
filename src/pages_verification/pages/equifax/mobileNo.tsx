import { Fragment, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { InputMaskCustom } from "components/derived/inputMask";
import InputAdornment from "@material-ui/core/InputAdornment";

const parseNumber = (string) => {
  let result: any = `${string}`.split("~");
  result = result.filter((one) => one.indexOf("Phones") >= 0);
  result = result[0].split(":");
  result = result[1];
  result = result.split("|");
  result = result.map((one) => one.replaceAll("*", ""));
  result = result.map((one) => one.replaceAll("X", ""));
  result = result.filter((one) => Boolean(one));
  return result;
};

const matchNumber = (mobileNumber, registeredNumbers) => {
  if (Array.isArray(registeredNumbers)) {
    for (let i = 0; i < registeredNumbers.length; i++) {
      let slice = mobileNumber.slice(10 - registeredNumbers[i].length);
      if (slice === registeredNumbers[i]) {
        return true;
      }
    }
  }
  return false;
};

export const Mobile = ({ flow, setFlow }) => {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const registeredNumbers = useRef<any>(null);
  if (registeredNumbers.current === null) {
    registeredNumbers.current = parseNumber(flow?.data);
  }
  const handleMobileNumberSubmit = () => {
    if (!Boolean(mobile)) {
      setMobileError("This field is required");
    } else if (mobile.length !== 10) {
      setMobileError("Mobile should be of 10 digits");
    } else if (matchNumber(mobile, registeredNumbers.current) === false) {
      setMobileError(
        "The entered number does not match the numbers in our records"
      );
    } else {
      setMobileError("");
      setFlow({
        screen: "Alternate",
        data: mobile,
      });
    }
  };

  return (
    <Fragment>
      <h2>Credit Score</h2>
      <Typography variant="subtitle2">
        Dear customer, we couldn't find credit information for your registered
        MobileNo
      </Typography>
      <br />
      <Typography variant="subtitle2">
        We found the numbers ending with{" "}
        <b>{registeredNumbers.current.join(", ")}</b> registered under your PAN.
      </Typography>
      <br />
      <TextField
        autoFocus
        id="mobile"
        type="tel"
        name="mobile"
        label="Alternate Mobile Number"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setMobile(e.target.value);
        }}
        value={mobile}
        error={Boolean(mobileError)}
        helperText={mobileError}
        InputProps={{
          startAdornment: <InputAdornment position="start">+91</InputAdornment>,
          inputComponent: InputMaskCustom,
          inputProps: {
            MaskProps: {
              mask: "00000 00000",
              lazy: true,
            },
          },
        }}
      />
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={handleMobileNumberSubmit}>Procced</Button>
      </div>
    </Fragment>
  );
};
