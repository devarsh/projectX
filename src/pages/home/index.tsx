import { Fragment } from "react";
import CoreProducts from "./coreProducts";
import BecomePartner from "./becomePartner";
import classes from "*.module.css";

const Home = () => (
  <div className="HomeWrap">
    <CoreProducts />
    <BecomePartner />
  </div>
);

export default Home;
