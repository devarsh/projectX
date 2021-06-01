import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

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

export const TableFilterStatusBar = ({ dense, filters, setAllFilters }) => {
  const classes = useStyles();
  if (Array.isArray(filters) && filters.length <= 0) {
    return null;
  }
  const handleDelete = (id) => {
    let newFilter = filters.filter((one) => one.id !== id);
    setAllFilters(newFilter);
  };

  return (
    <Toolbar
      component="ul"
      className={classes.root}
      variant={dense ? "dense" : "regular"}
    >
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
