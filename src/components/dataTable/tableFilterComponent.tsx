import { useRef, useCallback, useState, createElement } from "react";
import FilterListTwoToneIcon from "@material-ui/icons/FilterListTwoTone";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const reducer = (state: any = [], action: any = {}) => {
  switch (action.type) {
    case "setValue": {
      const { id, ...others } = action.payload;
      let index = state.findIndex((one) => one.id === id);
      if (index >= 0) {
        state[index].value = others;
        return [...state];
      }
      return [...state, { id, value: others }];
    }
    case "removeValue": {
      const { id } = action.payload;
      let result = state.filter((one) => one.id != id);
      return result;
    }
    case "resetAll": {
      return [];
    }
    default: {
      return state;
    }
  }
};

export const useFilterState = (reducer) => {
  const filterState = useRef<object>([]);
  const dispatch = useCallback((action) => {
    let newState = reducer(filterState.current, action);
    filterState.current = newState;
    console.log(newState);
  }, []);

  return {
    dispatch,
    filterState,
  };
};

export const TableFilterComponent = ({
  setAllFilters,
  columns,
  setSortBy,
  gotoPage,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { filterState, dispatch } = useFilterState(reducer);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClearFilter = () => {
    setAllFilters([]);
    setSortBy([]);
    gotoPage(0);
    setAnchorEl(null);
  };

  const handleFilterChange = () => {
    setAllFilters(filterState.current);
    setSortBy([]);
    gotoPage(0);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterListTwoToneIcon />
      </IconButton>
      <Popover
        id={"columnVisibility"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Card style={{ width: "600px", height: "400px", overflow: "hidden" }}>
          <CardHeader title="Filter"></CardHeader>
          <CardContent style={{ height: "280px", overflow: "scroll" }}>
            <Grid container spacing={2}>
              {filterColumns}
            </Grid>
          </CardContent>
          <CardActions>
            <Button onClick={handleFilterChange}>Apply</Button>
            <Button onClick={handleClearFilter}>Clear</Button>
          </CardActions>
        </Card>
      </Popover>
    </MuiPickersUtilsProvider>
  );
};
