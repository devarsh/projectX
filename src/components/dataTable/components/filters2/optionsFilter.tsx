import { useState } from "react";
import { SelectRenderOnly } from "components/common/select/render";
import Grid from "@material-ui/core/Grid";

export const OptionsFilter = ({
  column: { filterValue, id, columnName, filterComponentProps },
  dispatch,
}) => {
  const [value, setValue] = useState(filterValue?.value ?? []);
  const handleChange = (e, values) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    if (Array.isArray(value) && value.length > 0) {
      dispatch({
        type: "setValue",
        payload: {
          condition: "in",
          value: value,
          id,
          columnName,
        },
      });
    } else {
      dispatch({
        type: "removeValue",
        payload: {
          id,
        },
      });
    }
  };

  return (
    <Grid item xs={12} sm={6} md={6}>
      <SelectRenderOnly
        label={columnName}
        showCheckbox={true}
        value={value}
        size="small"
        fullWidth
        touched={true}
        error={""}
        multiple={true}
        handleChange={handleChange}
        handleBlur={handleBlur}
        options={filterComponentProps?.options ?? []}
        _optionsKey={filterComponentProps?._optionsKey ?? ""}
        optionsProps={{}}
        disableCaching={false}
        selectVariant="regular"
      />
    </Grid>
  );
};
