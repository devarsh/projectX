import { FC } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormContext, InitialValuesType, SubmitFnType } from "packages/form";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import { renderFieldsByTab } from "./utils/tabWiserenderer";
import { constructInitialValue } from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { singletonFunctionRegisrationFactory } from "./utils/functionRegistry";
import { extendFieldTypes } from "./utils/extendedFieldTypes";
import { MoveSequenceToRender } from "./utils/fixSequenceInMetaData";
import { MetaDataType } from "./types";
import { StepperForm } from "./stepperForm";
import { SimpleForm } from "./simpleForm";
import { TabbedForm } from "./tabForm";
import { extendedMetaData } from "./extendedTypes";

interface FormWrapperProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
  onSubmitHandler: SubmitFnType;
}

export const FormWrapper: FC<FormWrapperProps> = ({
  metaData,
  initialValues,
  onSubmitHandler,
}) => {
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory
  );
  metaData = MoveSequenceToRender(metaData);
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, initialValues);
  const yupValidationSchema = constructYupSchema(metaData.fields);

  const tabWiseFields = renderFieldsByTab(metaData);

  const formRenderType = metaData.form.render.renderType ?? "simple";
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormContext.Provider
        value={{
          formName: metaData.form.name ?? "NO_NAME",
          resetFieldOnUnmount: Boolean(metaData.form.resetFieldOnUmnount),
          validationRun: metaData.form.validationRun,
          initialValues: initValues,
          validationSchema: yupValidationSchema,
        }}
      >
        <Container component="main">
          {formRenderType === "stepper" ? (
            <StepperForm
              key={metaData.form.name}
              fields={groupWiseFields}
              formRenderConfig={metaData.form.render}
              formDisplayName={metaData.form.label}
              formName={metaData.form.name}
              submitFn={onSubmitHandler}
            />
          ) : formRenderType === "simple" ? (
            <SimpleForm
              key={metaData.form.name}
              fields={groupWiseFields}
              formRenderConfig={metaData.form.render}
              formDisplayName={metaData.form.label}
              formName={metaData.form.name}
              submitFn={onSubmitHandler}
            />
          ) : formRenderType === "tabs" ? (
            <TabbedForm
              key={metaData.form.name}
              fields={tabWiseFields}
              formRenderConfig={metaData.form.render}
              formDisplayName={metaData.form.label}
              formName={metaData.form.name}
              submitFn={onSubmitHandler}
            />
          ) : (
            <div>RenderType {formRenderType} not available</div>
          )}
        </Container>
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};
