import { FC } from "react";
import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { CAM } from "./cam";
import * as API from "./api";

//remove default after testing
export const CAMLOSWrapper: FC<{ refID?: string }> = ({ refID = "89" }) => {
  const result = useQuery(["getCAMData", refID], () =>
    API.getCAMData({ refID })
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
