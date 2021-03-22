import {
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import GridWrapper from "components/dataTableStatic";
import { ActionTypes, GridMetaDataType } from "components/dataTable";
import { YearlyTargetCRUDContext } from "./context";
import { useQueries } from "react-query";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import loaderGif from "assets/images/loader.gif";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
  transformData?: any;
};
export const MyGridWrapper = forwardRef<any, GridWrapperType>(
  ({ actions, setAction, transformData = (data) => data }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const {
      getYearlyTargetGridData,
      getYearlyTargetListingGridMetaData,
      context,
    } = useContext(YearlyTargetCRUDContext);
    const wrapperKey = useRef<any>(null);
    if (wrapperKey.current === null) {
      wrapperKey.current = cacheWrapperKeyGen(
        Object.values(getYearlyTargetGridData.args)
      );
    }
    useEffect(() => {
      removeCache?.addEntry(["getYearlyTargetGridMetaData", context.userId]);
      removeCache?.addEntry(["getYearlyTargetGridData", wrapperKey.current]);
    }, [removeCache, context]);

    const result = useQueries([
      {
        queryKey: ["getYearlyTargetGridData", wrapperKey.current],
        queryFn: () => getYearlyTargetGridData.fn(getYearlyTargetGridData.args),
      },
      {
        queryKey: [
          "getYearlyTargetGridMetaData",
          context.userId,
          wrapperKey.current,
        ],
        queryFn: () =>
          getYearlyTargetListingGridMetaData.fn(
            getYearlyTargetListingGridMetaData.args
          ),
      },
    ]);

    useImperativeHandle(ref, () => ({
      refetch: () => result[0].refetch(),
    }));

    const loading = result[1].isLoading || result[1].isFetching;
    let isError = result[0].isError || result[1].isError;
    //@ts-ignore
    let errorMsg = `${result[0].error?.error_msg} ${result[0].error?.error_msg}`
      .trimStart()
      .trimEnd();
    errorMsg = !Boolean(errorMsg) ? "unknown error occured" : errorMsg;

    const renderResult = loading ? (
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
    ) : isError === true ? (
      <span>{errorMsg}</span>
    ) : (
      <GridWrapper
        key={`listingYearlyTarget`}
        data={transformData(result[0].data ?? [])}
        finalMetaData={result[1].data as GridMetaDataType}
        setData={() => null}
        actions={actions}
        setAction={setAction}
        loading={false}
      />
    );
    return renderResult;
  }
);
MyGridWrapper.displayName = "MyGridWrapper";
