import { lazy, Suspense } from "react";
import { LOSSDK } from "registry/fns/los";
import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import "./styles.css";

const SME = lazy(() =>
  import("./sme").then((module) => ({ default: module.SME }))
);

export const CAM = () => {
  const refID = "89";
  const result = useQuery(["getCAMData", refID], () =>
    LOSSDK.getCAMData({ refID })
  );
  let ComponentToRender;
  if (result.isSuccess) {
    ComponentToRender = SME;
  }
  const renderResult = result.isLoading ? (
    <img src={loaderGif} height="50px" width="50px" alt="loader" />
  ) : result.isError ? (
    <span>
      {
        //@ts-ignore
        result.error?.error_msg ?? "unknown error occured"
      }
    </span>
  ) : (
    <Suspense fallback={<span>loading..</span>}>
      <ComponentToRender
        data={result.data?.data}
        others={result?.data?.others}
      />
      <div className="divFooter">UNCLASSIFIED</div>
    </Suspense>
  );
  return renderResult;
};
