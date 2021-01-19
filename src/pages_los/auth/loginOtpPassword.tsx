import React from "react";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import CircularProgress from "@material-ui/core/CircularProgress";

export const LoginWithOTPOrPwd = ({
  verifyOTPMethod,
  verifyPasswordMethod,
  handleChange,
  value,
  loginType,
  errorMessage,
  loading,
}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.formWrap}>
        <TextField
          label={loginType === "customer" ? "OTP" : "Password"}
          placeholder="Enter verification detail"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          type={loginType === "customer" ? "number" : "password"}
          name="otp"
          value={value}
          onChange={handleChange}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
        />
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            endIcon={loading ? <CircularProgress size={20} /> : null}
            onClick={
              loginType === "customer" ? verifyOTPMethod : verifyPasswordMethod
            }
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};
