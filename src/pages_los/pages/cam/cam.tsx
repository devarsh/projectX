import { lazy, Suspense } from "react";
import "./styles.css";

const SME = lazy(() =>
  import("./sme").then((module) => ({ default: module.SME }))
);

const Infra = lazy(() =>
  import("./infra").then((module) => ({ default: module.Infra }))
);

const Unsecured = lazy(() =>
  import("./unsecured").then((module) => ({
    default: module.Unsecured,
  }))
);

const RetailHome = lazy(() =>
  import("./retailHome").then((module) => ({ default: module.RetailHome }))
);

export const CAM = ({ camData }) => {
  let ComponentToRender = selectComponent(camData);
  return (
    <Suspense fallback={<span>loading..</span>}>
      <ComponentToRender data={camData?.data} others={camData?.others} />
    </Suspense>
  );
};

const selectComponent = ({ others }) => {
  const { productID } = others;
  switch (productID) {
    case "12300001":
    case "12300002":
    case "12300003":
    case "12300004": {
      return RetailHome;
    }
    case "12300005":
    case "12300006":
    case "12300007":
    case "12300008":
    case "12300009":
    case "123000010": {
      return SME;
    }
    case "123000011":
    case "123000012": {
      return Infra;
    }
    case "123000013":
    case "123000014": {
      return Unsecured;
    }
    default: {
      return CAM_NOT_AVAILABLE;
    }
  }
};

const CAM_NOT_AVAILABLE = ({ others: { productID } }) => {
  return <div>No CAM avaiable for productID {productID}</div>;
};
