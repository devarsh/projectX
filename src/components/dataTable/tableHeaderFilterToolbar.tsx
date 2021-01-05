import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import {
  GroupByExclusiveFilter,
  GroupByMultipleFilter,
  DaysFilter,
} from "./components/globalFilters";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const TableHeaderFilterToolbar = ({ dense, gridCode, filters }) => {
  const classes = useStyles();
  const renderFilters = filters.map((one, index) => {
    const { filterComponentType, filterComponentProps, key } = one;
    let component;
    switch (filterComponentType) {
      case "groupByFilter": {
        if (filterComponentProps.selectType === "multiple") {
          component = (
            <GroupByMultipleFilter
              gridCode={gridCode}
              {...filterComponentProps}
            />
          );
        } else {
          component = (
            <GroupByExclusiveFilter
              gridCode={gridCode}
              {...filterComponentProps}
            />
          );
        }
        break;
      }
      case "daysFilter": {
        component = (
          <DaysFilter gridCode={gridCode} {...filterComponentProps} />
        );
        break;
      }
      default: {
        component = null;
        break;
      }
    }
    if (component !== null) {
      return (
        <Grid key={key} item xs={12} sm={12} md={12}>
          {component}
        </Grid>
      );
    } else {
      return component;
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
