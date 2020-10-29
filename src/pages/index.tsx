import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
//always import this first before importing dynamic form
//to ensure all our functions are registered
import "meta/fnsRegistry";
import "index.css";
//remove these after metaData comes from api
import myMetaData from "meta/metaData";

import ThankYouPage from "./thankyou";
import NotFoundPage from "./notFound";
import Header from "./header";
import Footer from "./footer";
import Home from "./home";
import DynamicForm from "components/dyanmicForm";

const Index = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="thankyou" element={<ThankYouPage />} />
        <Route
          path="forms/:formName"
          element={<DynamicForm metaData={myMetaData} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default Index;
