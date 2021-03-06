import { useQuery } from "react-query";
import { CAM } from "pages_los/pages/cam";
import { MiddlewareSDK } from "registry/fns/middleware";
import loaderGif from "assets/images/loader.gif";
import { useParams } from "react-router-dom";

export const CAMMiddlewareWrapper = () => {
  const { refID } = useParams();
  const result = useQuery(["getCAMDataMiddleware", refID], () =>
    MiddlewareSDK.getCAMData({ refID })
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
