import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginControl from "./login";

import useStyles from "./styles";

const Auth = () => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.container}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Routes>
          <Route path="/login" element={<LoginControl />} />
          <Route path="/forgot" element={<h1>Forgot</h1>} />
        </Routes>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.loginBanner} />
    </Grid>
  );
};

export default Auth;
