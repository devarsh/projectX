import { useRef } from "react";
import {
  useTable,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
  useRowSelect,
  useColumnOrder,
  useGlobalFilter,
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

export const DataGrid = ({
  label,
  dense,
  columns,
  data,
  getRowId,
  defaultColumn,
  allowColumnReordering,
  defaultHiddenColumns,
}) => {
  //@ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
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
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    useColumnOrder,
    useResizeColumns,
    useBlockLayout
  );

  const tbodyRef = useRef(null);

  return (
    <Paper
      style={{
        width: "100%",
      }}
    >
      <TableHeaderToolbar
        label={label}
        dense={dense}
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <TableContainer
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "auto",
          maxHeight: "calc(100vh - 35*8px)",
          minHeight: "40vh",
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
              return (
                <MyTableRow
                  {...row.getRowProps()}
                  id={row.id}
                  tabIndex={0}
                  component="div"
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
          </TableBody>
        </Table>
      </TableContainer>
      {/*@ts-ignore */}
      <TableCell style={{ display: "flex" }}>
        Total No of Records: {rows.length}
      </TableCell>
    </Paper>
  );
};
