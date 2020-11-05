import ReactDOM from "react-dom";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";
import App from "app";

import { APISDK } from "registry/fns/sdk";
APISDK.createSession("http://10.0.0.9:8081/");

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
