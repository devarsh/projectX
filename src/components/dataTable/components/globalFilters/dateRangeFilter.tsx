import { Fragment, useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import {
  filterAtom,
  filtersAtom,
  subscribeToFilterChange,
  QueryType,
} from "../../atoms";
import { subDays } from "date-fns";

export const DaysFilter = (props) => {
  const { accessor, columnName, dependencies, last, gridCode } = props;

  //set indivial filter state
  const setFilterCondition = useSetRecoilState(
    filterAtom(`${gridCode}/${accessor}`)
  );
  //the last filter will set the state of all the dependent filters
  const setFiltersCondition = useSetRecoilState(filtersAtom(gridCode));
  const [toggleState, setToggleState] = useState("");
  const [condition, setCondition] = useState<QueryType | null>(null);
  const dependentFilters = useRecoilValue(
    subscribeToFilterChange({ gridCode: gridCode, accessors: dependencies })
  );
  const resetFilter = useResetRecoilState(
    filterAtom(`${gridCode}/${accessor}`)
  );
  //reset the filter when component unmounts
  useEffect(() => {
    return resetFilter;
  }, [resetFilter]);

  useEffect(() => {
    setFilterCondition(condition);
    if (last) {
      if (condition !== null) {
        setFiltersCondition([...dependentFilters, condition]);
      } else {
        setFiltersCondition([...dependentFilters]);
      }
    }
  }, [condition, last, setFilterCondition, setFiltersCondition]);

  useEffect(() => {
    setCondition(null);
    if (last) {
      setFiltersCondition(dependentFilters);
    }
  }, [last, dependentFilters, setFilterCondition, setFiltersCondition]);

  return (
    <Fragment>
      <Typography style={{ display: "inline-flex" }}>{columnName}</Typography>
      <ToggleButtonGroup
        size="small"
        value={toggleState}
        onChange={(event, value) => {
          setToggleState(value);
        }}
        exclusive={true}
      >
        <ToggleButton
          key={"todays"}
          value={"todays"}
          onClick={() =>
            setCondition({
              condition: "equal",
              value: new Date(),
              accessor: accessor,
            })
          }
        >
          Todays
        </ToggleButton>
        <ToggleButton
          key={"last week"}
          value={"last week"}
          onClick={() =>
            setCondition({
              condition: "between",
              value: [subDays(new Date(), 7), new Date()],
              accessor: accessor,
            })
          }
        >
          Last Week
        </ToggleButton>
        <ToggleButton
          key={"last month"}
          value={"last month"}
          onClick={() =>
            setCondition({
              condition: "between",
              value: [subDays(new Date(), 30), new Date()],
              accessor: accessor,
            })
          }
        >
          Last Month
        </ToggleButton>
        <ToggleButton
          key={"all"}
          value={"all"}
          onClick={() => setCondition(null)}
        >
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </Fragment>
  );
};
