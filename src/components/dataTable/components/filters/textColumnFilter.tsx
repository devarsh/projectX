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
          <Box width="32%">
            <CssTextField
              select
              placeholder="Select"
              fullWidth
              value={1}
              className={classes.adornmentSelect}
            >
              <StyledMenuItem dense={true} value="0">
                <i>Search with</i>
              </StyledMenuItem>
              <StyledMenuItem dense={true} value={1}>
                Starts with
              </StyledMenuItem>
              <StyledMenuItem dense={true} value={2}>
                Ends with
              </StyledMenuItem>
              <StyledMenuItem dense={true} value={3}>
                Contains
              </StyledMenuItem>
              <StyledMenuItem dense={true} value={4}>
                Equals
              </StyledMenuItem>
            </CssTextField>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            width="68%"
            position="relative"
          >
            <CssTextField
              fullWidth
              value={filterValue || ""}
              placeholder="Search"
              onChange={(e) => {
                setFilter(e.target.value); // Set undefined to remove the filter entirely
              }}
              className={classes.searchField}
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
