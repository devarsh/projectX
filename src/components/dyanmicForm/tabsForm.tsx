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
    <Box display="flex">
      <Typography component="h3" className={classes.title}>
        {formDisplayName}
      </Typography>
      <Box flexGrow={1} />
      <Button
        type="button"
        className={classes.tabsSubmitBtn}
        onClick={handleSubmit}
      >
        {formRenderConfig?.labels?.complete ?? "Submit"}
      </Button>
      {typeof handleCancel === "function" ? (
        <Button
          type="button"
          className={classes.tabsSubmitBtn}
          onClick={handleCancel}
        >
          cancel
        </Button>
      ) : null}
    </Box>
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
      {/* <Box width={1} display="flex" justifyContent="flex-start">
        <Typography component="h4" className={classes.subTitle}>
          {typeof formRenderConfig.groups === "object"
            ? formRenderConfig.groups[fieldGroups.current[activeStep]]
            : defaultGroupName}
        </Typography>
      </Box> */}
      <div style={{ height: "70vh", overflowY: "auto", overflowX: "hidden" }}>
        <br />
        <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>
      </div>
    </div>
  </Fragment>
);
