import { useRef, useState } from "react";
import {
  useTable,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
  useRowSelect,
  useColumnOrder,
  useGlobalFilter,
  useGroupBy,
  useExpanded,
} from "react-table";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { TableHeaderToolbar } from "./tableHeaderToolbar";
import { StickyTableHead } from "components/dataTable/stickyTableHead";
import { MyTableRow } from "components/dataTable/focusableTableRow";
import { HeaderCellWrapper } from "components/dataTable/headerCellWrapper";
import { RowCellWrapper } from "components/dataTable/rowCellWrapper";
import {
  TableActionToolbar,
  ActionContextMenu,
} from "components/dataTable/tableActionToolbar";
import { useCheckboxColumn } from "./components/useCheckbox";
import LinearProgress from "@material-ui/core/LinearProgress";
import { LinearProgressBarSpacer } from "components/dataTable/linerProgressBarSpacer";
import ArrowRightSharpIcon from "@material-ui/icons/ArrowRightSharp";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import IconButton from "@material-ui/core/IconButton";

export const DataGrid = ({
  label,
  dense,
  columns,
  data,
  loading,
  getRowId,
  defaultColumn,
  allowColumnReordering,
  disableSorting,
  defaultHiddenColumns,
  multipleActions,
  singleActions,
  doubleClickAction,
  alwaysAvailableAction,
  setGridAction,
  updateGridData,
  deleteGridRow,
  hideFooter,
  hideHeader,
  disableGlobalFilter,
  disableRowSelect,
  disableGroupBy,
  containerHeight,
}) => {
  //@ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    rows,
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      defaultColumn,
      data,
      getRowId,
      initialState: {
        hiddenColumns: defaultHiddenColumns,
      },
      allowColumnReordering: allowColumnReordering,
      autoResetSortBy: false,
      updateGridData,
      deleteGridRow,
      disableSortBy: Boolean(disableSorting),
      disableGlobalFilter: Boolean(disableGlobalFilter),
      disableGroupBy: Boolean(disableGroupBy),
    },
    useGlobalFilter,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    !disableRowSelect && useCheckboxColumn
  );

  const tbodyRef = useRef(null);

  const [contextMenuPosition, setContextMenuPosition] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [contextMenuRow, setContextMenuRow] = useState<null | any>(null);
  const [contextMenuSelectedRowId, setContextMenuSelectedRowId] = useState<
    string | null
  >(null);
  const handleContextMenuClose = () => {
    setContextMenuRow(null);
    setContextMenuPosition(null);
    setContextMenuSelectedRowId(null);
  };
  const handleContextMenuOpen = (row) => (e) => {
    e.preventDefault();
    setContextMenuRow(row);
    setContextMenuSelectedRowId(row?.id);
    setContextMenuPosition(
      contextMenuPosition === null
        ? { mouseX: e.clientX - 2, mouseY: e.clientY - 4 }
        : null
    );
  };
  const handleRowDoubleClickAction = (row) => (e) => {
    e.preventDefault();
    setGridAction({
      name: doubleClickAction.actionName,
      rows: [row],
    });
  };

  return (
    <Paper
      style={{
        width: "100%",
      }}
    >
      {Boolean(hideHeader) ? null : (
        <TableHeaderToolbar
          label={label}
          dense={dense}
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          alwaysAvailableAction={alwaysAvailableAction}
          setGridAction={setGridAction}
          selectedFlatRows={selectedFlatRows}
          disableGlobalFilter={Boolean(disableGlobalFilter)}
        />
      )}
      <TableActionToolbar
        dense={dense}
        selectedFlatRows={selectedFlatRows}
        multipleActions={multipleActions}
        singleActions={singleActions}
        setGridAction={setGridAction}
      />
      <ActionContextMenu
        selectedFlatRows={contextMenuRow}
        singleActions={singleActions}
        setGridAction={setGridAction}
        mouseX={contextMenuPosition?.mouseX ?? null}
        mouseY={contextMenuPosition?.mouseY ?? null}
        handleClose={handleContextMenuClose}
      />
      {loading ? <LinearProgress /> : <LinearProgressBarSpacer />}
      <TableContainer
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "auto",
          maxHeight: containerHeight?.max ?? "calc(100vh - 35*8px)",
          minHeight: containerHeight?.min ?? "40vh",
        }}
      >
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
                },
              },
            ])}
          >
            {rows.length <= 0 ? (
              <div
                style={{
                  height: "calc(100vh - 35*8px)",
                  width: "100%",
                  display: "flex",

                  alignItems: "center",
                }}
              >
                No data found
              </div>
            ) : null}
            {rows.map((row, index) => {
              prepareRow(row);
              const rightClickHandler = handleContextMenuOpen(row);
              const thisRowDblClickHandler = handleRowDoubleClickAction(row);
              return (
                <MyTableRow
                  {...row.getRowProps()}
                  id={row.id}
                  tabIndex={0}
                  component="div"
                  selected={
                    row.isSelected || contextMenuSelectedRowId === row.id
                  }
                  onContextMenu={rightClickHandler}
                  onDoubleClick={
                    Boolean(doubleClickAction)
                      ? thisRowDblClickHandler
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
                        {cell.isGrouped ? (
                          <>
                            <IconButton
                              {...row.getToggleRowExpandedProps([
                                { style: { padding: 0 } },
                              ])}
                            >
                              {row.isExpanded ? (
                                <ArrowDropDownSharpIcon />
                              ) : (
                                <ArrowRightSharpIcon />
                              )}
                            </IconButton>
                            {cell.render("Cell")} ({row.subRows.length})
                          </>
                        ) : cell.isAggregated ? (
                          cell.render("Aggregated")
                        ) : cell.isPlaceholder ? null : (
                          cell.render("Cell", { index: index })
                        )}
                      </RowCellWrapper>
                    );
                  })}
                </MyTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {hideFooter ? null : (
        <TableCell style={{ display: "flex" }}>
          Total No of Records: {rows.length}
        </TableCell>
      )}
    </Paper>
  );
};
