import React, { useState } from "react";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { APISDK } from "registry/fns/sdk";
import { useNavigate } from "react-router-dom";
import { InputMaskCustom } from "components/derived/inputMask";
import { useStyles } from "./style";
import CircularProgress from "@material-ui/core/CircularProgress";

export const LoginWithOTP = ({ transactionId }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [error, setError] = useState("");
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    try {
      let refId = "1044";
      const result = await APISDK.verifyOTP(refId, transactionId, otp);
      if (result.status === "success") {
        setLoading(false);
        navigate("/thankyou");
      } else {
        setLoading(false);
        setError(result.data.error_msg);
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  return (
    <div className={classes.formWrap}>
      <TextField
        label="OTP"
        placeholder="Enter OTP for verification"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        name="otp"
        value={otp}
        onChange={handleChange}
        inputProps={{ maxLength: 6 }}
        error={Boolean(error)}
        helperText={error}
        InputProps={{
          inputComponent: InputMaskCustom,
          inputProps: {
            MaskProps: {
              mask: "0 0 0 0 0 0",
            },
          },
        }}
      />
      <Button
        onClick={verifyOtp}
        className={classes.loginBtn}
        endIcon={loading ? <CircularProgress size={20} /> : null}
      >
        Verify OTP
      </Button>
    </div>
  );
};
