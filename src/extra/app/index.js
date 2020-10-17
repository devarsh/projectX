import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Auth from "components/auth";

const App = () => {
  return (
    <Fragment>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<h1>dashboard</h1>} />
            <Route path="/authController/*" element={<Auth />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </Fragment>
  );
};

export default App;
