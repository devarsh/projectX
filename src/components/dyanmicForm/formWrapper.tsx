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

import {
  WrapperStyleProps,
  WrapperStyleNamesProps,
  wrapperStyles,
} from "app/styles";

/* Meta Data  -Remove this code when we move to server*/
import RetailLoanMetaData from "meta/retailsLoan";
/*end of Meta Data import*/

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

// interface ParentFormWrapperProps {
//   metaData: MetaDataType;
//   inititalValues?: InitialValuesType;
// }

const useStyles = makeStyles<Theme, WrapperStyleProps>(wrapperStyles);

export const ParentFormWrapper = () => {
  const location = useLocation();
  const params = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [submitProps, setSubmitProps] = useState({});
  const classes: WrapperStyleNamesProps = useStyles({} as WrapperStyleProps);

  let metaData = RetailLoanMetaData;
  let initialValues = {};
  //@ts-ignore
  const formCode = location?.state?.formCode ?? "123000000";
  const mapper = {
    "12300001": "Retail home Loan",
    "12300002": "Retail LAP",
    "12300003": "Retail LRD",
    "12300004": "Retail APF",
  };

  if (["12300001", "12300002", "12300003", "12300004"].indexOf(formCode) > -1) {
    metaData.form.name = formCode;
    metaData.form.label = mapper[formCode];
  } else {
    return <div>Page not found</div>;
  }
  return (
    <Box width={1} display="flex" className={classes.wrapper}>
      <MemoizedFormWrapper
        metaData={metaData}
        initialValues={initialValues}
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
