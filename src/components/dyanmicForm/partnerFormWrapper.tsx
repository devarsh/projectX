import { FC } from "react";
import { FormContext } from "packages/form";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import { constructInitialValue } from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { MetaDataType } from "./types";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Container from "@material-ui/core/Container";
import { InitialValuesType } from "packages/form";
import { useNavigate } from "react-router-dom";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { singletonFunctionRegisrationFactory } from "./utils/functionRegistry";
import { MoveSequenceToRender } from "./utils/fixSequenceInMetaData";
import { extendFieldTypes } from "./utils/extendedFieldTypes";
import { extendedMetaData } from "./extendedTypes";
import { APISDK } from "registry/fns/sdk";

import { SimpleForm } from "./simpleForm";

interface FormWrapperProps {
  metaData: MetaDataType;
  inititalValues?: InitialValuesType;
}

export const PartnerFormWrapper: FC<FormWrapperProps> = ({
  metaData,
  inititalValues,
}) => {
  const navigate = useNavigate();
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory
  );
  metaData = MoveSequenceToRender(metaData);

  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, inititalValues);
  const yupValidationSchema = constructYupSchema(metaData.fields);

  const submitAction = "become_partner";
  const onPartnerSubmitHandler = (submitAction) => async (
    values,
    submitEnd
  ) => {
    debugger;
    const data = await APISDK.pushBecomePartnerData(submitAction, values);
    if (data.status === "success") {
      submitEnd(true);
      alert(data?.data?.msg);
      navigate("/thankyou");
    } else {
      alert(data?.data?.msg);
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
          <SimpleForm
            fields={groupWiseFields}
            formRenderConfig={metaData.form.render}
            formDisplayName={metaData.form.label}
            formName={metaData.form.name}
            submitFn={onPartnerSubmitHandler(submitAction)}
          />
        </Container>
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};
