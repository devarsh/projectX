import { lazy, Suspense } from "react";
import "./styles.css";

const SME = lazy(() =>
  import("./sme").then((module) => ({ default: module.SME }))
);

const Infra = lazy(() =>
  import("./infra").then((module) => ({ default: module.Infra }))
);

const unsecuredBusiness = lazy(() =>
  import("./unsecured").then((module) => ({
    default: module.UnsecuredPersonal,
  }))
);

const retailHome = lazy(() =>
  import("./retailHome").then((module) => ({ default: module.RetailHome }))
);

export const CAM = ({ camData }) => {
  let ComponentToRender;
  ComponentToRender = retailHome;
  return (
    <Suspense fallback={<span>loading..</span>}>
      <ComponentToRender data={camData?.data} others={camData?.others} />
      {/* <div className="divFooter">UNCLASSIFIED</div> */}
    </Suspense>
  );
};
