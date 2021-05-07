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
    const { getVerificationAPIGridStatusData } = useContext(
      VerificationAPIContext
    );
    const wrapperKeyDataRef = useRef(
      cacheWrapperKeyGen(Object.values(getVerificationAPIGridStatusData.args))
    );
    const result = useQuery<any, any, any>(
      ["getVerificationAPIGridStatusData", wrapperKeyDataRef.current],
      () =>
        getVerificationAPIGridStatusData.fn(
          getVerificationAPIGridStatusData.args
        )
    );
    useEffect(() => {
      removeCache?.addEntry(
        "getVerificationAPIGridStatusData",
        wrapperKeyDataRef.current
      );
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
