import { useState } from "react";
import { TextField } from "components/styledComponent/textfield";
import { SelectRenderOnly } from "components/common/select/render";
import Grid from "@material-ui/core/Grid";

const options = [
  { label: "starts with", value: "startsWith" },
  { label: "ends with", value: "endsWith" },
  { label: "equal", value: "equal" },
  { label: "contains", value: "contains" },
];

const isValidFilter = (filterBy) =>
  ["startsWith", "endsWith", "equal", "contains"].indexOf(filterBy) >= 0;

export const ValueFilter = ({
  column: { filterValue, id, columnName, filterProps },
  dispatch,
}) => {
  let filterBy = null;
  if (Boolean(filterProps)) {
    filterBy = filterProps?.filterBy;
  }
  const filterValid = isValidFilter(filterBy ?? "NOT_EXIST");
  const [text, setText] = useState(filterValue?.value ?? "");
  const [condition, setCondition] = useState(
    filterValue?.condition ?? filterValid ? filterBy : "equal"
  );
  const handleBlur = () => {
    if (Boolean(text)) {
      dispatch({
        type: "setValue",
        payload: {
          condition: condition,
          value: text,
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
      <TextField
        label={columnName}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        fullWidth
        value={text}
        InputProps={
          !filterValid
            ? {
                endAdornment: (
                  <SelectRenderOnly
                    size="small"
                    style={{ width: "50%" }}
                    touched={true}
                    error={""}
                    multiple={false}
                    handleChange={(e) => setCondition(e.target.value)}
                    handleBlur={() => true}
                    options={options}
                    disableCaching={false}
                    value={condition}
                    selectVariant="andornment"
                  />
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
};
