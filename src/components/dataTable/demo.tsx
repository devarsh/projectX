import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { makeData } from "./makeData";
import {
  useTable,
  usePagination,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
  useRowSelect,
} from "react-table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableFooter from "@material-ui/core/TableFooter";
import Checkbox from "@material-ui/core/Checkbox";

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
        width: 90,
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
      minWidth: 70,
      Header: DefaultHeaderRenderer,
      Cell: DefaultCellRenderer,
    }),
    []
  );
  const getRowId = useCallback((row, relativeIndex, parent) => {
    return row.id;
  }, []);
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
      getRowId={getRowId}
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
  getRowId,
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
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      defaultColumn,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      manualPagination: true,
      pageCount: controlledPageCount,
      getRowId,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    useCheckboxColumn
  );

  console.log(selectedRowIds);

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
        <TableBody component="div" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <TableRow
                component="div"
                selected={row.isSelected}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      component="div"
                      variant="head"
                      {...cell.getCellProps([
                        { ...(cell?.column?.TableCellProps ?? {}) },
                        {
                          style: {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "flex",
                          },
                        },
                      ])}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const DefaultCellRenderer = ({ column, value }) => {
  return (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
};

const DefaultHeaderRenderer = ({ column }) => {
  return (
    <>
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc ? "desc" : "asc"}
        {...column.getSortByToggleProps([
          {
            style: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
            },
          },
        ])}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
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
              top: "calc(50% - 12px)",
              padding: "0 5px",
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

const CheckboxCellRenderer = ({ row }) => {
  return (
    <Checkbox
      size="small"
      {...row.getToggleRowSelectedProps([{ style: { padding: 0 } }])}
    />
  );
};

const CheckboxHeaderRenderer = ({ getToggleAllPageRowsSelectedProps }) => {
  return (
    <Checkbox
      size="small"
      {...getToggleAllPageRowsSelectedProps([{ style: { padding: 0 } }])}
    />
  );
};

const useCheckboxColumn = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    {
      id: "selection",
      Header: CheckboxHeaderRenderer,
      Cell: CheckboxCellRenderer,
      minWidth: 20,
      width: 20,
      maxWidth: 20,
    },
    ...columns,
  ]);
};
