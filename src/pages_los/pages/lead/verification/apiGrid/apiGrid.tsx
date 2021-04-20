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
import { GridMetaData } from "./metaData";
import { VerificationAPIContext } from "../context";

type GridWrapperType = {
  actions: ActionTypes[];
  setAction: any;
};

export const APIGrid = forwardRef<any, GridWrapperType>(
  ({ actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const { getAPIGridStatusData } = useContext(VerificationAPIContext);
    const wrapperKeyDataRef = useRef(
      cacheWrapperKeyGen(Object.values(getAPIGridStatusData.args))
    );
    const result = useQuery<any, any, any>(
      ["getAPIGridStatusData", wrapperKeyDataRef.current],
      () => getAPIGridStatusData.fn(getAPIGridStatusData.args)
    );
    useEffect(() => {
      removeCache?.addEntry("getAPIGridStatusData", wrapperKeyDataRef.current);
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
          key={`validationAPIGridStatusListing`}
          finalMetaData={GridMetaData as GridMetaDataType}
          data={result.data ?? []}
          setData={() => null}
          refetchData={() => result.refetch()}
          actions={actions}
          setAction={setAction}
          loading={loading}
        />
      );
    return renderResult;
  }
);
APIGrid.displayName = "ExternalAPIStatusGridWrapper";
