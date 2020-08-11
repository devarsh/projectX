import React from "react";
import { Routes, Route } from "react-router-dom";

import SignIn from "./components/login/index.js";
import Dashboard from "./components/dashboard";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login/*" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
