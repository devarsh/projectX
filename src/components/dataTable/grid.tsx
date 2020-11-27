import { Fragment } from "react";
import {
  useTable,
  useSortBy,
  useRowSelect,
  useResizeColumns,
  useBlockLayout,
} from "react-table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { TableHeaderText, ColumnDivier } from "./components";

const DefaultCellRenderer = (props) => {
  console.log(props);
  const { value } = props;
  return String(value);
};

export const DataGrid = ({ defaultColumn, columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    { columns, data, defaultColumn },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  );

  return (
    <TableContainer>
      <Table component="div" {...getTableProps()}>
        <TableHead component="div">
          {headerGroups.map((headerGroup) => (
            <TableRow component="div" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                console.log(column);
                return (
                  <Fragment>
                    <TableCell
                      component="div"
                      variant="head"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <TableHeaderText>
                        {column.render("Header")}
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? "desc" : "asc"}
                        />
                      </TableHeaderText>
                    </TableCell>
                    <ColumnDivier
                      orientation="vertical"
                      flexItem
                      light={true}
                      {...column.getResizerProps()}
                    />
                  </Fragment>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody component="div" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow component="div" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.log(cell);
                  return (
                    <TableCell component="div" {...cell.getCellProps()}>
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
