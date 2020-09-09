import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxLabels() {
  const [state, setState] = React.useState(true);

  const handleChange = (event) => {
    event.persist();
    setState(event.target.checked);
  };
  const handleBlur = (event) => {
    console.log(event);
  };
  return (
    <FormControl error={true}>
      <FormControlLabel
        control={<Checkbox />}
        checked={state}
        onChange={handleChange}
        onBlur={handleBlur}
        name="checkedA"
        label="Secondary"
      />
      <FormHelperText>sddksjflkd</FormHelperText>
    </FormControl>
  );
}
