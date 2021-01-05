import { FC, useState, useMemo, useCallback, useRef } from "react";
import { GridMetaDataType } from "./types";
import { formatSortBy, formatFilterBy, useLocalFilterState } from "./utils";
import { APISDK } from "registry/fns/sdk";
import { useRecoilValue } from "recoil";
import { filtersAtom } from "./atoms";

import { DefaultHeaderColumnRenderer } from "./components";
import { DataGrid } from "./grid";
import { filtersRegistration } from "./components/filters";

export const GirdController: FC<{
  metaData: GridMetaDataType;
  gridCode: string;
}> = ({ metaData, gridCode }) => {
  const columns = useMemo(() => metaData.columns, []);
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      maxWidth: 400,
      minWidth: 50,
      Header: DefaultHeaderColumnRenderer,
    }),
    []
  );
  const getRowId = useCallback(
    (row) => row[metaData.gridConfig.rowIdColumn],
    []
  );
  const filterTypes = useMemo(() => filtersRegistration, []);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdCounterRef = useRef(0);
  const localFilterManager = useLocalFilterState();
  const globalFiltersState = useRecoilValue(filtersAtom(gridCode));

  const fetchData = useCallback(
    ({ pageSize, pageIndex, sortBy, filters }) => {
      setLoading(true);
      const currentFetchId = ++fetchIdCounterRef.current;
      const startRow = Number(pageSize) * Number(pageIndex) + 1;
      const endRow = Number(startRow) + Number(pageSize) - 1;
      let localFilters = formatFilterBy(filters);
      let headerFilters: any[] = [];
      if (globalFiltersState !== null) {
        headerFilters = Object.values(globalFiltersState);
      }
      let combinedFilters = [...headerFilters, ...localFilters];

      APISDK.fetchGridData(
        gridCode,
        startRow,
        endRow,
        formatSortBy(sortBy),
        combinedFilters
      ).then((result) => {
        if (currentFetchId === fetchIdCounterRef.current) {
          if (result.status === "success") {
            setData(result?.data?.rows ?? []);
            setPageCount(
              Math.ceil(
                Number(result?.data?.total_count ?? 1) / Number(pageSize)
              )
            );
            setTotalRecords(Number(result?.data?.total_count ?? 1));
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      });
    },
    [setTotalRecords, setLoading, setData, globalFiltersState]
  );

  return (
    <DataGrid
      gridCode={gridCode}
      label={metaData.gridConfig?.gridLabel ?? "NO_NAME"}
      globalFilterMeta={metaData?.headerFilters}
      dense={true}
      localFilterManager={localFilterManager}
      globalFiltersState={globalFiltersState}
      getRowId={getRowId}
      columns={columns}
      filterTypes={filterTypes}
      defaultColumn={defaultColumn}
      defaultHiddenColumns={metaData.hiddenColumns}
      loading={loading}
      data={data}
      onFetchData={fetchData}
      pageCount={pageCount}
      totalRecords={totalRecords}
      pageSizes={metaData.gridConfig?.pageSize}
      defaultPageSize={metaData.gridConfig?.defaultPageSize}
      allowColumnReordering={metaData.gridConfig?.allowColumnReordering ?? true}
      allowColumnHiding={metaData.gridConfig?.allowColumnHiding ?? true}
      allowKeyboardNavigation={
        metaData.gridConfig?.allowKeyboardNavigation ?? true
      }
      allowGlobalFilter={metaData.gridConfig?.allowGlobalFilter ?? true}
    />
  );
};
