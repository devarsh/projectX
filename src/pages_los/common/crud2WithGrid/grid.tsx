import {
  FC,
  useContext,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import GridWrapper from "components/dataTableStatic";
import { LOSSDK } from "registry/fns/los";
import { useQuery } from "react-query";
import { ClearCacheContext } from "cache";
import { ActionTypes } from "components/dataTable";
type GridDataDisplayType = {
  metaData: any;
  refID: any;
  productType: string;
  actions: ActionTypes[];
  setAction: any;
};

export const GridDataDisplay = forwardRef<any, GridDataDisplayType>(
  ({ metaData, productType, refID, actions, setAction }, ref) => {
    const removeCache = useContext(ClearCacheContext);
    const result = useQuery(
      ["gridListing", productType, refID],
      () => LOSSDK.getLeadDetailsGridData(productType, refID),
      {
        cacheTime: 100000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      }
    );
    useEffect(() => {
      removeCache?.addEntry(["gridListing", productType, refID]);
    }, []);
    useImperativeHandle(ref, () => ({
      refetch: () => result.refetch(),
    }));
    const dataUniqueKey = result.dataUpdatedAt;
    const loading = result.isLoading || result.isFetching;
    let isError = result.isError;
    //@ts-ignore
    let errorMsg = `${result.error?.error_msg ?? ""}`;
    const renderResult =
      isError === true ? (
        <span>{errorMsg}</span>
      ) : (
        <GridWrapper
          key={`gridData-${dataUniqueKey}`}
          data={result.data ?? []}
          finalMetaData={metaData}
          setData={() => null}
          actions={actions}
          setAction={setAction}
          loading={loading}
        />
      );
    return renderResult;
  }
);
GridDataDisplay.displayName = "GridDataDisplay";
