import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { lighten, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewIcon from "@material-ui/icons/Visibility";
import clsx from "clsx";
import { ColumnVisibility } from "./columnVisibility";
import { DisplayData } from "./generateLead";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.secondary.dark,
          background: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

export const TableHeaderToolbar = ({
  dense,
  label,
  getRowId,
  selectedFlatRows,
  visibleColumns,
  defaultHiddenColumns,
}) => {
  const classes = useStyles();
  const selectedCount = selectedFlatRows.length;
  const [refId, setRefId] = useState("");
  const [assignLeadToPageShow, setAssignLeadToPageShow] = useState(false);
  let refID;

  const assignLeadToEmployee = () => {
    refID = selectedFlatRows[0].id;
    if (refID !== "") {
      setRefId(refID);
      setAssignLeadToPageShow(true);
    }
  };

  const handleCloseDetails = () => {
    setAssignLeadToPageShow(false);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selectedCount > 0,
      })}
      variant={dense ? "dense" : "regular"}
    >
      <Typography
        className={classes.title}
        color="inherit"
        variant={selectedCount > 0 ? "subtitle1" : "h6"}
        component="div"
      >
        {selectedCount > 0 ? `selected ${selectedCount}` : label}
      </Typography>
      {selectedCount === 1 ? (
        <>
          <Tooltip title="edit">
            <IconButton aria-label="edit">
              <EditIcon onClick={assignLeadToEmployee} />
            </IconButton>
          </Tooltip>

          <Tooltip title="view">
            <IconButton aria-label="view">
              <ViewIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
      {selectedCount > 0 ? (
        <Tooltip title="delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}

      {assignLeadToPageShow ? (
        <DisplayData
          onClose={handleCloseDetails}
          open={assignLeadToPageShow}
          row={refId}
        />
      ) : null}
      <ColumnVisibility
        visibleColumns={visibleColumns}
        defaultHiddenColumns={defaultHiddenColumns}
      />
    </Toolbar>
  );
};
