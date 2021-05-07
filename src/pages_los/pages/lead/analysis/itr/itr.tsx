import { Fragment, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { CorpositoryAPIInterface } from "./corpository";
import { ITRAPIInterface } from "./perfios";
import { Button } from "@material-ui/core";

export const ITRInterface = ({
  refID,
  moduleType,
  closeDialog,
  isDataChangedRef,
}) => {
  const [apiType, setApiType] = useState("");
  return (
    <Fragment>
      <div style={{ display: "flex", margin: "0px 16px" }}>
        <FormControl
          component="fieldset"
          size="small"
          margin="dense"
          fullWidth={true}
        >
          <FormLabel component="legend">Select API</FormLabel>
          <RadioGroup
            row
            aria-label="Select API"
            name="apiType"
            value={apiType}
            onChange={(e) => setApiType(e.target.value)}
          >
            <FormControlLabel
              value="perfios"
              control={<Radio />}
              label="ITR Analysis"
            />
            <FormControlLabel
              value="corpository"
              control={<Radio />}
              label="MCA Analysis"
            />
          </RadioGroup>
        </FormControl>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </div>
      {apiType === "perfios" ? (
        <ITRAPIInterface
          refID={refID}
          moduleType={moduleType}
          closeDialog={closeDialog}
          isDataChangedRef={isDataChangedRef}
        />
      ) : apiType === "corpository" ? (
        <CorpositoryAPIInterface
          refID={refID}
          moduleType={moduleType}
          closeDialog={closeDialog}
          isDataChangedRef={isDataChangedRef}
        />
      ) : null}
    </Fragment>
  );
};
