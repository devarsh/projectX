import { FC, useState, useRef, Suspense, cloneElement } from "react";
import { useForm, SubmitFnType } from "packages/form";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";
import { GroupWiseRenderedFieldsType, FormRenderConfigType } from "./types";
import { formStyle, FormStyleProps, FormStyleNamesProps } from "./style";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme, FormStyleProps>(formStyle);

interface FormProps {
  fields: GroupWiseRenderedFieldsType;
  formRenderConfig: FormRenderConfigType;
  formDisplayName: string;
  submitFn: SubmitFnType;
}

export const Form: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
  submitFn,
}) => {
  const classes: FormStyleNamesProps = useStyles({} as FormStyleProps);
  const [activeStep, setActiveStep] = useState(0);
  const { handleSubmit, handleSubmitPartial } = useForm({
    onSubmit: submitFn,
  });
  const fieldGroups = useRef<string[]>(Object.keys(fields));

  const handleNext = async () => {
    if (activeStep < fieldGroups.current.length - 1) {
      const currentStep = fieldGroups.current[activeStep];
      const currentFieldsToValidate = fields[currentStep].fieldNames;
      let isError = await handleSubmitPartial(currentFieldsToValidate);
      if (!isError) {
        setActiveStep((last) => last + 1);
      }
    }
  };
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((last) => last - 1);
    }
  };

  const steps = fieldGroups.current.map((one, index) => {
    const current = fields[one];
    current.fields[0] = cloneElement(current.fields[0], {
      isFieldFocused: index === activeStep ? true : false,
    });
    const hideMe = index !== activeStep ? { display: "none" } : {};
    return (
      <Grid
        key={one}
        container={true}
        spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
        direction={formRenderConfig?.gridConfig?.container?.direction ?? "row"}
        style={hideMe}
      >
        {current.fields}
      </Grid>
    );
  });

  return (
    <div className={classes.paper}>
      <Typography component="h3" className={classes.title}>
        {formDisplayName}
      </Typography>
      <div className={classes.form}>
        <Stepper activeStep={activeStep}>
          {fieldGroups.current.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box width={1} display="flex" justifyContent="flex-start">
          <Typography component="h4" className={classes.subTitle}>
            {fieldGroups.current[activeStep]}
          </Typography>
        </Box>
        <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>

        <Box width={1} display="flex" justifyContent="flex-end">
          {activeStep === 0 ? null : (
            <Button type="button" onClick={handlePrev}>
              Back
            </Button>
          )}
          {activeStep < fieldGroups.current.length - 1 ? (
            <Button
              type="button"
              className={classes.submit}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Complete
            </Button>
          )}
        </Box>
      </div>
    </div>
  );
};
