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
import { StagesAPIContext } from "../context";
import { PriorityGridMetaData } from "./metaData";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
};

export const StagesGrid = forwardRef<any, GridWrapperType>(
  ({ actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const { getGridData } = useContext(StagesAPIContext);
    const wrapperKeyDataRef = useRef(
      cacheWrapperKeyGen(Object.values(getGridData.args))
    );
    const result = useQuery<any, any, any>(
      ["getStagesGridData", wrapperKeyDataRef.current],
      () => getGridData.fn(getGridData.args)()
    );
    useEffect(() => {
      removeCache?.addEntry("getStagesGridData", wrapperKeyDataRef.current);
    }, [removeCache]);
    useImperativeHandle(ref, () => ({
      refetch: () => result.refetch(),
    }));
    const loading = result.isLoading || result.isFetching;

    const renderResult =
      result.isError === true ? (
        <span>{result?.error?.error_msg ?? "unknown error occured"}</span>
      ) : (
        <GridWrapper
          key={`leadStagesListing`}
          finalMetaData={PriorityGridMetaData as GridMetaDataType}
          data={result.data ?? []}
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
StagesGrid.displayName = "StagesGridWrapper";
