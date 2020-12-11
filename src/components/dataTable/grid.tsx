import { useEffect } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
  useRowSelect,
  useFilters,
  useAsyncDebounce,
} from "react-table";
import { LinearProgressBarSpacer } from "./linerProgressBarSpacer";
import { TablePaginationActions } from "./tablePaginationToolbar";
import { TableHeaderToolbar } from "./tableHeaderToolbar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import TablePagination from "@material-ui/core/TablePagination";
import Backdrop from "@material-ui/core/Backdrop";

import { useCheckboxColumn } from "./plugins/checkbox";

const maxWidth = 998;

export const DataTable = ({
  tableName,
  dense,
  columns,
  defaultColumn,
  data,
  onFetchData,
  loading,
  getRowId,
  totalRecords: controlledTotalRecords,
  pageCount: controlledPageCount,
  resetPaginationAndSorting,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    selectedFlatRows,
    totalColumnsWidth,
    gotoPage,
    setPageSize,
    state: tableState,
  } = useTable(
    {
      columns,
      defaultColumn,
      data,
      getRowId,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: resetPaginationAndSorting,
      manualSortBy: true,
      autoResetSortBy: resetPaginationAndSorting,
      manualFilters: true,
      autoResetFilters: false,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    useCheckboxColumn
  );
  const { pageIndex, pageSize, sortBy, filters } = tableState;
  const cellSize = dense ? 34 : 54;
  const emptyRows = pageSize - Math.min(pageSize, page.length);
  const onFetchDataDebounced = useAsyncDebounce(onFetchData, 500);

  useEffect(() => {
    onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters });
  }, [onFetchDataDebounced, pageIndex, pageSize, sortBy, filters]);

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
      <TableHeaderToolbar
        tableName={tableName}
        dense={dense}
        getRowId={getRowId}
        selectedFlatRows={selectedFlatRows}
      />
      {loading ? <LinearProgress /> : <LinearProgressBarSpacer />}
      <TableContainer style={{ position: "relative" }}>
        <Table
          component="div"
          {...getTableProps()}
          size={dense ? "small" : "medium"}
        >
          <TableHead
            component="div"
            style={{
              position: "sticky",
              zIndex: 10,
              top: 0,
              backgroundColor: "white",
              display: "block",
            }}
          >
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
                            zIndex: 12,
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
                              display: "flex",
                              overflow: "hidden",
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
            {page.map((row, index) => {
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
                        {cell.render("Cell", { index: index })}
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
        <Backdrop
          open={loading}
          style={{
            position: "absolute",
            zIndex: 9,
            backgroundColor: "rgb(0 0 0 / 0%)",
          }}
        />
      </TableContainer>
      <TablePagination
        style={{ display: "flex" }}
        variant="body"
        component="div"
        rowsPerPageOptions={[5, 10, 15, 20]}
        colSpan={3}
        count={controlledTotalRecords}
        rowsPerPage={pageSize}
        page={pageIndex}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
};
