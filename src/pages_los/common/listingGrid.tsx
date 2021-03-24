import { useCallback, useEffect, forwardRef } from "react";
import DataGrid from "components/dataTable";
import { LOSSDK } from "registry/fns/los";
import { useQuery } from "react-query";
import { queryClient } from "cache";
import { ActionTypes } from "components/dataTable";

interface ListingGridType {
  gridCode: any;
  actions?: ActionTypes[];
  setAction: any;
}

export const ListingGrid = forwardRef<ListingGridType, any>(
  ({ gridCode, actions, setAction }, myRef) => {
    /* eslint-disable react-hooks/exhaustive-deps */
    const getGridColumnFilterData = useCallback(
      LOSSDK.getGridColumnFilterData(gridCode),
      [gridCode]
    );
    /* eslint-disable react-hooks/exhaustive-deps */
    const getGridData = useCallback(LOSSDK.getGridData(gridCode), [gridCode]);
    const result = useQuery(["gridMetaData", gridCode], () =>
      LOSSDK.getGridMetaData(gridCode)
    );
    useEffect(() => {
      return () => {
        queryClient.removeQueries(["gridMetaData", gridCode]);
      };
    }, [gridCode]);

    const loading = result.isLoading || result.isFetching;
    let isError = result.isError;
    let errorMsg =
      typeof result.error === "string"
        ? result.error
        : "cannot read error,unknown error";

    return loading ? (
      <div>loading..</div>
    ) : isError ? (
      <div>{errorMsg}</div>
    ) : (
      <DataGrid
        //@ts-ignore
        ref={myRef}
        key={gridCode}
        metaData={result.data}
        gridCode={gridCode}
        getGridData={getGridData}
        getGridColumnFilterData={getGridColumnFilterData}
        actions={actions}
        setAction={setAction}
      />
    );
  }
);
