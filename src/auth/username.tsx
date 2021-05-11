import { Fragment, useCallback, useState } from "react";
import { TextField } from "components/styledComponent/textfield";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GradientButton } from "components/styledComponent/button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { NumberFormatCustom } from "components/derived/numberFormat";

export const UsernameField = ({
  loginType,
  classes,
  loginState,
  verifyUsername,
}) => {
  const [userName, setUsername] = useState("");
  const handleChange = useCallback((e) => setUsername(e.target.value), [
    setUsername,
  ]);

  return (
    <Fragment>
      <div className="text">
        {["employee", "partner"].indexOf(loginType) >= 0
          ? "Login with your registered userID"
          : "Login with your registered Mobile Number"}
      </div>
      <div className={classes.formWrap}>
        <TextField
          autoFocus={true}
          label={
            ["employee", "partner"].indexOf(loginType) >= 0
              ? "User ID"
              : "Mobile No"
          }
          fullWidth
          type={"text"}
          className="mobileNumber"
          name="phoneNumber"
          value={userName}
          onChange={handleChange}
          onKeyDown={(e) => e.keyCode === 13 && verifyUsername(userName)}
          error={loginState.isError}
          helperText={loginState.isError ? loginState.userMessage : ""}
          InputLabelProps={{ shrink: true }}
          disabled={loginState.loading}
          prefix={loginType === "customer" ? "+91" : ""}
          InputProps={
            loginType === "customer"
              ? {
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                  inputComponent: NumberFormatCustom,
                  inputProps: {
                    FormatProps: {
                      format: "##########",
                      isAllowed: (values) => {
                        if (values.floatValue === 0) {
                          return false;
                        }
                        return true;
                      },
                    },
                  },
                }
              : {}
          }
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "8px",
          }}
        >
          <GradientButton
            disabled={loginState.loading}
            endIcon={loginState.loading ? <CircularProgress size={20} /> : null}
            onClick={() => verifyUsername(userName)}
          >
            Next
          </GradientButton>
        </div>
      </div>
    </Fragment>
  );
};
