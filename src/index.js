import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";
//import App from "./App";
//import App from "./components/form";
import App from "./components/form/core/fieldArray";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
