import { Fragment } from "react";
import { TextField } from "components/styledComponent/textfield";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

export const UsernameField = ({
  loginType,
  classes,
  loginState,
  verifyUsername,
  handleUsername,
}) => {
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
              ? "UserID"
              : "Mobile No"
          }
          fullWidth
          type={loginType === "customer" ? "number" : "email"}
          className="mobileNumber"
          name="phoneNumber"
          value={loginState?.username ?? ""}
          onChange={handleUsername}
          error={loginState.isError}
          helperText={loginState.isError ? loginState.userMessage : ""}
          InputLabelProps={{ shrink: true }}
          disabled={loginState.loading}
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
