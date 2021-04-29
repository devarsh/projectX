import { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useStyles } from "./style";

export const EmailVerification = () => {
  const classes = useStyles();
  const result = (
    <Fragment>
      <Typography variant="h6">Email Verification</Typography>
      <br />
      <Typography variant="subtitle2">
        Dear customer, Enter OTP sent to your registered email
      </Typography>
      <Typography variant="subtitle2">
        address ending with <b>shah@gmail.com</b>
      </Typography>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        type="email"
        name="otp"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button>Verify</Button>
    </Fragment>
  );
  return (
    <div className={classes.paper}>
      <div className={classes.paper2}>{result}</div>
    </div>
  );
};
