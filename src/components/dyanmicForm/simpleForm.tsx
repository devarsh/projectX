import {
  FC,
  useRef,
  Suspense,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { useForm } from "packages/form";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FormProps } from "./types";
import Alert from "@material-ui/lab/Alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";

export const SimpleForm: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
  submitFn,
  cancelFn,
  defaultMode,
}) => {
  const [formMode, setFormMode] = useState(defaultMode);
  const {
    handleSubmit,
    serverSentError,
    isSubmitting,
    disableForm,
    enableForm,
    clearError,
  } = useForm({
    onSubmit: submitFn,
    changeFormMode: setFormMode,
  });
  const setFormModeState = useCallback(
    (mode: "view" | "edit" | "new") => {
      if (mode === "view") {
        setFormMode(mode);
        disableForm();
      } else if (mode === "edit" || mode === "new") {
        clearError();
        setFormMode(mode);
        enableForm();
      }
    },
    [setFormMode, enableForm, disableForm]
  );
  useEffect(() => {
    setFormModeState(defaultMode);
  }, [defaultMode]);
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());

  const formComponentGroupWise = fieldGroups.current.map((one) => {
    const current = fields[one];
    return current.fields;
  });
  const FormComponent = formComponentGroupWise.reduce((one, accum) => {
    const newAccum = [...accum, ...one];
    return newAccum;
  }, []);

  return (
    <Fragment>
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <Typography component="div" variant="h6">
            {formDisplayName} - {formMode}
          </Typography>
          <Box flexGrow={1} />
          {formMode === "view" ? (
            <Button type="button" onClick={() => setFormModeState("edit")}>
              Edit Form
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit}>
              {formRenderConfig?.labels?.complete ?? "Submit"}
            </Button>
          )}
          {typeof cancelFn === "function" || formMode === "edit" ? (
            <Button
              type="button"
              onClick={
                formMode === "edit" ? () => setFormModeState("view") : cancelFn
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
        <br />
        <br />
        <div style={{ height: "65vh", overflowY: "auto", overflowX: "hidden" }}>
          <Grid
            container={true}
            spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
            direction={
              formRenderConfig?.gridConfig?.container?.direction ?? "row"
            }
          >
            <Suspense fallback={<div>Loading...</div>}>
              {FormComponent}
            </Suspense>
          </Grid>
        </div>
      </Container>
    </Fragment>
  );
};
