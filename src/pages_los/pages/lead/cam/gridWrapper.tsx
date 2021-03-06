import {
  useContext,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { useQueries } from "react-query";
import GridWrapper from "components/dataTableStatic";
import { ActionTypes, GridMetaDataType } from "components/dataTable";
import loaderGif from "assets/images/loader.gif";
import { CAMContext } from "./context";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import { MetaData } from "./metaData";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
};

export const MyGridWrapper = forwardRef<any, GridWrapperType>(
  ({ actions, setAction }, ref) => {
    const { getGridCAMMetaData, getGridCAMData } = useContext(CAMContext);
    const removeCache = useContext(ClearCacheContext);
    const wrapperKeyMetaRef = useRef(
      cacheWrapperKeyGen(Object.values(getGridCAMMetaData.args))
    );
    const wrapperKeyDataRef = useRef(
      cacheWrapperKeyGen(Object.values(getGridCAMData.args))
    );
    const result = useQueries([
      {
        queryKey: ["getGridCamMetaData", wrapperKeyMetaRef.current],
        queryFn: () => getGridCAMMetaData.fn(getGridCAMMetaData.args),
      },
      {
        queryKey: ["getGridCamData", wrapperKeyDataRef.current],
        queryFn: () => getGridCAMData.fn(getGridCAMData.args),
      },
    ]);
    useEffect(() => {
      removeCache?.addEntry("getGridCamMetaData", wrapperKeyMetaRef.current);
      removeCache?.addEntry("getGridCamData", wrapperKeyDataRef.current);
    }, [removeCache]);
    useImperativeHandle(ref, () => ({
      refetch: () => result[1].refetch(),
    }));
    const loading =
      result[0].isLoading ||
      result[1].isLoading ||
      result[0].isFetching ||
      result[1].isFetching;
    let isError = result[0].isError || result[1].isError;
    //@ts-ignore
    let errorMsg = `${result[0].error?.error_msg} ${result[1].error?.error_msg}`
      .trimStart()
      .trimEnd();
    errorMsg = !Boolean(errorMsg) ? "unknown error occured" : errorMsg;
    const renderResult = loading ? (
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
    ) : isError === true ? (
      <span>{errorMsg}</span>
    ) : (
      <GridWrapper
        key={`camGridListing`}
        //finalMetaData={result[0].data as GridMetaDataType}
        finalMetaData={MetaData as GridMetaDataType}
        data={transformData(result[1].data ?? [])}
        setData={() => null}
        actions={actions}
        setAction={setAction}
        loading={loading}
      />
    );
    return renderResult;
  }
);
MyGridWrapper.displayName = "CAMGridWrapper";

//logic to transform gridData

const transformData = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((one) => {
      const { status, lastUpdateDate, ...others } = one;
      if (status === "Initiated") {
        return { status, lastUpdateDate: "", ...others };
      }
      return one;
    });
  }
  return data;
};
