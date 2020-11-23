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
import { validateMetaData } from "./utils/validateMetaData";
import { extendFieldTypes } from "./utils/extendedFieldTypes";
import { MoveSequenceToRender } from "./utils/fixSequenceInMetaData";
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
import { displayOTPPage } from "./navHelpers";

const useStyles = makeStyles<Theme, FormWrapperStyleProps>(formWrapperStyle);

interface FormWrapperProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
  setShowDialog: Function;
  setSubmitProps: Function;
  navigationProps: Object;
}

const FormWrapper: FC<FormWrapperProps> = ({
  metaData,
  initialValues,
  setShowDialog,
  setSubmitProps,
  navigationProps,
}) => {
  const navigate = useNavigate();
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory
  );
  metaData = MoveSequenceToRender(metaData);
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, initialValues);
  const yupValidationSchema = constructYupSchema(metaData.fields);
  const onSubmitHandler = (submitAction: string, navigationProps: Object) => (
    values,
    submitEnd
  ) => {
    if (displayOTPPage(navigationProps)) {
      setSubmitProps(() => ({
        values: values,
        submitEnd: submitEnd,
        submitAction: submitAction,
        navigationProps: navigationProps,
      }));
      setShowDialog(true);
    } else {
      const data = APISDK.pushFormData(submitAction, values, navigationProps);
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
              navigationProps
            )}
          />
        </Container>
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};

const MemoizedFormWrapper = memo(FormWrapper);

const isMetaDataValid = (metaData) => {
  if (Boolean(metaData) && typeof metaData === "object") {
    const { form, fields } = metaData;
    if (
      Array.isArray(fields) &&
      fields.length > 0 &&
      typeof form === "object"
    ) {
      return validateMetaData(metaData);
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
  const { state: navigationState } = location;
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
    APISDK.getMetaData(navigationState)
      .then((result) => {
        metaData.current = result;
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    /*eslint-disable react-hooks/exhaustive-deps*/
    //@ts-ignore
  }, [navigationState?.prodCode, navigationState?.empCode]);
  const result = loading ? (
    <img src={loaderGif} className={classes.loader} alt="loader" />
  ) : !isMetaDataValid(metaData.current as MetaDataType) ? (
    <span>"Error loading form"</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        metaData={metaData.current as MetaDataType}
        initialValues={initialValues}
        setShowDialog={setShowDialog}
        setSubmitProps={setSubmitProps}
        navigationProps={navigationState ?? {}}
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
