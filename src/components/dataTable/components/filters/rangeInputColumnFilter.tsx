import Box from "@material-ui/core/Box";
import { CssTextField } from "./styledComponents";
import { FilterContainer } from "./filterContainer";
export const RangeInputColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const setFilterValue = () => {
    setFilter(filterValue);
  };
  return (
    <FilterContainer filterActionLabel="Apply" setFilterValue={setFilterValue}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mt={2}
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
      ;
    </FilterContainer>
  );
};
