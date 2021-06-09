import {
  useContext,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  Fragment,
} from "react";
import Alert from "@material-ui/lab/Alert";
import { useQuery } from "react-query";
import GridWrapper from "components/dataTableStatic";
import { ActionTypes, GridMetaDataType } from "components/dataTable";
import { ClearCacheContext, cacheWrapperKeyGen } from "cache";
import { GridMetaData } from "./metaData";
import { AnalysisAPIContext } from "../context";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
  transformData?: any;
  defaultSortOrder?: any;
  defaultGroupBy?: any;
};

export const APIGrid = forwardRef<any, GridWrapperType>(
  (
    {
      actions,
      setAction,
      transformData = (data) => data,
      defaultGroupBy,
      defaultSortOrder,
    },
    ref
  ) => {
    const removeCache = useContext(ClearCacheContext);
    const { getAnalysisAPIStatusData } = useContext(AnalysisAPIContext);
    const wrapperKeyDataRef = useRef(
      cacheWrapperKeyGen(Object.values(getAnalysisAPIStatusData.args))
    );
    const result = useQuery<any, any, any>(
      ["getAnalysisAPIStatusData", wrapperKeyDataRef.current],
      () => getAnalysisAPIStatusData.fn(getAnalysisAPIStatusData.args)
    );
    useEffect(() => {
      removeCache?.addEntry(
        "getAnalysisAPIStatusData",
        wrapperKeyDataRef.current
      );
    }, [removeCache]);
    useImperativeHandle(ref, () => ({
      refetch: () => result.refetch(),
    }));

    return (
      <Fragment>
        {result.isError ? (
          <Alert severity="error">
            {result.error?.error_msg ?? "Unkown error occured"}
          </Alert>
        ) : null}
        <GridWrapper
          key="AnalysisAPIGridStatusListing"
          finalMetaData={GridMetaData as GridMetaDataType}
          data={transformData(result.data ?? [])}
          setData={() => null}
          refetchData={() => result.refetch()}
          actions={actions}
          setAction={setAction}
          loading={result.isLoading || result.isFetching}
          defaultSortOrder={defaultSortOrder}
          defaultGroupBy={defaultGroupBy}
        />
      </Fragment>
    );
  }
);
APIGrid.displayName = "ExternalAPIStatusGridWrapper";
