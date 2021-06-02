import { useState } from "react";
import { SelectRenderOnly } from "components/common/select/render";
import { KeyboardDatePicker } from "components/styledComponent/datetime";
import Grid from "@material-ui/core/Grid";
import { subDays } from "date-fns";

const options = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Last Week", value: "lastWeek" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Custom", value: "custom" },
];

export const DateRange = ({
  column: { filterValue, id, columnName },
  dispatch,
}) => {
  const [minValue, setMinValue] = useState(
    Array.isArray(filterValue?.value)
      ? filterValue?.value[0] ?? null
      : filterValue?.value ?? null
  );
  const [maxValue, setMaxValue] = useState(
    Array.isArray(filterValue?.value) ? filterValue?.value[1] ?? null : null
  );

  const [option, setOption] = useState(filterValue?.option ?? "all");
  const handleOptionChange = (e, values) => {
    let today = new Date();
    if (e.target.value === "today") {
      setMinValue(today);
    } else if (e.target.value === "lastWeek") {
      setMaxValue(today);
      setMinValue(subDays(today, 7));
    } else if (e.target.value === "lastMonth") {
      setMaxValue(today);
      setMinValue(subDays(today, 30));
    } else if (e.target.value === "all" || e.target.value === "custom") {
      setMinValue(null);
      setMaxValue(null);
    }
    setOption(e.target.value);
  };

  const handleBlur = (e) => {
    if (option === "today") {
      dispatch({
        type: "setValue",
        payload: {
          condition: "equal",
          value: minValue,
          id,
          option,
          columnName,
        },
      });
    } else if (
      (option === "lastWeek" ||
        option === "lastMonth" ||
        option === "custom") &&
      minValue instanceof Date &&
      maxValue instanceof Date &&
      //@ts-ignore
      !isNaN(minValue) &&
      //@ts-ignore
      !isNaN(maxValue) &&
      minValue <= maxValue
    ) {
      dispatch({
        type: "setValue",
        payload: {
          condition: "between",
          value: [minValue, maxValue],
          id,
          option,
          columnName,
        },
      });
    } else {
      dispatch({
        type: "removeValue",
        payload: {
          id,
        },
      });
    }
  };
  const propsToPassForSelect =
    option === "custom" ? { style: { width: "40%" } } : { fullWidth: true };

  return (
    <Grid
      item
      xs={12}
      sm={option === "custom" ? 12 : 6}
      md={option === "custom" ? 12 : 6}
    >
      <div
        style={{ width: "100%", display: "flex" }}
        tabIndex={1}
        onBlur={handleBlur}
      >
        <SelectRenderOnly
          label={columnName}
          value={option}
          size="small"
          touched={true}
          error={""}
          handleChange={handleOptionChange}
          handleBlur={() => true}
          options={options}
          _optionsKey={"dateRangePicker"}
          optionsProps={{}}
          disableCaching={false}
          selectVariant="regular"
          {...propsToPassForSelect}
        />
        {option === "custom" ? (
          <>
            <span
              style={{ width: "1%", textAlign: "center", marginTop: "32px" }}
            ></span>
            <KeyboardDatePicker
              placeholder="Start Date"
              format="dd/MM/yyyy"
              KeyboardButtonProps={{
                "aria-label": "Select Date",
              }}
              label="From Date"
              onChange={setMinValue}
              value={minValue}
              style={{ width: "30%" }}
              InputLabelProps={{ shrink: true }}
            />
            <span
              style={{ width: "1%", textAlign: "center", marginTop: "32px" }}
            ></span>
            <KeyboardDatePicker
              placeholder="End Date"
              format="dd/MM/yyyy"
              KeyboardButtonProps={{
                "aria-label": "Select Date",
              }}
              label="To Date"
              minDate={minValue}
              onChange={setMaxValue}
              value={maxValue}
              style={{ width: "30%" }}
              InputLabelProps={{ shrink: true }}
            />
          </>
        ) : null}
      </div>
    </Grid>
  );
};
