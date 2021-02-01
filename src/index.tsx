import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import CRM from "app/crm";
import LOS from "app/los";
import "typeface-roboto";
import "registry"; //register functions to be used across application

require("dotenv").config();
require("mock");

const Redirect = () => {
  const navigate = useNavigate();
  setTimeout(() => navigate("crm/"), 1);
  return null;
};

const App = () => (
  <StrictMode>
    <RecoilRoot>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/los/*" element={<LOS />} />
          <Route path="/crm/*" element={<CRM />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
