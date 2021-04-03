import { Fragment, useCallback, useState, useRef } from "react";
import { TextField } from "components/styledComponent/textfield";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
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
          ? "Login with your registere userID"
          : "Login with your registered Mobile Number"}
      </div>
      <div className={classes.formWrap}>
        <TextField
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
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            disabled={loginState.loading}
            endIcon={loginState.loading ? <CircularProgress size={20} /> : null}
            onClick={() => verifyUsername(userName)}
          >
            Next
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
