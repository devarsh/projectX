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

import { CustomCellRenderer, CustomHeaderRenderer } from "./renderers";
import { TablePaginationActions } from "./TablePageActions";
import { TablePagination } from "@material-ui/core";

export const DataGrid = ({ defaultColumn, columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, defaultColumn },
    useSortBy,
    useBlockLayout,
    useResizeColumns,
    usePagination
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

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
          <TableFooter component="div">
            <TableRow component="div">
              <TablePagination
                variant="body"
                component="div"
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
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
