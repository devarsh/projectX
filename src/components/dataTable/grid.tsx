import { Fragment } from "react";
import {
  useTable,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
  usePagination,
} from "react-table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

import { CustomCellRenderer, CustomHeaderRenderer } from "./renderers";

export const DataGrid = ({ defaultColumn, columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
  } = useTable(
    { columns, data, defaultColumn },
    useSortBy,
    useBlockLayout,
    useResizeColumns,
    usePagination
  );

  return (
    <Fragment>
      <TableContainer>
        <Table component="div" {...getTableProps()}>
          <TableHead component="div">
            {headerGroups.map((headerGroup) => (
              <TableRow component="div" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return CustomHeaderRenderer(column);
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody component="div" {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow component="div" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return CustomCellRenderer(cell);
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

/*
 <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={pageCount}
        page={page}
        onChangePage={handleChangePage}
      />
*/

/*
  canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
*/
