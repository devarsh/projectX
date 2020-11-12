// const Abc = () => <div>Hi</div>;

// export default Abc;
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Header from "../dashboard/employee/header";
import Dashboard from "../dashboard/employee/tables/lead";

const Index = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Fragment>
  );
};

export default Index;
