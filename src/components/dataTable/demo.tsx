import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { makeData } from "./makeData";
import {
  useTable,
  usePagination,
  useSortBy,
  useResizeColumns,
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

/*
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  colCellWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  colCell: {
    display: "flex",
    position: "relative",
    padding: "0px 16px",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: "0.875rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  
}));
*/

const serverData = makeData(1000);

export const App = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "firstName",
        columnName: "First Name",
        TableCellProps: {
          align: "right",
        },
      },
      {
        accessor: "lastName",
        columnName: "Last Name",
      },
      {
        accessor: "age",
        columnName: "Age",
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
      },
    ],
    []
  );
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      maxWidth: 400,
      minWidth: 100,
      Header: DefaultHeaderRenderer,
    }),
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
      defaultColumn={defaultColumn}
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
    />
  );
};

const DataTable = ({
  columns,
  defaultColumn,
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
    rows,
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
      defaultColumn,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
    useBlockLayout,
    useResizeColumns
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
                  return (
                    <TableCell
                      component="div"
                      variant="head"
                      {...column.TableCellProps}
                      {...column.getHeaderProps([
                        {
                          style: { position: "relative" },
                        },
                        column.getSortByToggleProps(),
                      ])}
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
    </TableContainer>
  );
};

const DefaultHeaderRenderer = ({ column }) => {
  console.log(column);
  /*eslint-disable react-hooks/rules-of-hooks*/
  const spanEl = useRef(null);
  useEffect(() => {
    console.log(column.columnName, "-mounted");
    return () => {
      console.log(column.columnName, "-unmounted");
    };
  });

  return (
    <>
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc ? "desc" : "asc"}
      >
        <span
          ref={spanEl}
          style={{
            overflow: "hidden",
            textOverflow: "ellpsis",
            whiteSpace: "nowrap",
          }}
        >
          {column.columnName}
        </span>
      </TableSortLabel>

      <div
        {...column.getResizerProps([
          {
            style: {
              display: "inline-block",
              position: "absolute",
              right: "-12px",
            },
          },
        ])}
      >
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

/*
<TableBody component="div" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow component="div" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      component="div"
                      variant="body"
                      {...cell.getCellProps([{ ...cell.TableCellProps }])}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
*/
