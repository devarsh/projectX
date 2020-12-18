import Box from "@material-ui/core/Box";
import { CssTextField, StyledMenuItem } from "./styledComponents";
import { FilterContainer } from "./filterContainer";

export const SelectColumnFilter = ({
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
    </FilterContainer>
  );
};
