import ReactDOM from "react-dom";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";
import App from "app/crm";
import LosApp from "app/los";
//import App from "app/los";
import "mock";

require("dotenv").config();

// const BUILD_TARGETS: { name: string; path: string }[] = [
//   {
//     name: "crm",
//     path: "./app/crm",
//   },
//   {
//     name: "los",
//     path: "./app/los",
//   },
// ];

// //@ts-ignore
// const { path } = BUILD_TARGETS.find(
//   ({ name }) => process.env.REACT_APP_ENTRY_POINT === name
// );

// import(`${path}`).then(({ default: BuildTarget }) => {
//   ReactDOM.render(<BuildTarget />, document.getElementById("root"));
// });

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<LosApp />, document.getElementById("los"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
