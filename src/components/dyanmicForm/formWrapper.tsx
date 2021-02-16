import { FC } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormContext } from "packages/form";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import {
  constructInitialValue,
  constructInitialValuesForArrayFields,
} from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { extendFieldTypes } from "./utils/extendedFieldTypes";
import { MoveSequenceToRender } from "./utils/fixSequenceInMetaData";
import { MetaDataType, FormWrapperProps } from "./types";
import { GroupedForm } from "./groupedForms";
import { SimpleForm } from "./simpleForm";
import { extendedMetaData } from "./extendedTypes";

export const FormWrapper: FC<FormWrapperProps> = ({
  metaData: freshMetaData,
  initialValues,
  onSubmitHandler,
  onCancleHandler,
  hidden = false,
  defaultMode = "view",
  disableGroupExclude,
  disableGroupErrorDetection,
}) => {
  //this line is very important to preserve our metaData across render - deep clone hack
  let metaData = JSON.parse(JSON.stringify(freshMetaData)) as MetaDataType;
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(metaData);
  metaData = MoveSequenceToRender(metaData);
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, initialValues);
  const defaultArrayFieldInitValues = constructInitialValuesForArrayFields(
    metaData.fields
  );
  const yupValidationSchema = constructYupSchema(metaData.fields);
  const formRenderType = metaData.form.render.renderType ?? "simple";
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormContext.Provider
        value={{
          formName: metaData.form.name ?? "NO_NAME",
          resetFieldOnUnmount: Boolean(metaData.form.resetFieldOnUmnount),
          validationRun: metaData.form.validationRun,
          initialValues: initValues,
          defaultArrayFieldValues: defaultArrayFieldInitValues,
          validationSchema: yupValidationSchema,
          formState: {
            refID: metaData.form.refID,
            formCode: metaData.form.name,
            ...metaData.form?.formState,
          },
        }}
      >
        <Container
          component="main"
          style={{ display: hidden ? "none" : "block", paddingTop: "16px" }}
        >
          {formRenderType === "stepper" || formRenderType === "tabs" ? (
            <GroupedForm
              key={`${metaData.form.name}-grouped`}
              fields={groupWiseFields}
              formRenderConfig={metaData.form.render}
              formDisplayName={metaData.form.label}
              formName={metaData.form.name}
              submitFn={onSubmitHandler}
              cancelFn={onCancleHandler}
              defaultMode={defaultMode}
              disableGroupErrorDetection={disableGroupErrorDetection}
              disableGroupExclude={disableGroupExclude}
            />
          ) : formRenderType === "simple" ? (
            <SimpleForm
              key={`${metaData.form.name}-simple`}
              fields={groupWiseFields}
              formRenderConfig={metaData.form.render}
              formDisplayName={metaData.form.label}
              formName={metaData.form.name}
              submitFn={onSubmitHandler}
              cancelFn={onCancleHandler}
              defaultMode={defaultMode}
            />
          ) : (
            <div>RenderType {formRenderType} not available</div>
          )}
        </Container>
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};
