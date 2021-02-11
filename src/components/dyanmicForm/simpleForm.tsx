import { FC, useRef, Suspense } from "react";
import { useForm, SubmitFnType } from "packages/form";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { GroupWiseRenderedFieldsType, FormRenderConfigType } from "./types";
import { useStyles } from "./style";

interface FormProps {
  fields: GroupWiseRenderedFieldsType;
  formRenderConfig: FormRenderConfigType;
  formDisplayName: string;
  formName: string;
  submitFn: SubmitFnType;
  cancelFn: any;
}

export const SimpleForm: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
  submitFn,
  cancelFn,
}) => {
  const classes = useStyles();
  const { handleSubmit } = useForm({
    onSubmit: submitFn,
  });
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
        {typeof cancelFn === "function" ? (
          <Button
            type="button"
            className={classes.tabsSubmitBtn}
            onClick={cancelFn}
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
