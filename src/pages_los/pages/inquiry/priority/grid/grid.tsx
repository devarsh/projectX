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
import { PriorityAPIContext } from "../context";
import loaderGif from "assets/images/loader.gif";
import { PriorityGridMetaData } from "./metaData";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
};

export const PriorityGrid = forwardRef<any, GridWrapperType>(
  ({ actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const { getGridData } = useContext(PriorityAPIContext);
    const wrapperKeyDataRef = useRef(
      cacheWrapperKeyGen(Object.values(getGridData.args))
    );
    const result = useQuery(
      ["getPriorityGridData", wrapperKeyDataRef.current],
      () => getGridData.fn(getGridData.args)()
    );
    useEffect(() => {
      removeCache?.addEntry("getPriorityGridData", wrapperKeyDataRef.current);
    }, [removeCache]);
    useImperativeHandle(ref, () => ({
      refetch: () => result.refetch(),
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
        finalMetaData={PriorityGridMetaData as GridMetaDataType}
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
PriorityGrid.displayName = "PriorityGridWrapper";
