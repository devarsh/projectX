import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { ColumnVisibility } from "./columnVisibility";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    flex: "1 1 100%",
  },
}));

export const TableHeaderToolbar = ({
  dense,
  label,
  visibleColumns,
  defaultHiddenColumns,
  allowColumnHiding,
}) => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.root} variant={dense ? "dense" : "regular"}>
      <Typography
        className={classes.title}
        color="inherit"
        variant={"h6"}
        component="div"
      >
        {label}
      </Typography>
      {allowColumnHiding ? (
        <ColumnVisibility
          visibleColumns={visibleColumns}
          defaultHiddenColumns={defaultHiddenColumns}
        />
      ) : null}
    </Toolbar>
  );
};
