import { Fragment, useEffect, useState, useRef } from "react";
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import { APISDK } from "registry/fns/sdk";
import { filterAtom, filtersAtom, subscribeToFilterChange } from "../../atoms";

export const GroupByExclusiveFilter = (props) => {
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
  }, []);

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
  }, [value]);

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
  }, [last, dependentFilters]);

  const buttons = groups.map((one) => {
    return (
      <ToggleButton key={one.value} value={one.value}>
        {one.label} ({one.count})
      </ToggleButton>
    );
  });
  return (
    <Fragment>
      <Typography style={{ display: "inline-flex" }}>{columnName}</Typography>
      {loading ? (
        "loading filter..."
      ) : Boolean(error) ? (
        error
      ) : (
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
      )}
    </Fragment>
  );
};
