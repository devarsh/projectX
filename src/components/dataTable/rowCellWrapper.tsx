import TableCell from "@material-ui/core/TableCell";

export const RowCellWrapper = ({ cell, index, children }) => {
  const stickyRowCell =
    cell.column.sticky === true
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
            display: "flex",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            border: "0.5px dotted #ddd",
            ...stickyRowCell,
          },
        },
      ])}
    >
      {children}
    </TableCell>
  );
};
