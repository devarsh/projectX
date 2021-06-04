import { createElement, Fragment, useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FilterListTwoToneIcon from "@material-ui/icons/FilterListTwoTone";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { useFilterState, filterReducer } from "./tableFilterComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flexDirection: "column",
    alignItems: "stretch",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  ul: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "nowrap",
    listStyle: "none",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: 0,
    maxWidth: "940px",
    overflow: "hide",
    overflowX: "scroll",
  },
}));

export const TableHeaderFilterComponent = ({
  dense,
  filters,
  setAllFilters,
  columns,
  setSortBy,
  gotoPage,
}) => {
  const [visible, setVisible] = useState(false);
  const { filterState, dispatch } = useFilterState(filterReducer);
  const classes = useStyles();

  const handleFilterChange = () => {
    setAllFilters(filterState.current);
    setSortBy([]);
    gotoPage(0);
    setVisible(false);
  };

  let filterColumns: any = [];
  if (Array.isArray(columns)) {
    filterColumns = columns.filter((one) => typeof one.Filter === "function");
    filterColumns = filterColumns.map((one) => {
      return (
        //@ts-ignore
        createElement(one.Filter, {
          key: one.id,
          column: one,
          dispatch,
          ...one.filterComponentProps,
        })
      );
    });
  }
  const handleFilterDelete = (id) => {
    let newFilter = filters.filter((one) => one.id !== id);
    setAllFilters(newFilter);
    gotoPage(0);
    setSortBy([]);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Toolbar variant={dense ? "dense" : "regular"} className={classes.root}>
        {visible ? (
          <Fragment>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">Filter</Typography>
              <div style={{ flexGrow: 1 }} />
              <Button onClick={handleFilterChange}>Apply</Button>
              <Button onClick={() => setVisible(false)}>Close</Button>
            </div>
            <Grid container spacing={1}>
              {filterColumns}
            </Grid>
          </Fragment>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {filters.length > 0 ? (
              <Typography variant="h6">Applied Filters: </Typography>
            ) : null}
            <ul className={classes.ul}>
              {filters.map((one: any) => {
                return (
                  <li key={one?.id}>
                    <Chip
                      label={one?.value?.columnName}
                      onDelete={() => handleFilterDelete(one?.id)}
                      className={classes.chip}
                    />
                  </li>
                );
              })}
            </ul>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={() => setVisible(true)}
            >
              <FilterListTwoToneIcon />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </MuiPickersUtilsProvider>
  );
};
