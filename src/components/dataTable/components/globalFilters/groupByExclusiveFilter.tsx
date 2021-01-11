import { Fragment, useEffect, useState, useRef } from "react";
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import Paper from "@material-ui/core/Paper";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { APISDK } from "registry/fns/sdk";
import { filterAtom, filtersAtom, subscribeToFilterChange } from "../../atoms";

const useStyles = makeStyles((theme) => ({
  filterType: {
    color: theme.palette.secondary.main,
    fontSize: "11px",
    paddingRight: "4px",
    fontWeight: 500,
    display: "inline-flex",
  },
  paper: {
    display: "inline-flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));

export const GroupByExclusiveFilter = (props) => {
  const classes = useStyles();
  const {
    accessor,
    result_type,
    columnName,
    dependencies,
    last,
    gridCode,
  } = props;

  //set indivial filter state
  const setFilterCondition = useSetRecoilState(
    filterAtom(`${gridCode}/${accessor}`)
  );
  //the last filter will set the state of all the dependent filters
  const setFiltersCondition = useSetRecoilState(filtersAtom(gridCode));
  //filter dependencies
  const dependentFilters = useRecoilValue(
    subscribeToFilterChange({ gridCode: gridCode, accessors: dependencies })
  );
  //clear filter on unmount
  const resetFilter = useResetRecoilState(
    filterAtom(`${gridCode}/${accessor}`)
  );
  useEffect(() => {
    return resetFilter;
  }, [resetFilter]);

  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState("all");
  const apiCount = useRef(0);

  useEffect(() => {
    if (typeof value === "string" && value !== "all") {
      const condition = {
        accessor,
        condition: "equal",
        value,
      };
      setFilterCondition(condition);
      if (last) {
        setFiltersCondition([...dependentFilters, condition]);
      }
    } else {
      setFilterCondition(null);
    }
  }, [value, last, accessor, setFilterCondition, setFiltersCondition]);

  useEffect(() => {
    setLoading(true);
    setError("");
    setValue("all");
    if (last) {
      setFiltersCondition(dependentFilters);
    }
    let currentCount = ++apiCount.current;
    let promise = APISDK.fetchGridColumnFilterProps(gridCode, {
      accessor,
      result_type,
      filter_conditions: dependentFilters,
    });
    promise
      .then((result) => {
        if (currentCount === apiCount.current) {
          setLoading(false);
          if (result.status === "success") {
            setGroups(result?.data?.groups ?? []);
          } else {
            setGroups([]);
            console.log(result);
            setError("Error fetching filters");
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        setGroups([]);
        console.log(err);
        setError("Error fetching filter");
      });
  }, [
    last,
    dependentFilters,
    accessor,
    gridCode,
    result_type,
    setFiltersCondition,
    setLoading,
    setGroups,
    setError,
    setValue,
  ]);

  const buttons = groups.map((one) => {
    return (
      <ToggleButton key={one.value} value={one.value}>
        {one.label} ({one.count})
      </ToggleButton>
    );
  });
  return (
    <Fragment>
      <Typography className={classes.filterType}>{columnName}</Typography>
      {loading ? (
        "loading filter..."
      ) : Boolean(error) ? (
        error
      ) : (
        <Paper elevation={0} className={classes.paper}>
          <ToggleButtonGroup
            size="small"
            value={value}
            onChange={(_, value) => {
              setValue(value);
            }}
            exclusive={true}
          >
            {buttons}
            <ToggleButton key={`${accessor}-all-single`} value="all">
              Clear
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      )}
    </Fragment>
  );
};
