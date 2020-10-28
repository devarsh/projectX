import { FC, useState, memo, Fragment } from "react";
import { FormContext } from "packages/form";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import { constructInitialValue } from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { MetaDataType } from "./types";
import { StepperForm } from "./stepperForm";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Container from "@material-ui/core/Container";
import { InitialValuesType } from "packages/form";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { singletonFunctionRegisrationFactory } from "./utils/functionRegistry";
import { FormVerificationDialog } from "components/dyanmicForm/formVerificationDialog";
import Box from "@material-ui/core/Box";
interface FormWrapperProps {
  metaData: MetaDataType;
  inititalValues?: InitialValuesType;
  setShowDialog: Function;
  setSubmitProps: Function;
}

const FormWrapper: FC<FormWrapperProps> = ({
  metaData,
  inititalValues,
  setShowDialog,
  setSubmitProps,
}) => {
  metaData = attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory
  );
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, inititalValues);
  const yupValidationSchema = constructYupSchema(metaData.fields);
  const onSubmitHandler = (values, submitEnd) => {
    setSubmitProps(() => ({
      values: values,
      submitEnd: submitEnd,
    }));
    setShowDialog(true);
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
          <StepperForm
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

const MemoizedFormWrapper = memo(FormWrapper);

interface ParentFormWrapperProps {
  metaData: MetaDataType;
  inititalValues?: InitialValuesType;
}

export const ParentFormWrapper: FC<ParentFormWrapperProps> = ({
  metaData,
  inititalValues,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [submitProps, setSubmitProps] = useState({});
  return (
    <Box width={1} display="flex" 
    // className={classes.wrapper}
    >
      <MemoizedFormWrapper
        metaData={metaData}
        inititalValues={inititalValues}
        setShowDialog={setShowDialog}
        setSubmitProps={setSubmitProps}
      />
      {showDialog ? (
        <FormVerificationDialog
          isOpen={showDialog}
          setShowDialog={setShowDialog}
          submitProps={submitProps}
          nextPagePath={metaData?.form?.navigation?.nextPage}
        />
      ) : null}
    </Box>
  );
};
