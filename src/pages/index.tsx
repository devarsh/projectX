import "meta/fns";
//always import this first before importing dynamic form
//to ensure all our functions are registered
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import "index.css";

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
        <Route path="form/:formName" element={<DynamicForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default Index;
