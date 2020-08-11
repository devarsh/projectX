import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as yup from "yup";
import useStyles from "./styles";
import Copyright from "./copyright";
import { yupSchemaValidatorSingle } from "./common.js";
import { useLocation, useNavigate } from "react-router-dom";

// dummy request maker
const sendRequest = (username) => {
  return new Promise((res) => {
    setTimeout(() => {
      if (username === "devarshmshah@gmail.com") {
        res({ status: true });
      } else {
        res({ status: false });
      }
    }, 2000);
  });
};

const schema = yup
  .string()
  .required("username is a required field")
  .email("username should be a valid email");

const initialState = {
  username: "",
  touched: false,
  error: null,
  serverSentError: null,
  isLoading: false,
  isSuccessful: false,
};

const initStateFn = (initValue) => {
  return { ...initialState, username: initValue };
};

const forgotPasswordReducer = (state, action) => {
  switch (action.type) {
    case "init":
    case "setValue":
      return { ...state, username: action.value };
    case "setTouched":
      return { ...state, touched: true };
    case "setError":
      return { ...state, error: action.value };
    case "resetForm":
      return initialState;
    case "submit":
      return { ...state, isLoading: true, serverSentError: null };
    case "submitFailure":
      return { ...state, isLoading: false, serverSentError: action.value };
    case "submitSuccess":
      return { ...state, isLoading: false, isSuccessful: true };
    default:
      return state;
  }
};

const ForgotPasswordControl = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(
    forgotPasswordReducer,
    location.state?.email ?? "",
    initStateFn
  );
  const handleValidation = () => {
    let res = yupSchemaValidatorSingle(schema, state.username);
    if (res.type === "error") {
      dispatch({ type: "setError", value: res.result });
    } else if (res.type === "failure") {
      dispatch({ type: "submitFailure", value: res.result });
    } else {
      dispatch({ type: "setError", value: null });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = yupSchemaValidatorSingle(schema, state.username);
    if (res.type === "error") {
      dispatch({ type: "setError", value: res.result });
    } else if (res.type === "failure") {
      dispatch({ type: "submitFailure", value: res.result });
    } else {
      dispatch({ type: "submit" });
      let submitResult = await sendRequest(res.result);
      console.log(submitResult);
      if (submitResult.status === true) {
        dispatch({ type: "submitSuccess" });
      } else {
        dispatch({ type: "submitFailure", value: "Failed to submit" });
      }
    }
  };
  const handleChange = (e) => {
    dispatch({ type: "setValue", value: e.target.value });
  };
  const handleBlur = () => {
    dispatch({ type: "setTouched" });
    setTimeout(handleValidation(), 1);
  };
  const goBackToLoginPageHandler = () => {
    navigate("/login");
  };
  return (
    <React.Fragment>
      {state.isLoading ? <LinearProgress color="secondary" /> : null}
      <Box className={classes.loginControllerContainer}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {(state.serverSentError ?? "") !== "" ? (
          <Alert severity="error" variant="filled" className={classes.alert}>
            {state.serverSentError}
          </Alert>
        ) : null}
        <form
          className={classes.form}
          noValidate
          onSubmit={
            state.isSuccessful ? goBackToLoginPageHandler : handleSubmit
          }
        >
          {state.isSuccessful ? (
            <Typography component="body2" color="textSecondary" align="center">
              Password reset link has been sent to {state.username}
            </Typography>
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              value={state.username ?? ""}
              error={
                (state.touched ?? false) && (state.error ?? false)
                  ? true
                  : false
              }
              helperText={
                (state.touched ?? false) && (state.error ?? false)
                  ? state.error
                  : null
              }
              disabled={state.isLoading ?? false}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {state.isSuccessful ? (
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
              disabled={state.isLoading ?? false}
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
