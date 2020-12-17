import { FC, useEffect, useState, useMemo, useCallback, useRef } from "react";
import {
  GridMetaDataType,
  GridTransformedMetaDataType,
  TransformedGridColumnType,
} from "./types";
import {
  attachComponentsToMetaData,
  attachFilterComponentToMetaData,
  attachAlignmentProps,
  extractHiddenColumns,
  sortColumnsBySequence,
} from "./utils";
import { APISDK } from "registry/fns/sdk";
import { DefaultHeaderColumnRenderer } from "./components";
import { DataGrid } from "./grid";

/*code to delete*/
import { makeData } from "./makeData";
const TotalRecords = 75;
const serverData = makeData(TotalRecords);

export const GridWrapper: FC<{ metaData: GridTransformedMetaDataType }> = ({
  metaData,
}) => {
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
  console.log(columns, defaultColumn, getRowId);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const prevFilters = useRef(null);
  const resetPaginationAndSorting = useRef(false);

  useEffect(() => {
    resetPaginationAndSorting.current = false;
  }, [data]);

  const fetchData = useCallback(
    ({ pageSize, pageIndex, sortBy, filters }) => {
      if (prevFilters.current !== filters) {
        resetPaginationAndSorting.current = true;
      }

      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          setData(serverData.slice(startRow, endRow));
          setPageCount(Math.ceil(serverData.length / pageSize));
        }
        setTotalRecords(serverData.length);
        setLoading(false);
        prevFilters.current = filters;
      }, 1000);
    },
    [setTotalRecords, setLoading, setData]
  );

  console.log(columns);

  return (
    <DataGrid
      label={metaData.gridConfig?.gridLabel ?? "NO_NAME"}
      dense={metaData.gridConfig?.dense ?? true}
      getRowId={getRowId}
      columns={columns}
      defaultColumn={defaultColumn}
      loading={loading}
      data={[]}
      pageCount={pageCount}
      totalRecords={totalRecords}
      resetPaginationAndSorting={resetPaginationAndSorting.current}
      filterOptions={{
        columnId: [],
      }}
      onFetchData={fetchData}
    />
  );
};

export const ParentGridWrapper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const runEffect = async () => {
      setLoading(true);
      let result = await APISDK.fetchGridMetaData("trn/001");
      console.log(result);
      if (result.status === "success") {
        setData(result.data);
        setError(false);
        setLoading(false);
      } else {
        setData(result.data);
        setError(true);
        setLoading(false);
      }
    };
    runEffect();
  }, []);

  return null;
};

const transformMetaData = (
  metaData: GridMetaDataType
): GridTransformedMetaDataType => {
  let columns = metaData.columns as any;
  columns = attachComponentsToMetaData(columns);
  columns = attachFilterComponentToMetaData(columns);
  columns = attachAlignmentProps(columns);
  columns = sortColumnsBySequence(columns);
  const hiddenColumns = extractHiddenColumns(columns);
  return {
    columns: columns,
    gridConfig: metaData.gridConfig,
    hiddenColumns: hiddenColumns,
  };
};
