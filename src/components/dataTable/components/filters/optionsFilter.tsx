import { useState } from "react";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import { FilterContainer } from "./filterContainer";
import { StyledSelect, StyledMenuItem } from "./styledComponents";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const myOptions = [
  { label: "abc", value: 1 },
  {
    label: "pqr",
    value: 2,
  },
  {
    label: "wer",
    value: 3,
  },
  {
    label: "rrrt",
    value: 4,
  },
  {
    label: "ertty",
    value: 5,
  },
];

export const MultipleSelectColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const [personName, setPersonName] = useState<string | string[]>([]);
  const [options, setOptions] = useState<
    {
      label: string;
      value: number;
    }[]
  >(myOptions);
  const handleSelectChange = (event: React.ChangeEvent<any>) => {
    setPersonName(event.target.value as string[]);
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
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  },
                },
              }}
              className={classes.multipleSelect}
            />
          </FormControl>
        </Box>
      )}
    </FilterContainer>
  );
};
