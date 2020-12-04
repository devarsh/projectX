import { FC, useRef, Suspense } from "react";
import { useForm, SubmitFnType } from "packages/form";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { GroupWiseRenderedFieldsType, FormRenderConfigType } from "./types";
import { formStyle, FormStyleProps, FormStyleNamesProps } from "./style";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme, FormStyleProps>(formStyle);

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
  const classes: FormStyleNamesProps = useStyles({} as FormStyleProps);
  const { handleSubmit } = useForm({
    onSubmit: submitFn,
  });
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());

  const FormComponent = fieldGroups.current.map((one, index) => {
    const current = fields[one];
    return (
      <Grid
        key={one}
        container={true}
        spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
        direction={formRenderConfig?.gridConfig?.container?.direction ?? "row"}
        style={{ marginTop: "100px" }}
      >
        {current.fields}
      </Grid>
    );
  });

  return (
    <div>
      <Typography component="h3" className={classes.title}>
        {formDisplayName}
      </Typography>
      <div className={classes.form}>
        <Suspense fallback={<div>Loading...</div>}>{FormComponent}</Suspense>

        <Box width={1} display="flex" justifyContent="flex-end">
          <Button
            type="button"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Complete
          </Button>
        </Box>
      </div>
    </div>
  );
};

const isGroupExcluded = (
  formName: string,
  currentFields: string[],
  excludedFields: string[]
) => {
  const remaningFields = currentFields.filter((fieldName) => {
    const fullFieldName = `${formName}/${fieldName}`;
    return excludedFields.indexOf(fullFieldName) >= 0 ? false : true;
  });
  if (remaningFields.length > 0) {
    return true;
  }
  return false;
};
