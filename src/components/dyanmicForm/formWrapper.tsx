import { FC, useState, useEffect, useRef, memo, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormContext, InitialValuesType } from "packages/form";
import { APISDK } from "registry/fns/sdk";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import { constructInitialValue } from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { singletonFunctionRegisrationFactory } from "./utils/functionRegistry";
import { extendFieldTypes } from "./utils/extendedFieldTypes";
import { MetaDataType } from "./types";
import { StepperForm } from "./stepperForm";
import { FormVerificationDialog } from "./formVerificationDialog";
import {
  formWrapperStyle,
  FormWrapperStyleProps,
  FormWrapperStyleNamesProps,
} from "./style";
import { extendedMetaData } from "./extendedTypes";
import loaderGif from "assets/images/loader.gif";

const useStyles = makeStyles<Theme, FormWrapperStyleProps>(formWrapperStyle);

interface FormWrapperProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
  setShowDialog: Function;
  setSubmitProps: Function;
  tranCode?: string; //Ref code for inquiry form
  formCode?: string;
  empCode?: string;
}

const FormWrapper: FC<FormWrapperProps> = ({
  metaData,
  initialValues,
  setShowDialog,
  setSubmitProps,
  tranCode,
  formCode,
  empCode,
}) => {
  const navigate = useNavigate();
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory
  );
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, initialValues);
  const yupValidationSchema = constructYupSchema(metaData.fields);
  const onSubmitHandler = (
    submitAction: string,
    tranCode?: string,
    formCode?: string
  ) => (values, submitEnd) => {
    if (`${empCode}` === "98") {
      setSubmitProps(() => ({
        values: values,
        submitEnd: submitEnd,
        submitAction: submitAction,
        formCode: formCode,
        tranCode: tranCode,
      }));
      setShowDialog(true);
    } else {
      const data = APISDK.pushFormData(
        submitAction,
        values,
        formCode,
        tranCode ?? ""
      );
      console.log(data);
      submitEnd(true);
      navigate("/thankyou");
    }
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
            submitFn={onSubmitHandler(
              metaData.form.submitAction as string,
              tranCode,
              formCode
            )}
          />
        </Container>
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};

const MemoizedFormWrapper = memo(FormWrapper);

const checkValidMetaData = (metaData) => {
  if (Boolean(metaData) && typeof metaData === "object") {
    const { form, fields } = metaData;
    if (
      Array.isArray(fields) &&
      fields.length > 0 &&
      typeof form === "object"
    ) {
      return true;
    }
  }
  return false;
};

export const ParentFormWrapper = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  let metaData = useRef<MetaDataType | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [submitProps, setSubmitProps] = useState({});
  const { state } = location;
  const classes: FormWrapperStyleNamesProps = useStyles(
    {} as FormWrapperStyleProps
  );

  //passed as NOOP attach it if api returns the same
  let initialValues = {};
  //@ts-ignore

  useEffect(() => {
    setLoading(true);
    metaData.current = null;
    //@ts-ignore need to find how to set router loaction state type (react-router-dom)
    APISDK.getMetaData(state?.formCode, state?.empCode)
      .then((result) => {
        metaData.current = result;
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    //@ts-ignore
  }, [state?.formCode, state?.empCode]);
  const result = loading ? (
    <img src={loaderGif} className={classes.loader} alt="loader" />
  ) : !checkValidMetaData(metaData.current) ? (
    <span>"Error loading form"</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        metaData={metaData.current as MetaDataType}
        initialValues={initialValues}
        setShowDialog={setShowDialog}
        setSubmitProps={setSubmitProps}
        //@ts-ignore - this for ref to previous inquiry form
        tranCode={state?.tranCode ?? ""}
        //@ts-ignore - form code for this form i.e formName
        formCode={state?.formCode ?? ""}
        //@ts-ignore - for otp page when
        empCode={state?.empCode ?? ""}
      />
      {showDialog ? (
        <FormVerificationDialog
          isOpen={showDialog}
          setShowDialog={setShowDialog}
          submitProps={submitProps}
        />
      ) : null}
    </Fragment>
  );
  return <div className={classes.paper}>{result}</div>;
};
