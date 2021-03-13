import {
  useContext,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { useQuery } from "react-query";
import GridWrapper from "components/dataTableStatic";
import { ActionTypes, GridMetaDataType } from "components/dataTable";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import loaderGif from "assets/images/loader.gif";
import { GridMetaData } from "./metaData";
import { ExternalAPIContext } from "../context";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
};

export const APIGrid = forwardRef<any, GridWrapperType>(
  ({ actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const { getAPIGridStatusData } = useContext(ExternalAPIContext);
    const wrapperKeyDataRef = useRef(
      cacheWrapperKeyGen(Object.values(getAPIGridStatusData.args))
    );
    const result = useQuery(
      ["getAPIGridStatusData", wrapperKeyDataRef.current],
      () => getAPIGridStatusData.fn(getAPIGridStatusData.args)
    );
    useEffect(() => {
      removeCache?.addEntry("getAPIGridStatusData", wrapperKeyDataRef.current);
    }, [removeCache]);
    useImperativeHandle(ref, () => ({
      refetch: () => result[1].refetch(),
    }));
    const loading = result.isLoading || result.isFetching;
    let isError = result.isError;
    //@ts-ignore
    let errorMsg = `${result.error?.error_msg}`;
    errorMsg = !Boolean(errorMsg) ? "unknown error occured" : errorMsg;
    const renderResult = loading ? (
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
    ) : isError === true ? (
      <span>{errorMsg}</span>
    ) : (
      <GridWrapper
        key={`externalAPIGridStatusListing`}
        finalMetaData={GridMetaData as GridMetaDataType}
        data={result.data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setAction}
        loading={loading}
      />
    );
    return renderResult;
  }
);
APIGrid.displayName = "ExternalAPIStatusGridWrapper";
