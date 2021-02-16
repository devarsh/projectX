import { Suspense, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Alert from "@material-ui/lab/Alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";

export const MyTabs = ({
  formDisplayName,
  activeStep,
  filteredFieldGroups,
  formRenderConfig,
  steps,
  setActiveStep,
  handleSubmit,
  handleCancel,
  setFormModeState,
  currentFormMode,
  isSubmitting,
  serverSentError,
  defaultGroupName,
  fieldGroups,
  classes,
}) => (
  <Fragment>
    <AppBar position="relative" color="secondary">
      <Toolbar>
        <Typography component="div" variant="h6">
          {formDisplayName} - {currentFormMode}
        </Typography>
        <Box flexGrow={1} />
        {currentFormMode === "view" ? (
          <Button
            color="primary"
            type="button"
            onClick={() => setFormModeState("edit")}
          >
            Edit Form
          </Button>
        ) : (
          <Button type="button" color="primary" onClick={handleSubmit}>
            {formRenderConfig?.labels?.complete ?? "Submit"}
          </Button>
        )}
        {typeof handleCancel === "function" || currentFormMode === "edit" ? (
          <Button
            type="button"
            color="primary"
            onClick={
              currentFormMode === "edit"
                ? () => setFormModeState("view")
                : handleCancel
            }
          >
            Cancel
          </Button>
        ) : null}
      </Toolbar>
      {!isSubmitting && Boolean(serverSentError) ? (
        <Alert severity="error">{serverSentError}</Alert>
      ) : null}
    </AppBar>
    <Container maxWidth="lg" style={{ background: "white" }}>
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
      <div style={{ height: "65vh", overflowY: "auto", overflowX: "hidden" }}>
        <br />
        <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>
      </div>
    </Container>
  </Fragment>
);
