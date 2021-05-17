import { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const Mobile = ({ flow, setFlow }) => {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const handleMobileNumberSubmit = () => {
    if (!Boolean(mobile)) {
      setMobileError("This field is required");
    } else {
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
        Dear customer, we couldnt find credit information for your registered
        mobile no, but the following numbers are registered under your pan
        {flow?.data}
      </Typography>

      <TextField
        autoFocus
        id="mobile"
        type="text"
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
