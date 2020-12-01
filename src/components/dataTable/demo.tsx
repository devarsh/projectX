import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { makeData } from "./makeData";
import {
  useTable,
  usePagination,
  useSortBy,
  useBlockLayout,
} from "react-table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableFooter from "@material-ui/core/TableFooter";

const serverData = makeData(1000);

export const App = () => {
  const columns = useMemo(
    () => [
      {
        Header: DefaultHeaderRenderer("First Name"),
        accessor: "firstName",
        TableCellProps: {
          align: "right",
        },
      },
      {
        Header: DefaultHeaderRenderer("Last Name"),
        accessor: "lastName",
      },
      {
        Header: DefaultHeaderRenderer("Age"),
        accessor: "age",
      },
      {
        Header: DefaultHeaderRenderer("Visits"),
        accessor: "visits",
      },
      {
        Header: DefaultHeaderRenderer("Status"),
        accessor: "status",
      },
      {
        Header: DefaultHeaderRenderer("Profile Progress"),
        accessor: "progress",
      },
    ],
    []
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(serverData.slice(startRow, endRow));
      }
      setPageCount(Math.ceil(serverData.length / pageSize));
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
    />
  );
};

const DataTable = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
    useBlockLayout
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <TableContainer>
      <Table component="div" {...getTableProps()}>
        <TableHead component="div">
          {headerGroups.map((headerGroup) => {
            return (
              <TableRow component="div" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  console.log(column);
                  return (
                    <TableCell
                      component="div"
                      variant="head"
                      {...column.TableCellProps}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>
      </Table>
      <TableBody component="div" {...getTableBodyProps()}></TableBody>
    </TableContainer>
  );
};

const DefaultHeaderRenderer = (columnName) => ({ column }) => {
  return (
    <>
      <span>{columnName}</span>
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc ? "desc" : "asc"}
      />
      <div style={{ display: "inline-block" }}>
        <svg
          className="MuiSvgIcon-root "
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M11 19V5h2v14z"></path>
        </svg>
      </div>
    </>
  );
};
