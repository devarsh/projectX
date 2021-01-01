import { FC, useEffect, useState, useMemo, useCallback, useRef } from "react";
import { GridMetaDataType } from "./types";
import {
  formatSortBy,
  formatFilterBy,
  useFilterState,
  useLocalFilterState,
} from "./utils";
import { APISDK } from "registry/fns/sdk";

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
  const lastAppliedFilterRef = useRef(null);
  const resetPaginationAndSorting = useRef(false);
  const resetTableFilters = useRef(false);
  const headerFilterManager = useFilterState();
  const localFilterManager = useLocalFilterState();
  const { state: headerFilterState } = headerFilterManager;

  useEffect(() => {
    resetPaginationAndSorting.current = false;
    resetTableFilters.current = false;
  }, [data]);

  const fetchData = useCallback(
    ({ pageSize, pageIndex, sortBy, filters }) => {
      if (lastAppliedFilterRef.current !== filters) {
        resetPaginationAndSorting.current = true;
      }
      const currentFetchId = ++fetchIdCounterRef.current;
      setLoading(true);
      const startRow = Number(pageSize) * Number(pageIndex) + 1;
      const endRow = Number(startRow) + Number(pageSize) - 1;
      let localFilters = formatFilterBy(filters);
      let headerFilters: any[] = [];
      if (headerFilterState !== null) {
        headerFilters = Object.values(headerFilterState);
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
            lastAppliedFilterRef.current = filters;
          } else {
            setLoading(false);
          }
        }
      });
    },
    [setTotalRecords, setLoading, setData, headerFilterState]
  );

  return (
    <DataGrid
      gridCode={gridCode}
      label={metaData.gridConfig?.gridLabel ?? "NO_NAME"}
      dense={true}
      headerFilters={metaData.headerFilters ?? []}
      headerFilterManager={headerFilterManager}
      localFilterManager={localFilterManager}
      getRowId={getRowId}
      columns={columns}
      filterTypes={filterTypes}
      defaultColumn={defaultColumn}
      defaultHiddenColumns={metaData.hiddenColumns}
      loading={loading}
      data={data}
      onFetchData={fetchData}
      resetPaginationAndSorting={resetPaginationAndSorting.current}
      resetFilters={resetTableFilters.current}
      pageCount={pageCount}
      totalRecords={totalRecords}
      pageSizes={metaData.gridConfig?.pageSize}
      defaultPageSize={metaData.gridConfig?.defaultPageSize}
      allowColumnReorder={metaData.gridConfig?.allowColumnReorder ?? false}
      allowColumnHiding={metaData.gridConfig?.allowColumnHiding ?? false}
      allowKeyboardNavigation={
        metaData.gridConfig?.allowKeyboardNavigation ?? false
      }
    />
  );
};
