import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { ActionTypes } from "./types";

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

export const TableActionToolbar: FC<{
  dense: boolean;
  getRowId: any;
  selectedFlatRows: any;
  gridActions: ActionTypes[];
  setGridAction: any;
}> = ({ dense, getRowId, selectedFlatRows, gridActions, setGridAction }) => {
  const classes = useStyles();
  const selectedCount = selectedFlatRows.length;
  const selectedRows = selectedFlatRows.map((one) => ({
    data: one.original,
    id: getRowId(one.original),
  }));
  if (selectedCount <= 0) {
    return null;
  }
  if (!Array.isArray(gridActions)) {
    gridActions = [];
  }
  if (typeof setGridAction !== "function") {
    setGridAction = () => {};
  }
  const multipleActions = gridActions.filter((one) => one.multiple === true);
  const singleActions = gridActions.filter((one) => one.multiple === false);
  return (
    <Toolbar
      className={clsx(classes.root, classes.highlight)}
      variant={dense ? "dense" : "regular"}
    >
      <Typography
        className={classes.title}
        color="inherit"
        variant={selectedCount > 0 ? "subtitle1" : "h6"}
        component="div"
      >
        Selected {selectedCount}
      </Typography>
      {selectedCount === 1 ? (
        <RenderActions
          key="singleFilters"
          actions={singleActions}
          setAction={setGridAction}
          selectedRows={selectedRows}
        />
      ) : null}
      {selectedCount > 0 ? (
        <RenderActions
          key="multipleFilters"
          actions={multipleActions}
          setAction={setGridAction}
          selectedRows={selectedRows}
        />
      ) : null}
    </Toolbar>
  );
};

//@ts-ignore
export const RenderActions: FC<{
  actions: ActionTypes[];
  setAction: any;
  selectedRows: any;
}> = ({ actions, setAction, selectedRows }) => {
  if (Array.isArray(actions) && actions.length > 0) {
    return actions.map((one) => (
      <Tooltip title={one.tooltip ?? one.actionLabel} key={one.actionName}>
        <Button
          onClick={() => {
            setAction({
              name: one.actionName,
              rows: selectedRows,
            });
          }}
        >
          {one.actionLabel}
        </Button>
      </Tooltip>
    ));
  } else {
    return null;
  }
};
