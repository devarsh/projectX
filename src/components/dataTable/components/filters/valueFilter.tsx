import { useState } from "react";
import Box from "@material-ui/core/Box";
import { CssTextField, StyledMenuItem } from "./styledComponents";
import { FilterContainer } from "./filterContainer";

export const TextColumnFilter = ({
  column: { filterValue, setFilter },
  handleClose,
}) => {
  const options = [
    { label: "starts with", value: "startsWith" },
    { label: "ends with", value: "endsWith" },
    { label: "equals", value: "equals" },
    { label: "contains", value: "contains" },
  ];
  const [text, setText] = useState(filterValue?.value ?? "");
  const [searchCriteria, setSearchCriteria] = useState(
    filterValue?.condition ?? ""
  );
  const setFilterValue = () => {
    setFilter({
      condition: searchCriteria,
      value: text,
    });
    handleClose();
  };

  const optionValues = options.map((one) => (
    <StyledMenuItem key={one.value} dense={true} value={one.value}>
      {one.label}
    </StyledMenuItem>
  ));

  return (
    <FilterContainer filterActionLabel="Apply" setFilterValue={setFilterValue}>
      <Box
        display="flex"
        justifyContent="space-between"
        px={2}
        width={1}
        mt={2}
      >
        <Box width="40%" pl={1}>
          <CssTextField
            select
            placeholder="Select"
            fullWidth
            value={searchCriteria}
            onChange={(e) => {
              setSearchCriteria(e.target.value);
            }}
          >
            {optionValues}
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
            value={text || ""}
            placeholder="Search"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Box>
      </Box>
    </FilterContainer>
  );
};
