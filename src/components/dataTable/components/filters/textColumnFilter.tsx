import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import { CssTextField, StyledMenuItem } from "./styledComponents";
import { FilterContainer } from "./filterContainer";

export const TextColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const setFilterValue = () => {
    setFilter(filterValue);
  };
  return (
    <FilterContainer filterActionLabel="Apply" setFilterValue={setFilterValue}>
      {(classes) => (
        <Box
          display="flex"
          justifyContent="space-between"
          px={2}
          width={1}
          mt={2}
        >
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
        </Box>
      )}
    </FilterContainer>
  );
};
