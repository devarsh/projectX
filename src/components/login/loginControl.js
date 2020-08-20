import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as yup from "yup";
import useStyles from "./styles";
import Copyright from "./copyright";
import { yupSchemaValidator } from "./common.js";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

// dummy request maker
const serverLogin = (username, password) => {
  return new Promise((res) => {
    setTimeout(() => {
      if (username === "devarshmshah@gmail.com" && password === "1234") {
        res({ status: true });
      } else {
        res({ status: false });
      }
    }, 1000);
  });
};

// validation schema
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Enter an email address")
    .email("Enter a valid email address"),
  password: yup.string().required("Enter a password"),
});

const initialState = {
  values: null,
  touched: null,
  errors: null,
  serverSentErrors: null,
  isLoading: false,
  isPasswordVisible: false,
  rememberMe: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "setValue":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
      };
    case "setTouched":
      return {
        ...state,
        touched: { ...state.touched, [action.name]: true },
      };
    case "setErrors":
      return {
        ...state,
        errors: action.value,
      };
    case "resetForm":
      return initialState;
    case "touchAll":
      return {
        ...state,
        touched: action.value,
      };
    case "submit":
      return {
        ...state,
        isLoading: true,
        serverSentErrors: null,
      };
    case "submitFailure":
      return { ...state, isLoading: false, serverSentErrors: action.value };
    case "togglePasswordVisibility":
      return { ...state, isPasswordVisible: !state.isPasswordVisible };
    case "toggleRememberMe":
      return { ...state, rememberMe: !state.rememberMe };
    default:
      return state;
  }
};

const LoginControl = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(loginReducer, initialState);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.persist();
    e.preventDefault();
    const fields = {
      username: true,
      password: true,
    };
    let res = yupSchemaValidator(schema, state.values);
    if (res.type === "error") {
      dispatch({ type: "setErrors", value: res.result });
      dispatch({ type: "touchAll", value: fields });
    } else if (res.type === "failure") {
      dispatch({ type: "submitFailure", value: res.result });
    } else {
      dispatch({ type: "submit" });
      let loginResult = await serverLogin(
        res.result?.username,
        res.result?.password
      );
      if (loginResult.status === true) {
        if (window.PasswordCredential) {
          console.log(e.target);
          let c = await new window.PasswordCredential({
            password: state.values.password,
            id: "password",
          });
          navigator.credentials.store(c);
        }
        dispatch({ type: "resetForm" });
      } else {
        dispatch({
          type: "submitFailure",
          value:
            "Wrong Username or Password. Try again or click Forgot password to reset it",
        });
      }
    }
  };
  const handleValidation = () => {
    let res = yupSchemaValidator(schema, state.values);
    if (res.type === "error") {
      dispatch({ type: "setErrors", value: res.result });
    } else if (res.type === "failure") {
      dispatch({ type: "submitFailure", value: res.result });
    } else {
      dispatch({ type: "setErrors", value: null });
    }
  };
  const handleChange = (e) => {
    dispatch({ type: "setValue", name: e.target.name, value: e.target.value });
  };
  const handleBlur = (e) => {
    dispatch({ type: "setTouched", name: e.target.name });
    handleValidation();
  };
  const handlePasswordVisiblity = () => {
    dispatch({ type: "togglePasswordVisibility" });
  };
  const handleRememberMe = () => {
    dispatch({ type: "toggleRememberMe" });
  };
  const handleForgotPageNavigation = (e) => {
    navigate("./forgot", { state: { email: state.values?.username } });
  };
  return (
    <React.Fragment>
      {state.isLoading ? <LinearProgress color="secondary" /> : null}
      <Box className={classes.loginControllerContainer}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {(state.serverSentErrors ?? "") !== "" ? (
          <Alert severity="error" variant="filled" className={classes.alert}>
            {state.serverSentErrors}
          </Alert>
        ) : null}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="username email"
            type="email"
            autoFocus
            value={state.values?.username ?? ""}
            error={
              (state.touched?.username ?? false) &&
              (state.errors?.username ?? false)
                ? true
                : false
            }
            helperText={
              (state.touched?.username ?? false) &&
              (state.errors?.username ?? false)
                ? state.errors.username
                : null
            }
            disabled={state?.isLoading ?? false}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            type={state.isPasswordVisible ? "text" : "password"}
            value={state.values?.password ?? ""}
            error={
              (state.touched?.password ?? false) &&
              (state.errors?.password ?? false)
                ? true
                : false
            }
            helperText={
              (state.touched?.password ?? false) &&
              (state.errors?.password ?? false)
                ? state.errors.password
                : null
            }
            disabled={state?.isLoading ?? false}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisiblity}
                    edge="end"
                  >
                    {state.isPasswordVisible ?? false ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            disabled={state.isLoading ?? false}
            control={
              <Checkbox
                value={true}
                name="rememberMe"
                color="primary"
                checked={state.rememberMe ?? false === true}
                onChange={handleRememberMe}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={state?.isLoading ?? false}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                component="button"
                variant="body2"
                className={clsx(
                  classes.link,
                  (state.isLoading ?? false) && classes.disableLink
                )}
                onClick={handleForgotPageNavigation}
              >
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default LoginControl;
