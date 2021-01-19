import { Suspense, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

export const MyTabs = ({
  classes,
  formDisplayName,
  activeStep,
  filteredFieldGroups,
  formRenderConfig,
  defaultGroupName,
  fieldGroups,
  steps,
  setActiveStep,
  handleSubmit,
  handleCancel,
}) => (
  <Fragment>
    <Typography component="h3" className={classes.title}>
      {formDisplayName}
    </Typography>
    <div className={classes.form}>
      <Tabs value={Number(activeStep)}>
        {filteredFieldGroups.map((field) => {
          return (
            <Tab
              value={Number(field.index)}
              key={field.name}
              label={field.name}
              onClick={() => setActiveStep(Number(field.index))}
              style={field.hasError ? { color: "red" } : {}}
            />
          );
        })}
      </Tabs>
      <Box width={1} display="flex" justifyContent="flex-start">
        <Typography component="h4" className={classes.subTitle}>
          {typeof formRenderConfig.groups === "object"
            ? formRenderConfig.groups[fieldGroups.current[activeStep]]
            : defaultGroupName}
        </Typography>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>
      <Box width={1} display="flex" justifyContent="flex-end">
        <Button type="button" className={classes.submit} onClick={handleSubmit}>
          {formRenderConfig?.labels?.complete ?? "Submit"}
        </Button>
        {typeof handleCancel === "function" ? (
          <Button
            type="button"
            className={classes.submit}
            onClick={handleCancel}
          >
            cancel
          </Button>
        ) : null}
      </Box>
    </div>
  </Fragment>
);
