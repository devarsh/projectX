import { Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import Pages from "./pages";

const Index = () => {
  return (
    <Fragment>
      <Header />
      <Pages />
      <Footer />
    </Fragment>
  );
};

export default Index;
