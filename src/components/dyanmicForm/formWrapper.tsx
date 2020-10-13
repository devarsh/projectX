import { FC } from "react";
import { FormContext } from "packages/form";
import {
  renderFieldsByGroup,
  constructInitialValue,
  constructYupSchema,
} from "./renderer";
import { MetaDataType } from "./types";
import { Form } from "./stepperForm";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

interface FormWrapperProps {
  metaData: MetaDataType;
}

export const FormWrapper: FC<FormWrapperProps> = ({ metaData }) => {
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initialValues = constructInitialValue(metaData.fields);
  const yupValidationSchema = constructYupSchema(metaData.fields);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormContext.Provider
        value={{
          formName: metaData.form.name ?? "NO_NAME",
          resetFieldOnUnmount: Boolean(metaData.form.resetFieldOnUmnount),
          validationRun: metaData.form.validationRun,
          initialValues: initialValues,
          validationSchema: yupValidationSchema,
        }}
      >
        <Form
          fields={groupWiseFields}
          formRenderConfig={metaData.form.render}
          formDisplayName={metaData.form.label}
        />
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};
