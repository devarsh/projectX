import { useEffect, useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
  setAllFilters,
  setSortBy,
  gotoPage,
}) => {
  const classes = useStyles();
  const renderFilters = filters.map((one, index) => {
    const { filterComponentType, filterComponentProps } = one;
    switch (filterComponentType) {
      case "groupByFilter":
        return (
          <GroupByFilter
            key={one?.filterComponentProps?.accessor ?? index}
            headerFilterManager={headerFilterManager}
            setAllFilters={setAllFilters}
            setSortBy={setSortBy}
            gotoPage={gotoPage}
            {...filterComponentProps}
          />
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

export const GroupByFilter = ({
  accessor,
  columnName,
  selectType,
  groups,
  headerFilterManager,
  setAllFilters,
  setSortBy,
  gotoPage,
}) => {
  const [value, setValue] = useState<any | any[] | null>(null);
  const [clearAllSelected, setClearAllSelected] = useState(false);
  useEffect(() => {
    if (
      (Array.isArray(value) && value.length > 0) ||
      (!Array.isArray(value) && Boolean(value))
    ) {
      headerFilterManager.addHeaderFilter(accessor, {
        accessor,
        condition: selectType === "single" ? "equal" : "in",
        value,
      });
      setAllFilters([]);
      setSortBy([]);
      gotoPage(0);
    } else {
      headerFilterManager.removeHeaderFilter(accessor);
      setAllFilters([]);
      setSortBy([]);
      gotoPage(0);
    }
  }, [value]);
  if (!Array.isArray(groups)) {
    return null;
  }
  const buttons = groups.map((one) => {
    return (
      <ToggleButton key={one.value} value={one.value}>
        {one.label} ({one.count})
      </ToggleButton>
    );
  });
  return (
    <Grid item xs>
      <Typography style={{ display: "inline-flex" }}>{columnName}</Typography>
      <ToggleButtonGroup
        size="small"
        value={value}
        onChange={(event, value) => {
          setValue(value);
          setClearAllSelected(false);
        }}
        exclusive={selectType === "single" ? true : false}
      >
        {buttons}
        {selectType === "single" ? (
          <ToggleButton key={`${accessor}-all-single`} value={""}>
            All
          </ToggleButton>
        ) : (
          <ToggleButton
            selected={clearAllSelected}
            key={`${accessor}-all-multiple`}
            onClick={(e) => {
              e.preventDefault();
              setValue([]);
              setClearAllSelected(true);
            }}
          >
            Clear
          </ToggleButton>
        )}
      </ToggleButtonGroup>
    </Grid>
  );
};
