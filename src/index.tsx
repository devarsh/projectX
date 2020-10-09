import { StrictMode } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";
import Copyright from "components/auth/copyright";
import * as serviceWorker from "./serviceWorker";

//@ts-ignore
ReactDOM.render(
  <StrictMode>
    <CssBaseline />
    <Copyright />
  </StrictMode>,
  document.getElementById("root")
);

//ReactDOM.render(document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
