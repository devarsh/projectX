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
}

export const SimpleForm: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
  submitFn,
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
      <Typography component="h3" className={classes.title}>
        {formDisplayName}
      </Typography>
      <div className={classes.form}>
        <Grid
          container={true}
          spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
          direction={
            formRenderConfig?.gridConfig?.container?.direction ?? "row"
          }
        >
          <Suspense fallback={<div>Loading...</div>}>{FormComponent}</Suspense>
        </Grid>
        <Box width={1} display="flex" justifyContent="flex-end">
          <Button
            type="button"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {formRenderConfig?.labels?.complete ?? "Submit"}
          </Button>
        </Box>
      </div>
    </div>
  );
};
