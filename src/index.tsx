import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";
import App from "./components/query/index.js";
import * as serviceWorker from "./serviceWorker";
import { ReactQueryDevtools } from "react-query-devtools";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ReactQueryDevtools initialIsOpen={false} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
