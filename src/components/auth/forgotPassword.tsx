import React from "react";
import { useForm } from "packages/form";
import { TextField, FormFeedBack } from "components/common";
import { yupValidationHelper } from "components/utils";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as yup from "yup";
import useStyles from "./styles";
import Copyright from "./copyright";
//import { useLocation, useNavigate } from "react-router-dom";

const ForgotPasswordControl = () => {
  const classes = useStyles();
  //const location = useLocation();
  //const navigate = useNavigate();
  const onSubmitHandler = (values, submitStart, submitEnd, setFieldsError) => {
    submitStart();
    setTimeout(() => {
      console.log(values);
      submitEnd(false, "Invalid request");
    }, 3000);
  };

  const { handleSubmit, isSubmitting, submitSuccessful } = useForm({
    onSubmit: onSubmitHandler,
  });

  const goBackToLoginPageHandler = () => {
    //   navigate("/login");
  };
  return (
    <React.Fragment>
      {isSubmitting ? <LinearProgress color="secondary" /> : null}
      <Box className={classes.loginControllerContainer}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <FormFeedBack variant="filled" />
        <form
          className={classes.form}
          noValidate
          onSubmit={submitSuccessful ? goBackToLoginPageHandler : handleSubmit}
        >
          {submitSuccessful ? (
            <Alert
              severity="success"
              variant="filled"
              className={classes.alert}
            >
              We have just sent you a reset password link
            </Alert>
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              fieldKey="username"
              name="username"
              autoComplete="email"
              autoFocus
              validate={yupValidationHelper(
                yup
                  .string()
                  .required("username is a required field")
                  .email("username should be a valid email")
              )}
            />
          )}
          {submitSuccessful ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={goBackToLoginPageHandler}
            >
              Return to Login Page
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting ?? false}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default ForgotPasswordControl;
