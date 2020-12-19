import { useState } from "react";
import Box from "@material-ui/core/Box";
import { CssTextField } from "./styledComponents";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { StyledSlider } from "./styledComponents";
import { FilterContainer } from "./filterContainer";

export const RangeFilterFn = (rows) => {
  return rows;
};
RangeFilterFn.autoRemove = (val) => {
  console.log(!val?.value ?? "");
  return !val?.value ?? "";
};

export const RangeFilterWrapper = (props) => {
  console.log(props);
  const type = props?.column?.filterComponentProps?.type ?? "slider";
  if (type === "slider") {
    return <RangeSliderColumnFilter {...props} />;
  }
  return <RangeColumnFilter {...props} />;
};

const RangeSliderColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
  handleClose,
}) => {
  const [value, setValue] = useState<number[]>(filterValue.value ?? [0, 100]);
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const applyFilter = () => {
    setFilter({
      condition: "between",
      value: value,
    });
    handleClose();
  };
  const clearFilter = () => {
    setFilter({
      options: [],
    });
    handleClose();
  };

  return (
    <FilterContainer applyFilter={applyFilter} clearFilter={clearFilter}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mt={6}
        mb={2}
      >
        <StyledSlider
          value={value}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          onChange={handleChange}
        />
      </Box>
    </FilterContainer>
  );
};

const RangeColumnFilter = ({
  column: { filterValue, preFilteredRows, filterComponentProps, setFilter },
  handleClose,
}) => {
  const componentType = filterComponentProps?.type ?? "minMax";
  const [minValue, setMinValue] = useState(filterValue?.value[0] ?? 0);
  const [maxValue, setMaxValue] = useState(filterValue?.value[1] ?? 100);

  const applyFilter = () => {
    setFilter({
      condition: "between",
      value: [minValue, maxValue],
    });
    handleClose();
  };
  const clearFilter = () => {
    setFilter({
      options: [],
    });
    handleClose();
  };

  return (
    <FilterContainer applyFilter={applyFilter} clearFilter={clearFilter}>
      {(classes) => (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          width={1}
          mt={2}
        >
          {componentType === "minMax" ? (
            <MinMaxValueRenderer
              minValue={minValue}
              maxValue={maxValue}
              setMinValue={setMinValue}
              setMaxValue={setMaxValue}
            />
          ) : (
            <DateRangeRenderer
              minValue={minValue}
              maxValue={maxValue}
              setMinValue={setMinValue}
              setMaxValue={setMaxValue}
              classes={classes}
            />
          )}
        </Box>
      )}
    </FilterContainer>
  );
};

const MinMaxValueRenderer = ({
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}) => (
  <>
    <Box width="45%">
      <CssTextField
        fullWidth
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
      />
    </Box>
    <Box width="10%" textAlign="center">
      to
    </Box>
    <Box width="45%">
      <CssTextField
        fullWidth
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
      />
    </Box>
  </>
);

const DateRangeRenderer = ({
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  classes,
}) => (
  <>
    <Box width="45%">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          placeholder="Start Date"
          format="dd/MM/yyyy"
          value={minValue}
          onChange={setMinValue}
          KeyboardButtonProps={{
            "aria-label": "Select Date",
          }}
          className={classes.datePicker}
        />
      </MuiPickersUtilsProvider>
    </Box>
    <Box width="10%" textAlign="center">
      to
    </Box>
    <Box width="45%">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          placeholder="End Date"
          format="dd/MM/yyyy"
          value={maxValue}
          onChange={setMaxValue}
          KeyboardButtonProps={{
            "aria-label": "Select Date",
          }}
          className={classes.datePicker}
        />
      </MuiPickersUtilsProvider>
    </Box>
  </>
);
