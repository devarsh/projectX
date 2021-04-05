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
import { CAMContext } from "../context";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import { MetaData } from "./metaData";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
};

export const MyGridWrapper = forwardRef<any, GridWrapperType>(
  ({ actions, setAction }, ref) => {
    const { getGridCAMData } = useContext(CAMContext);
    const removeCache = useContext(ClearCacheContext);
    const wrapperKeyDataRef = useRef(
      cacheWrapperKeyGen(Object.values(getGridCAMData.args))
    );
    const result = useQuery<any, any, any>(
      ["getGridCAMData", wrapperKeyDataRef.current],
      () => getGridCAMData.fn(getGridCAMData.args)
    );
    useEffect(() => {
      removeCache?.addEntry("getGridCAMData", wrapperKeyDataRef.current);
    }, [removeCache]);
    useImperativeHandle(ref, () => ({
      refetch: () => result.refetch(),
    }));
    const loading = result.isLoading || result.isFetching;

    const renderResult = result.isError ? (
      <span>{result.error?.error_msg ?? "unknown error occured"}</span>
    ) : (
      <GridWrapper
        key={`camGridListing`}
        finalMetaData={MetaData as GridMetaDataType}
        data={transformData(result.data ?? [])}
        setData={() => null}
        actions={actions}
        setAction={setAction}
        loading={loading}
        refetchData={() => result.refetch()}
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
