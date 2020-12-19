import { useState } from "react";
import Box from "@material-ui/core/Box";
import { StyledSlider } from "./styledComponents";
import { FilterContainer } from "./filterContainer";

export const RangeSliderColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const [value, setValue] = useState<number[]>([25, 65]);
  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const applyFilter = () => {};
  const clearFilter = () => {};

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
