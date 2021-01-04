import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { GroupByFilter } from "./components/globalFilters/groupByFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const TableHeaderFilterToolbar = ({
  dense,
  filters,
  headerFilterManager,
  handleResetGridState,
}) => {
  const classes = useStyles();
  const renderFilters = filters.map((one, index) => {
    const { filterComponentType, filterComponentProps } = one;
    switch (filterComponentType) {
      case "groupByFilter":
        return (
          <Grid item xs>
            <GroupByFilter
              key={one?.filterComponentProps?.accessor ?? index}
              headerFilterManager={headerFilterManager}
              handleResetGridState={handleResetGridState}
              {...filterComponentProps}
            />
          </Grid>
        );
      default:
        return null;
    }
  });
  return (
    <Toolbar
      className={clsx(classes.root)}
      variant={dense ? "dense" : "regular"}
    >
      <Grid container spacing={3}>
        {renderFilters}
      </Grid>
    </Toolbar>
  );
};
