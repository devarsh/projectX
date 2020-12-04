import { Fragment } from "react";
import TableCell from "@material-ui/core/TableCell";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { withStyles } from "@material-ui/core/styles";

export const TableHeaderText = withStyles({
  root: {
    whiteSpace: "nowrap",
  },
})(Typography);

export const ColumnDivier = withStyles({
  vertical: {
    width: "5px",
  },
})(Divider);

export const CustomCellRenderer = (cell) => {
  return (
    <TableCell
      component="div"
      {...cell.getCellProps([cell.column?.props ?? {}])}
    >
      {cell.render("Cell")}
    </TableCell>
  );
};

export const CustomHeaderRenderer = (column) => {
  const { key, ...others } = column.getHeaderProps(
    column.getSortByToggleProps()
  );
  return (
    <Fragment key={key}>
      <TableCell component="div" variant="head" {...others}>
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
};
