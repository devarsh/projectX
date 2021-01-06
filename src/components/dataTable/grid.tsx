import { useCallback, useEffect, useRef } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
  useRowSelect,
  useFilters,
  useColumnOrder,
  useAsyncDebounce,
} from "react-table";

import Paper from "@material-ui/core/Paper";
import { TableHeaderToolbar } from "./tableHeaderToolbar";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import { StickyTableHead } from "./stickyTableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { MyTableRow } from "./focusableTableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { TablePaginationActions } from "./tablePaginationToolbar";
import { TableHeaderFilterToolbar } from "./tableHeaderFilterToolbar";
import { TableActionToolbar } from "./tableActionToolbar";

import LinearProgress from "@material-ui/core/LinearProgress";
import { LinearProgressBarSpacer } from "./linerProgressBarSpacer";

import { CustomBackdrop } from "./backdrop";
import { useCheckboxColumn } from "./components";
import { HeaderCellWrapper } from "./headerCellWrapper";
import { RowCellWrapper } from "./rowCellWrapper";

const maxWidth = 998;

export const DataGrid = ({
  gridCode,
  label,
  dense,
  localFilterManager,
  globalFiltersState,
  columns,
  defaultColumn,
  data,
  onFetchData,
  loading,
  getRowId,
  totalRecords: controlledTotalRecords,
  pageCount: controlledPageCount,
  pageSizes,
  defaultPageSize,
  defaultHiddenColumns,
  filterTypes,
  allowColumnReordering,
  allowColumnHiding,
  allowKeyboardNavigation,
  allowGlobalFilter,
  globalFilterMeta,
  gridActions,
  setGridAction,
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
    setAllFilters,
    setSortBy,
    columns: availableColumns,
  } = useTable(
    {
      columns,
      defaultColumn,
      data,
      getRowId,
      filterTypes,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        hiddenColumns: defaultHiddenColumns,
      },
      gridCode,
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
      manualSortBy: true,
      autoResetSortBy: false,
      manualFilters: true,
      autoResetFilters: false,
      localFilterManager,
      globalFiltersState,
      allowColumnReordering: allowColumnReordering,
    },
    useColumnOrder,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    useCheckboxColumn
    //useSequenceColumn
  );

  const { pageIndex, pageSize, sortBy, filters } = tableState;
  const cellSize = dense ? 34 : 54;
  const emptyRows = pageSize - Math.min(pageSize, page.length);
  const onFetchDataDebounced = useAsyncDebounce(onFetchData, 500);

  const tbodyRef = useRef(null);
  const handleKeyDown = (event, row) => {
    event.stopPropagation();
    //@ts-ignore
    const currentRow = tbodyRef.current?.children.namedItem(row.id);
    //@ts-ignore
    let rowToFocus;
    switch (event.keyCode) {
      case 38:
        rowToFocus = currentRow?.previousElementSibling;
        if (rowToFocus !== null) {
          rowToFocus?.focus();
          event.preventDefault();
          //@ts-ignore
          if (rowToFocus.offsetTop > tbodyRef.current?.offsetHeight) {
            console.log("need to scroll here");
          }
        }
        break;
      case 40:
        rowToFocus = currentRow?.nextElementSibling;
        if (rowToFocus !== null) {
          rowToFocus?.focus();
          event.preventDefault();
        }
        break;
      case 32:
        row.toggleRowSelected();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters });
  }, [onFetchDataDebounced, pageIndex, pageSize, sortBy, filters]);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  useEffect(() => {
    setAllFilters([]);
    setSortBy([]);
    gotoPage(0);
    localFilterManager.clearFilterState();
  }, [globalFiltersState]);

  return (
    <Paper
      style={{
        width: "100%",
      }}
    >
      <TableHeaderToolbar
        label={label}
        dense={dense}
        visibleColumns={availableColumns}
        defaultHiddenColumns={defaultHiddenColumns}
        allowColumnHiding={allowColumnHiding}
      />
      <TableActionToolbar
        dense={dense}
        selectedFlatRows={selectedFlatRows}
        getRowId={getRowId}
        gridActions={gridActions}
        setGridAction={setGridAction}
      />
      {allowGlobalFilter ? (
        <TableHeaderFilterToolbar
          dense={dense}
          filters={globalFilterMeta}
          gridCode={gridCode}
        />
      ) : null}
      {loading ? <LinearProgress /> : <LinearProgressBarSpacer />}
      <TableContainer style={{ position: "relative" }}>
        <Table
          component="div"
          {...getTableProps()}
          size={dense ? "small" : "medium"}
        >
          {/*@ts-ignore*/}
          <StickyTableHead component="div">
            {headerGroups.map((headerGroup) => {
              return (
                <TableRow
                  component="div"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => {
                    return (
                      <HeaderCellWrapper
                        column={column}
                        key={column.getHeaderProps().key}
                      >
                        {column.render("Header")}
                      </HeaderCellWrapper>
                    );
                  })}
                </TableRow>
              );
            })}
          </StickyTableHead>
          <TableBody
            component="div"
            ref={tbodyRef}
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
                <MyTableRow
                  {...row.getRowProps()}
                  id={row.id}
                  tabIndex={0}
                  component="div"
                  selected={row.isSelected}
                  onKeyDown={
                    allowKeyboardNavigation
                      ? (e) => handleKeyDown(e, row)
                      : undefined
                  }
                >
                  {row.cells.map((cell) => {
                    return (
                      <RowCellWrapper
                        key={cell.getCellProps().key}
                        cell={cell}
                        index={index}
                      >
                        {cell.render("Cell", { index: index })}
                      </RowCellWrapper>
                    );
                  })}
                </MyTableRow>
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
        <CustomBackdrop open={loading} />
      </TableContainer>
      <TablePagination
        style={{ display: "flex" }}
        variant="body"
        component="div"
        rowsPerPageOptions={pageSizes}
        colSpan={3}
        count={controlledTotalRecords}
        rowsPerPage={Number(pageSize)}
        page={Number(pageIndex)}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
};
