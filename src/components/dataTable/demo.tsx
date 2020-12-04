import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import ScrollBar from "react-perfect-scrollbar";
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
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from "@material-ui/core/TablePagination";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

const serverData = makeData(75);

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
  const getRowId = useCallback((row) => {
    return row.id;
  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dense] = useState(true);
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
      tableName={"Demo Table"}
      dense={dense}
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
  dense,
  tableName,
  columns,
  defaultColumn,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  getRowId,
}) => {
  const skipPageResetRef = useRef(false);
  const maxWidth = 998;

  const tableState = useTable(
    {
      columns,
      defaultColumn,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
      getRowId,
      autoResetPage: false,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    useCheckboxColumn
  );
  console.log(tableState);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    totalColumnsWidth,
    state: { pageIndex, pageSize },
  } = tableState;

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
    skipPageResetRef.current = true;
  }, [fetchData, pageIndex, pageSize]);

  const cellSize = dense ? 34 : 54;
  const emptyRows = pageSize - Math.min(pageSize, page.length);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Paper
      style={{
        width: totalColumnsWidth < maxWidth ? totalColumnsWidth : maxWidth,
      }}
    >
      <EnchancedToolbar
        tableName={tableName}
        dense={dense}
        getRowId={getRowId}
        selectedFlatRows={selectedFlatRows}
      />

      <TableContainer>
        <Table
          component="div"
          {...getTableProps()}
          size={dense ? "small" : "medium"}
        >
          <TableHead component="div">
            {headerGroups.map((headerGroup) => {
              return (
                <TableRow
                  component="div"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => {
                    const stickyCheckboxProps =
                      column.id === "selectionCheckbox"
                        ? {
                            position: "sticky",
                            background: "white",
                            left: 0,
                            zIndex: 1,
                          }
                        : {};
                    return (
                      <TableCell
                        component="div"
                        variant="head"
                        {...column.TableCellProps}
                        {...column.getHeaderProps([
                          {
                            style: {
                              position: "relative",
                              ...stickyCheckboxProps,
                            },
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
          {loading ? <LinearProgress /> : <LinearProgressSpacer />}

          <TableBody
            component="div"
            {...getTableBodyProps([
              {
                style: {
                  display: "block",
                  maxHeight: "calc(100vh - 42*8px)",
                },
              },
            ])}
          >
            {page.map((row) => {
              prepareRow(row);

              return (
                <TableRow
                  component="div"
                  selected={row.isSelected}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    const stickyCheckboxProps =
                      cell.column.id === "selectionCheckbox"
                        ? {
                            position: "sticky",
                            background: "white",
                            left: 0,
                            zIndex: 1,
                          }
                        : {};
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
                              ...stickyCheckboxProps,
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
            {emptyRows > 0 ? (
              <TableRow
                component="div"
                style={{ height: emptyRows * cellSize }}
              >
                <TableCell component="div" />
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ display: "flex" }}
        variant="body"
        component="div"
        rowsPerPageOptions={[5, 10, 15, 20]}
        colSpan={3}
        count={controlledPageCount * 10}
        rowsPerPage={pageSize}
        page={pageIndex}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
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
        hideSortIcon={true}
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
      {...row.getToggleRowSelectedProps([
        {
          style: {
            padding: 0,
          },
        },
      ])}
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
      id: "selectionCheckbox",
      Header: CheckboxHeaderRenderer,
      Cell: CheckboxCellRenderer,
      minWidth: 20,
      width: 20,
      maxWidth: 20,
    },
    ...columns,
  ]);
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.secondary.dark,
          background: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnchancedToolbar = ({ dense, tableName, getRowId, selectedFlatRows }) => {
  const classes = useToolbarStyles();
  const selectedCount = selectedFlatRows.length;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selectedCount > 0,
      })}
      variant={dense ? "dense" : "regular"}
    >
      <Typography
        className={classes.title}
        color="inherit"
        variant={selectedCount > 0 ? "subtitle1" : "h6"}
        component="div"
      >
        {selectedCount > 0 ? `selected ${selectedCount}` : tableName}
      </Typography>
      {selectedCount === 1 ? (
        <Tooltip title="edit">
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {selectedCount > 0 ? (
        <Tooltip title="delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {selectedCount === 0 ? (
        <IconButton aria-label="config">
          <FilterListIcon />
        </IconButton>
      ) : null}
    </Toolbar>
  );
};

const useTablePaginationStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaginationActions = (props) => {
  const classes = useTablePaginationStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageChange = (event) => {
    onChangePage(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageChange}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const useLinerProgressStyle = makeStyles(() => ({
  root: {
    position: "relative",
    overflow: "hidden",
    display: "block",
    height: 4,
    zIndex: 0,
    "@media print": {
      colorAdjust: "exact",
    },
  },
}));

const LinearProgressSpacer = () => {
  const classes = useLinerProgressStyle();
  return <div className={classes.root}></div>;
};
