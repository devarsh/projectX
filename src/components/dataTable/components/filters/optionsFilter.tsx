import { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FilterContainer } from "./filterContainer";
import { StyledTextField, StyledMenuItem } from "../../styledComponents";
import { APISDK } from "registry/fns/sdk";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

export const OptionsFilter = (props) => {
  const {
    column: {
      filterValue,
      setFilter,
      filterComponentProps: { selectType },
      id,
    },
    globalFiltersState,
    localFilterManager,
    gridCode,
    handleClose,
    setSortBy,
    gotoPage,
  } = props;
  const isMultiple = selectType === "multiple" ? true : false;
  const [loading, setLoading] = useState(false);
  const [_options, setOptions] = useState(
    localFilterManager.getFilterState(id)?.options ?? []
  );
  const defaultValue = Boolean(filterValue?.value)
    ? filterValue?.value
    : isMultiple
    ? []
    : "";

  const [value, setValue] = useState<string | string[]>(defaultValue);
  useEffect(() => {
    if (!Boolean(localFilterManager.getFilterState(id))) {
      setLoading(true);
      const verifiedGlobalFilter =
        typeof globalFiltersState === "object" && globalFiltersState !== null
          ? Object.values(globalFiltersState)
          : [];
      APISDK.fetchGridColumnFilterProps(gridCode, {
        accessor: id,
        result_type: "getGroups",
        filter_conditions: verifiedGlobalFilter,
      }).then((result) => {
        if (result.status === "success") {
          localFilterManager.addFilterState(id, {
            options: result.data?.groups,
          });
          setOptions(result.data?.groups ?? []);
          setLoading(false);
        } else {
          setLoading(false);
          setOptions([{ label: "Couldnt load data", value: "" }]);
        }
      });
    }
  }, [gridCode, id, setLoading, setOptions]);

  const handleSelectChange = (event: React.ChangeEvent<any>) => {
    setValue(event.target.value);
  };

  const applyFilter = () => {
    setFilter({
      condition: isMultiple ? "in" : "equal",
      value,
    });
    setSortBy([]);
    gotoPage(0);
    handleClose();
  };
  const clearFilter = () => {
    setFilter("");
    setSortBy([]);
    gotoPage(0);
    handleClose();
  };

  const menuItems = _options.map((menuItem, index) => {
    return (
      <StyledMenuItem
        //keep button value to true else keyboard navigation for select will stop working
        button={true}
        key={menuItem.value ?? index}
        value={menuItem.value}
      >
        {isMultiple ? (
          <Checkbox
            checked={
              Boolean(isMultiple)
                ? Array.isArray(value) && value.indexOf(menuItem.value) >= 0
                : value === menuItem.value
            }
          />
        ) : null}
        {menuItem.label}
      </StyledMenuItem>
    );
  });

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
            <StyledTextField
              fullWidth
              select={true}
              value={value}
              SelectProps={{
                multiple: isMultiple ? true : false,
                native: false,
                renderValue: isMultiple
                  ? (values: any[] | any) => {
                      if (!Array.isArray(values)) {
                        values = [values];
                      }
                      if (Array.isArray(_options)) {
                        return _options.reduce((acc, current) => {
                          if (values.indexOf(current.value) >= 0) {
                            if (acc === "") {
                              return current.label;
                            } else {
                              return `${acc},${current.label}`;
                            }
                          }
                          return acc;
                        }, "");
                      }
                      return "";
                    }
                  : undefined,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: loading ? (
                  <InputAdornment position="end">
                    <CircularProgress color="primary" variant="indeterminate" />
                  </InputAdornment>
                ) : null,
              }}
              onChange={handleSelectChange}
              className={classes.multipleSelect}
            >
              {menuItems}
            </StyledTextField>
          </FormControl>
        </Box>
      )}
    </FilterContainer>
  );
};
