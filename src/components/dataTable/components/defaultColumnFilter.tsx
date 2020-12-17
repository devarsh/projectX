import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
const useStyles = makeStyles((theme) =>
  createStyles({
    searchIcon: {
      padding: "6px",
    },
    searchWrap: {
      position: "absolute",
      right: "8px",
    },
    applyBtn: {
      margin: theme.spacing(2, 0, 2),
      fontSize: "1.2rem",
      background:
        "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
      border: 0,
      color: "#fff ",
      padding: "4px .75rem",
      fontWeight: 500,
      minWidth: "120px",
      letterSpacing: "0.02857em",
      boxShadow: "none",
      textTransform: "capitalize",
      alignSelf: "flex-end",
      "&:hover": {
        background:
          "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
        boxShadow: "none",
      },
    },
    multipleSelect: {
      marginTop: "0 !important",
      "&:after": {
        borderBottom: "2px solid #26A456",
      },
    },
    datePicker: {
      "& .MuiInput-underline": {
        "&:after": {
          borderBottom: "2px solid #26A456",
        },
      },
      "& .MuiInput-formControl": {
        marginTop: "0 !important",
      },
      "& input": {
        height: 18,
        fontSize: 12,
      },
    },
  })
);

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      border: "1px solid #BABABA",
      marginTop: "0 !important",
      borderRadius: 5,
      backgroundColor: "#fff",
      padding: "0 0",
      "& input": {
        padding: "4px 38px 4px 6px",
        marginTop: "0 !important",
        fontSize: "12px",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #26A456",
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px) scale(1)",
    },
    "& .MuiSelect-selectMenu": {
      minHeight: "18px",
      lineHeight: "18px",
      fontSize: 12,
    },
  },
})(TextField);
const StyledSelect = withStyles({
  root: {
    minHeight: "18px",
    lineHeight: "18px",
  },
  MuiInput: {
    underline: {
      "&:after": {
        borderBottom: "2px solid #3f51b5",
      },
    },
  },
})(Select);

const StyledSlider = withStyles({
  root: {
    color: "#26A456",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "& .MuiCheckbox-root": {
      padding: "2px 6px",
    },
  },
}))(MenuItem);

export const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const classes = useStyles();

  const [value, setValue] = useState<number[]>([25, 65]);
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const [selectedStartDate, setStartSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const handleStartDateChange = (date) => {
    setStartSelectedDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const [personName, setPersonName] = useState<string[]>([]);
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  return (
    <Box style={{ maxWidth: "360px" }}>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          width="60%"
          position="relative"
          pr={1}
        >
          <CssTextField
            fullWidth
            value={filterValue || ""}
            placeholder="Search"
            onChange={(e) => {
              setFilter(e.target.value); // Set undefined to remove the filter entirely
            }}
          />

          <div className={classes.searchWrap}>
            <IconButton
              aria-label="delete"
              color="secondary"
              className={classes.searchIcon}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Box>
        <Box width="40%" pl={1}>
          <CssTextField select placeholder="Select" fullWidth value={1}>
            <StyledMenuItem dense={true} value="0">
              Search with
            </StyledMenuItem>
            <StyledMenuItem dense={true} value={1}>
              Starts with
            </StyledMenuItem>
            <StyledMenuItem dense={true} value={2}>
              Ends with
            </StyledMenuItem>
            <StyledMenuItem dense={true} value={3}>
              General
            </StyledMenuItem>
            <StyledMenuItem dense={true} value={4}>
              Equal
            </StyledMenuItem>
          </CssTextField>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <FormControl fullWidth>
          <StyledSelect
            fullWidth
            multiple
            value={personName}
            onChange={handleSelectChange}
            input={<Input />}
            renderValue={(selected) => (selected as string[]).join(", ")}
            MenuProps={MenuProps}
            className={classes.multipleSelect}
          >
            {names.map((name) => (
              <StyledMenuItem key={name} value={name} dense={true}>
                <Checkbox
                  size="small"
                  checked={personName.indexOf(name) > -1}
                />
                <ListItemText primary={name} />
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <CssTextField select placeholder="Select" fullWidth value={0}>
          <StyledMenuItem dense={true} value={0}>
            Select Branch
          </StyledMenuItem>
          <StyledMenuItem dense={true} value={1}>
            Ahmedabad
          </StyledMenuItem>
          <StyledMenuItem dense={true} value={2}>
            Surat
          </StyledMenuItem>
          <StyledMenuItem dense={true} value={3}>
            Rajkot
          </StyledMenuItem>
        </CssTextField>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <StyledSlider
          valueLabelDisplay="auto"
          aria-label="range slider"
          defaultValue={20}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <StyledSlider
          value={value}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          onChange={handleChange}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        width={1}
      >
        <Box width="45%">
          <CssTextField placeholder="Min(0)" fullWidth />
        </Box>
        <Box width="10%" textAlign="center">
          to
        </Box>
        <Box width="45%">
          <CssTextField placeholder="Max(30)" fullWidth />
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        width={1}
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

      <Box display="flex" justifyContent="flex-end" p={2} width={1}>
        <Button className={classes.applyBtn}>Apply Filter</Button>
      </Box>
    </Box>
  );
};
