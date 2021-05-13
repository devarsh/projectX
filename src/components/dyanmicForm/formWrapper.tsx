import { forwardRef, Suspense, useImperativeHandle } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Alert } from "components/common/alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormContext, useForm } from "packages/form";
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
import { useStyles } from "./style";

export const FormWrapper = forwardRef<FormWrapperProps, any>(
  (
    {
      metaData: freshMetaData,
      initialValues,
      onSubmitHandler,
      hidden = false,
      disableGroupExclude,
      disableGroupErrorDetection,
      displayMode,
      hideTitleBar = false,
      hideDisplayModeInTitle = false,
      formHeight = "65vh",
      children,
    },
    ref
  ) => {
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
    const formName = metaData.form.name ?? "NO_NAME";
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormContext.Provider
          value={{
            formName: formName,
            resetFieldOnUnmount: Boolean(metaData.form.resetFieldOnUmnount),
            validationRun: metaData.form.validationRun,
            initialValues: initValues,
            defaultArrayFieldValues: defaultArrayFieldInitValues,
            validationSchema: yupValidationSchema,
            formState: {
              formCode: metaData.form.name,
              refID: metaData.form.refID,
              ...metaData.form?.formState,
            },
          }}
        >
          <ChildFormWrapper
            //@ts-ignore
            ref={ref}
            formName={formName}
            formDisplayLabel={metaData?.form?.label ?? "NO_LABEL"}
            formRenderType={metaData.form.render.renderType ?? "simple"}
            formRenderConfig={metaData.form.render}
            submitFn={onSubmitHandler}
            hidden={hidden}
            displayMode={displayMode}
            groupWiseFields={groupWiseFields}
            disableGroupExclude={disableGroupExclude}
            disableGroupErrorDetection={disableGroupErrorDetection}
            hideTitleBar={hideTitleBar}
            hideDisplayModeInTitle={hideDisplayModeInTitle}
            wrapperChild={children}
            formHeight={formHeight}
          />
        </FormContext.Provider>
      </MuiPickersUtilsProvider>
    );
  }
);

const ChildFormWrapper = forwardRef<any, any>(
  (
    {
      formName,
      formDisplayLabel,
      formRenderType,
      formRenderConfig,
      submitFn,
      hidden,
      displayMode,
      groupWiseFields,
      disableGroupExclude,
      disableGroupErrorDetection,
      hideTitleBar,
      hideDisplayModeInTitle,
      wrapperChild,
      formHeight,
    },
    ref
  ) => {
    const {
      handleSubmit,
      handleSubmitPartial,
      serverSentError,
      serverSentErrorDetail,
      isSubmitting,
    } = useForm({
      onSubmit: submitFn,
      readOnly: displayMode === "view" ? true : false,
    });
    const classes = useStyles();
    //this is useful in cases where we want to merge this form with other forms, but we should handle form submission
    //and only get form values
    useImperativeHandle(ref, () => ({
      handleSubmit: handleSubmit,
      formDisplayLabel: formDisplayLabel,
    }));
    return (
      <Container
        component="main"
        style={{ display: hidden ? "none" : "block", paddingTop: "16px" }}
      >
        {formRenderType === "stepper" ? (
          <Typography component="h3" className={classes.title}>
            {formDisplayLabel}
          </Typography>
        ) : !Boolean(hideTitleBar) ? (
          <AppBar position="relative" color="secondary">
            <Toolbar>
              <Typography component="div" variant="h6">
                {formDisplayLabel}
                {Boolean(displayMode) && !Boolean(hideDisplayModeInTitle) ? (
                  <Chip
                    style={{ color: "white", marginLeft: "8px" }}
                    variant="outlined"
                    color="primary"
                    size="small"
                    label={`${displayMode} mode`}
                  />
                ) : (
                  ""
                )}
              </Typography>
              <div className={classes.formControlLabelSpacer} />
              {typeof wrapperChild === "function"
                ? wrapperChild({ isSubmitting, handleSubmit })
                : wrapperChild}
            </Toolbar>
            {!isSubmitting && Boolean(serverSentError) ? (
              <Alert
                severity="error"
                errorMsg={serverSentError}
                errorDetail={serverSentErrorDetail}
              />
            ) : null}
          </AppBar>
        ) : null}
        {formRenderType === "stepper" ? (
          <GroupedForm
            key={`${formName}-grouped-stepper`}
            fields={groupWiseFields}
            formRenderConfig={formRenderConfig}
            formName={formName}
            disableGroupErrorDetection={disableGroupErrorDetection}
            disableGroupExclude={disableGroupExclude}
            //stepper - will handleSubmit there
            handleSubmit={handleSubmit}
            handleSubmitPartial={handleSubmitPartial}
          />
        ) : formRenderType === "tabs" ? (
          <Container
            maxWidth="lg"
            style={{
              background: "white",
              height: "calc(100vh - 230px)",
              overflowY: "auto",
              overflowX: "hidden",
            }}
            key={`${formName}-grouped-tabs`}
          >
            <GroupedForm
              key={`${formName}-grouped-tabs`}
              fields={groupWiseFields}
              formRenderConfig={formRenderConfig}
              formName={formName}
              disableGroupErrorDetection={disableGroupErrorDetection}
              disableGroupExclude={disableGroupExclude}
              //stepper - will handleSubmit there
              handleSubmit={handleSubmit}
              handleSubmitPartial={handleSubmitPartial}
            >
              {({ steps }) => (
                <div
                // style={{
                //   //@ts-ignore
                //   height: "60vh",
                //   overflowY: "auto",
                //   overflowX: "hidden",
                // }}
                >
                  <br />
                  <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>
                </div>
              )}
            </GroupedForm>
          </Container>
        ) : formRenderType === "simple" ? (
          <Container
            maxWidth="lg"
            style={{
              background: "white",
              height: "calc(100vh - 230px)",
              overflowY: "auto",
              overflowX: "hidden",
            }}
            key={`${formName}-simple`}
          >
            <br />
            <br />
            <SimpleForm
              key={`${formName}-simple`}
              fields={groupWiseFields}
              formRenderConfig={formRenderConfig}
              formName={formName}
            >
              {({ spacing, direction, fieldsToRender }) => (
                <div
                // style={{
                //   //@ts-ignore
                //   height: "60vh",
                //   overflowY: "auto",
                //   overflowX: "hidden",
                // }}
                >
                  <Grid
                    container={true}
                    spacing={spacing}
                    direction={direction}
                  >
                    <Suspense fallback={<div>Loading...</div>}>
                      {fieldsToRender}
                    </Suspense>
                  </Grid>
                </div>
              )}
            </SimpleForm>
          </Container>
        ) : (
          <div>RenderType {formRenderType} not available</div>
        )}
      </Container>
    );
  }
);
