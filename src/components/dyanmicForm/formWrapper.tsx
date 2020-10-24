import { FC } from "react";
import { FormContext } from "packages/form";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import { constructInitialValue } from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { MetaDataType } from "./types";
import { Form } from "./stepperForm";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Container from "@material-ui/core/Container";
import { InitialValuesType } from "packages/form";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { singletonFunctionRegisrationFactory } from "./utils/functionRegistry";

interface FormWrapperProps {
  metaData: MetaDataType;
  inititalValues?: InitialValuesType;
}

interface FormWrapperAttachMethodsProps extends FormWrapperProps {
  attachMethods: boolean;
}

export const FormWrapperAttachMethods: FC<FormWrapperAttachMethodsProps> = ({
  metaData,
  inititalValues,
  attachMethods,
}) => {
  let newMetaData = metaData;
  if (attachMethods === true) {
    newMetaData = attachMethodsToMetaData(
      newMetaData,
      singletonFunctionRegisrationFactory
    );
  }
  return (
    <FormWrapper
      metaData={newMetaData}
      inititalValues={inititalValues}
    ></FormWrapper>
  );
};

export const FormWrapper: FC<FormWrapperProps> = ({
  metaData,
  inititalValues,
}) => {
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, inititalValues);
  const yupValidationSchema = constructYupSchema(metaData.fields);
  const onSubmitHandler = (values, submitEnd, setFieldsError) => {
    setTimeout(() => {
      console.log(values);
      submitEnd(true);
    }, 3000);
  };

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
          <Form
            fields={groupWiseFields}
            formRenderConfig={metaData.form.render}
            formDisplayName={metaData.form.label}
            formName={metaData.form.name}
            submitFn={onSubmitHandler}
          />
        </Container>
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};
