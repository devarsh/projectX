import { LOSSDK } from "registry/fns/los";
import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { CAM } from "./cam";

export const CAMLOSWrapper = () => {
  const refID = "89";
  const result = useQuery(["getCAMData", refID], () =>
    LOSSDK.getCAMData({ refID })
  );
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
    <CAM camData={result.data} />
  );
  return renderResult;
};
