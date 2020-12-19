import { useState } from "react";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import { FilterContainer } from "./filterContainer";
import { StyledSelect, StyledMenuItem } from "./styledComponents";

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

export const MultipleSelectColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
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
  const applyFilter = () => {};
  const clearFilter = () => {};
  return (
    <FilterContainer applyFilter={applyFilter} clearFilter={clearFilter}>
      {(classes) => (
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
      )}
    </FilterContainer>
  );
};
