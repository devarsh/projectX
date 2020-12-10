import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { makeData } from "./makeData";
import {
  DefaultCellRenderer,
  DefaultColumnFilter,
  DefaultHeaderColumnRenderer,
} from "./components";

import { DataTable } from "./viewport";

const TotalRecords = 75;

const serverData = makeData(TotalRecords);

export const App = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "firstName",
        columnName: "First Name",
      },
      {
        accessor: "lastName",
        columnName: "Last Name",
      },
      {
        accessor: "age",
        columnName: "Age",
        TableCellProps: {
          align: "right",
        },
      },
      {
        accessor: "visits",
        columnName: "Visits",
      },
      {
        accessor: "status",
        columnName: "Status",
      },
      {
        accessor: "progress",
        columnName: "Progress Percentage",
        TableCellProps: {
          align: "right",
        },
      },
    ],
    []
  );
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      maxWidth: 400,
      minWidth: 50,
      Header: DefaultHeaderColumnRenderer,
      Cell: DefaultCellRenderer,
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const [dense] = useState(true);
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
      console.log(pageSize, pageIndex, sortBy, filters);
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

  const getRowId = useCallback((row) => {
    return row.id;
  }, []);

  return (
    <DataTable
      tableName={"Demo Table"}
      dense={dense}
      columns={columns}
      defaultColumn={defaultColumn}
      data={data}
      onFetchData={fetchData}
      loading={loading}
      getRowId={getRowId}
      totalRecords={totalRecords}
      pageCount={pageCount}
      resetPaginationAndSorting={resetPaginationAndSorting.current}
    />
  );
};
