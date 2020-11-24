import ReactDOM from "react-dom";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";
import CRM from "app/crm";
import LOS from "app/los";
require("dotenv").config();
require("mock");
let App;
if (process.env.REACT_APP_ENTRY_POINT === "crm") {
  App = CRM;
} else {
  App = LOS;
}
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
