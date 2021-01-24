import { useCallback } from "react";
import DataGrid from "components/dataTable";
import { LOSSDK } from "registry/fns/los";
import { useQuery } from "react-query";

export const InquiryGrid = ({
  gridCode,
  actions,
  setAction,
  gridRefresh,
  setGridRefresh,
}) => {
  const getGridColumnFilterData = useCallback(
    LOSSDK.getGridColumnFilterData(gridCode),
    [gridCode]
  );
  const getGridData = useCallback(LOSSDK.getGridData(gridCode), [gridCode]);
  const result = useQuery(
    ["gridMetaData", gridCode],
    () => LOSSDK.getGridMetaData(gridCode),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const loading = result.isLoading;
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
      key={gridCode}
      metaData={result.data}
      gridCode={gridCode}
      getGridData={getGridData}
      getGridColumnFilterData={getGridColumnFilterData}
      actions={actions}
      setAction={setAction}
      gridRefresh={gridRefresh}
      setGridRefresh={setGridRefresh}
    />
  );
};
