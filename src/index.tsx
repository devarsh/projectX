import ReactDOM from "react-dom";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";
import App from "./app";
//import App from "packages/form/examples/01-basic";
//@ts-ignore
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
