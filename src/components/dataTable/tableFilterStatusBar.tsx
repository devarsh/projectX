import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const TableFilterStatusBar = ({
  dense,
  filters,
  setAllFilters,
  gotoPage,
  setSortBy,
}) => {
  const classes = useStyles();
  if (Array.isArray(filters) && filters.length <= 0) {
    return null;
  }
  const handleDelete = (id) => {
    let newFilter = filters.filter((one) => one.id !== id);
    setAllFilters(newFilter);
    gotoPage(0);
    setSortBy([]);
  };

  return (
    <Toolbar
      component="ul"
      className={classes.root}
      variant={dense ? "dense" : "regular"}
    >
      <li>
        <Typography variant="h6">Applied Filters: </Typography>
      </li>
      {filters.map((one: any) => {
        return (
          <li key={one?.id}>
            <Chip
              label={one?.value?.columnName}
              onDelete={() => handleDelete(one?.id)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Toolbar>
  );
};
