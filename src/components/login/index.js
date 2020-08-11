import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Routes, Route } from "react-router-dom";
import LoginControl from "./loginControl";
import ForgotPassword from "./forgotPassword";
import useStyles from "./styles";

const SignInPage = () => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.container}>
      <Grid item xs={false} sm={4} md={7} className={classes.loginBanner} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Routes>
          <Route path="/" element={<LoginControl />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
