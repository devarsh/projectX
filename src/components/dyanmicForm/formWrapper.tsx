import { FC, useState, memo } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormContext, InitialValuesType } from "packages/form";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import { constructInitialValue } from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { singletonFunctionRegisrationFactory } from "./utils/functionRegistry";
import { MetaDataType } from "./types";
import { StepperForm } from "./stepperForm";
import { FormVerificationDialog } from "./formVerificationDialog";
import { useLocation, useParams } from "react-router-dom";
import { chooseNaviagtionPath } from "./utils/navigationLogic";

import {
  WrapperStyleProps,
  WrapperStyleNamesProps,
  wrapperStyles,
} from "app/styles";

interface FormWrapperProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
  setShowDialog: Function;
  setSubmitProps: Function;
}

const FormWrapper: FC<FormWrapperProps> = ({
  metaData,
  initialValues,
  setShowDialog,
  setSubmitProps,
}) => {
  metaData = attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory
  );
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, initialValues);
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
            key={metaData.form.name}
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

const useStyles = makeStyles<Theme, WrapperStyleProps>(wrapperStyles);

export const ParentFormWrapper = () => {
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [submitProps, setSubmitProps] = useState({});
  const classes: WrapperStyleNamesProps = useStyles({} as WrapperStyleProps);
  let initialValues = {};

  const { state } = location;

  const result = chooseNaviagtionPath(
    //@ts-ignore
    state?.formCode ?? "",
    //@ts-ignore
    state?.productCode ?? ""
  );
  if (result.metaData === null) {
    return <div>Opps cannot load this form</div>;
  }
  return (
    <Box width={1} display="flex" className={classes.wrapper}>
      <MemoizedFormWrapper
        metaData={result.metaData}
        initialValues={initialValues}
        setShowDialog={setShowDialog}
        setSubmitProps={setSubmitProps}
      />
      {showDialog ? (
        <FormVerificationDialog
          isOpen={showDialog}
          setShowDialog={setShowDialog}
          submitProps={submitProps}
        />
      ) : null}
    </Box>
  );
};
