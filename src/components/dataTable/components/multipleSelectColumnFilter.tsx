import { useState } from "react";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./style";

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

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "& .MuiCheckbox-root": {
      padding: "2px 6px",
    },
  },
}))(MenuItem);

export const MultipleSelectColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const classes = useStyles();

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
    <Box style={{ width: "360px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mt={2}
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

      <Box display="flex" justifyContent="flex-end" px={2} width={1}>
        <Button className={classes.applyBtn}>Apply Filter</Button>
      </Box>
    </Box>
  );
};
