import { lazy, Suspense } from "react";
import "./styles.css";

const SME = lazy(() =>
  import("./sme").then((module) => ({ default: module.SME }))
);

export const CAM = ({ camData }) => {
  let ComponentToRender;
  ComponentToRender = SME;
  return (
    <Suspense fallback={<span>loading..</span>}>
      <ComponentToRender data={camData?.data} others={camData?.others} />
      <div className="divFooter">UNCLASSIFIED</div>
    </Suspense>
  );
};
