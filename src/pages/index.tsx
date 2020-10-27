//always import this first before importing dynamic form
//to ensure all our functions are registered
import "meta/fnsRegistry";

//remove these after metaData comes from api
import myMetaData from "meta/metaData3";

import { Routes, Route } from "react-router-dom";
import ThankYouPage from "./thankyou";
import DynamicForm from "components/dyanmicForm";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<ThankYouPage />} />
      <Route path="forms" element={<DynamicForm metaData={myMetaData} />} />
      <Route path="thankyou" element={<ThankYouPage />} />
    </Routes>
  );
};

export default Index;
