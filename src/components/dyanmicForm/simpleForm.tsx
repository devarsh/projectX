import { FC, useRef, Suspense, useState, useEffect, useCallback } from "react";
import { useForm, SubmitFnType } from "packages/form";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { FormProps } from "./types";
import { useStyles } from "./style";

export const SimpleForm: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
  submitFn,
  cancelFn,
  defaultMode,
}) => {
  const classes = useStyles();
  const [formMode, setFormMode] = useState(defaultMode);
  const { handleSubmit, disableForm, enableForm } = useForm({
    onSubmit: submitFn,
  });
  const setFormModeState = useCallback(
    (mode: "view" | "edit" | "new") => {
      if (mode === "view") {
        setFormMode(mode);
        disableForm();
      } else if (mode === "edit" || mode === "new") {
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
    <div>
      <Box display="flex">
        <Typography component="h3" className={classes.title}>
          {formDisplayName} - {formMode}
        </Typography>
        <Box flexGrow={1} />
        {formMode === "view" ? (
          <Button
            type="button"
            className={classes.tabsSubmitBtn}
            onClick={() => setFormModeState("edit")}
          >
            Edit Form
          </Button>
        ) : (
          <Button
            type="button"
            className={classes.tabsSubmitBtn}
            onClick={handleSubmit}
          >
            {formRenderConfig?.labels?.complete ?? "Submit"}
          </Button>
        )}
        {typeof cancelFn === "function" || formMode === "edit" ? (
          <Button
            type="button"
            className={classes.tabsSubmitBtn}
            onClick={
              formMode === "edit" ? () => setFormModeState("view") : cancelFn
            }
          >
            Cancel
          </Button>
        ) : null}
      </Box>
      <div className={classes.form}>
        <div style={{ height: "70vh", overflowY: "auto", overflowX: "hidden" }}>
          <br />
          <br />
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
      </div>
    </div>
  );
};
