import { useState, MouseEvent } from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";

export const DefaultHeaderColumnRenderer = ({ column }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? column.id : undefined;

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
              color: "#0063a3",
              fontSize: "1 rem",
              fontWeight: "600",
              paddingRight:
                //@ts-ignore
                (column?.TableCellProps?.align ?? "left") === "right" &&
                column.canFilter
                  ? "15px"
                  : "10px",
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
      {column.canFilter ? (
        <IconButton
          aria-label="filter"
          aria-controls="popover"
          aria-haspopup="true"
          style={{
            position: "absolute",
            right: "15px",
            padding: "0",
            color: open || Boolean(column.filterValue) ? "red" : "inherit",
          }}
          onClick={handleClick}
        >
          <FilterListIcon />
        </IconButton>
      ) : null}
      <div
        {...column.getResizerProps([
          {
            style: {
              display: "inline-block",
              position: "absolute",
              right: "-5px",
              top: "0",
              padding: "0 5px",
              zIndex: 1,
            },
          },
        ])}
      >
        <div
          style={{
            height: "35px",
            width: "6px",
            backgroundColor: "#888",
          }}
        ></div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {column.render("Filter")}
      </Popover>
    </>
  );
};
