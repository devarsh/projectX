import { useState } from "react";
import Box from "@material-ui/core/Box";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useStyles } from "./style";
import { FilterContainer } from "./filterContainer";

export const DateRangeColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const classes = useStyles();

  const [selectedStartDate, setStartSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const handleStartDateChange = (date) => {
    setStartSelectedDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const setFilterValue = () => {};

  return (
    <FilterContainer setFilterValue={setFilterValue}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        width={1}
        mt={2}
      >
        <Box width="45%">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              fullWidth
              placeholder="Start Date"
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              value={selectedStartDate}
              onChange={handleStartDateChange}
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
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                "aria-label": "Select Date",
              }}
              className={classes.datePicker}
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Box>
    </FilterContainer>
  );
};
