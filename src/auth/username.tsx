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
  handleUsername,
}) => {
  const [userName, setUsername] = useState(loginState?.username);
  const currentUserName = useRef<any>(null);
  currentUserName.current = userName;
  const handleChange = useCallback((e) => setUsername(e.target.value), [
    setUsername,
  ]);
  const handleBlur = useCallback(() => {
    handleUsername(currentUserName.current);
  }, [handleUsername]);

  return (
    <Fragment>
      <h2>
        {loginType === "employee"
          ? "Employee Login"
          : loginType === "customer"
          ? "Customer Login"
          : loginType === "partner"
          ? "Partner Login"
          : "ERRR!!"}
      </h2>
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
          onBlur={handleBlur}
          error={loginState.isError}
          helperText={loginState.isError ? loginState.userMessage : ""}
          InputLabelProps={{ shrink: true }}
          disabled={loginState.loading}
          prefix={loginType === "customer" ? "+91" : ""}
          InputProps={{
            startAdornment:
              loginType === "customer" ? (
                <InputAdornment position="start">+91</InputAdornment>
              ) : undefined,
            inputComponent: NumberFormatCustom,
            inputProps: {
              FormatProps:
                loginType === "customer"
                  ? {
                      format: "##########",
                      isAllowed: (values) => {
                        if (values.floatValue === 0) {
                          return false;
                        }
                        return true;
                      },
                    }
                  : {},
            },
          }}
        />
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            disabled={loginState.loading}
            endIcon={loginState.loading ? <CircularProgress size={20} /> : null}
            onClick={verifyUsername}
          >
            Next
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
