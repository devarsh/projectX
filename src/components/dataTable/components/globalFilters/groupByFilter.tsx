import { Fragment, useEffect, useState, useRef } from "react";
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import { APISDK } from "registry/fns/sdk";
import { filterAtom, filtersAtom, subscribeToFilterChange } from "../../atoms";

export const GroupByFilter = (props) => {
  const {
    accessor,
    result_type,
    columnName,
    selectType,
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
  const isSingle = selectType === "single" ? true : false;
  const [clearAllSelected, setClearAllSelected] = useState(true);
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState([]);
  const apiCount = useRef(0);
  const dependentFilters = useRecoilValue(
    subscribeToFilterChange({ gridCode: gridCode, accessors: dependencies })
  );
  const resetFilter = useResetRecoilState(
    filterAtom(`${gridCode}/${accessor}`)
  );

  useEffect(() => {
    return resetFilter;
  }, []);

  useEffect(() => {
    if (
      (Array.isArray(value) && value.length > 0) ||
      (typeof value === "string" && value !== "")
    ) {
      const condition = {
        accessor,
        condition: isSingle ? "equal" : "in",
        value,
      };
      setFilterCondition(condition);
      if (last) {
        console.log([...dependentFilters, condition]);
        setFiltersCondition([...dependentFilters, condition]);
      }
    } else {
      setFilterCondition(null);
      setClearAllSelected(true);
    }
  }, [value]);

  useEffect(() => {
    setLoading(true);
    setError("");
    setValue([]);
    setClearAllSelected(true);
    if (last) {
      console.log(dependentFilters);
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
          onChange={(event, value) => {
            setValue(value);
            setClearAllSelected(false);
          }}
          exclusive={isSingle ? true : false}
        >
          {buttons}
          {isSingle ? (
            <ToggleButton key={`${accessor}-all-single`} value={""}>
              Clear
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
              value=""
            >
              Clear
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      )}
    </Fragment>
  );
};
