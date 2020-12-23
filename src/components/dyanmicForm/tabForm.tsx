import { FC, useState, useRef, Suspense, cloneElement, Fragment } from "react";
import { useRecoilValue } from "recoil";
import { useForm, SubmitFnType, formFieldsExcludedAtom } from "packages/form";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { TabWiseRenderedFieldsType, FormRenderConfigType } from "./types";
import { useStyles } from "./style";

interface FormProps {
  fields: TabWiseRenderedFieldsType;
  formRenderConfig: FormRenderConfigType;
  formDisplayName: string;
  formName: string;
  submitFn: SubmitFnType;
}

export const TabbedForm: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
  formName,
  submitFn,
}) => {
  const defaultTabName = "defaultTab";
  const excludedFields = useRecoilValue(formFieldsExcludedAtom(formName));
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const { handleSubmit, handleSubmitPartial } = useForm({
    onSubmit: submitFn,
  });
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());
  const fieldGroupsActiveStatus = fieldGroups.current.map((one) => {
    let tabName = defaultTabName;
    if (typeof formRenderConfig.tabs === "object") {
      tabName = formRenderConfig.tabs[one];
    }
    return {
      index: one,
      name: tabName,
      status: isGroupExcluded(formName, fields[one].fieldNames, excludedFields),
    };
  });

  const handleNext = async () => {
    if (!isLastActiveStep(activeTab, fieldGroupsActiveStatus)) {
      const currentStep = fieldGroupsActiveStatus[activeTab];
      const currentFieldsToValidate = fields[currentStep.index].fieldNames;
      let hasError = await handleSubmitPartial(currentFieldsToValidate);
      //In debug mode allow to move to next step without validating
      if (process.env.REACT_APP_DEBUG_MODE === "true") {
        hasError = false;
      }
      if (!hasError) {
        const nextStep = getNextActiveStep(activeTab, fieldGroupsActiveStatus);
        setActiveTab(nextStep);
      }
    }
  };
  const handlePrev = () => {
    if (activeTab > 0) {
      let step = getPrevActiveStep(activeTab, fieldGroupsActiveStatus);
      setActiveTab(step);
    }
  };

  const TabbedSteps = fieldGroups.current.map((one, index) => {
    const current = fields[one];
    current.fields[0] = cloneElement(current.fields[0], {
      isFieldFocused: index === activeTab ? true : false,
    });
    const hideMe = index !== activeTab ? { display: "none" } : {};
    return (
      <Grid
        key={one}
        container={true}
        spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
        direction={formRenderConfig?.gridConfig?.container?.direction ?? "row"}
        style={hideMe}
      >
        {current.fields}
      </Grid>
    );
  });
  const filteredFieldGroups = fieldGroupsActiveStatus.filter(
    (one) => one.status
  );
  return (
    <Fragment>
      <Typography component="h3" className={classes.title}>
        {formDisplayName}
      </Typography>
      <div className={classes.form}>
        <Tabs value={activeTab} aria-label="simple tabs example">
          {fieldGroups.current.map((label) => {
            return <Tab style={{ color: "black" }} label={label} />;
          })}
        </Tabs>
        <Box width={1} display="flex" justifyContent="flex-start">
          <Typography component="h4" className={classes.subTitle}>
            {typeof formRenderConfig.tabs === "object"
              ? formRenderConfig.tabs[fieldGroups.current[activeTab]]
              : defaultTabName}
          </Typography>
        </Box>
        <Suspense fallback={<div>Loading...</div>}>{TabbedSteps}</Suspense>

        <Box width={1} display="flex" justifyContent="flex-end">
          {activeTab === 0 ? null : (
            <Button
              type="button"
              onClick={handlePrev}
              className={classes.backBtn}
            >
              {formRenderConfig?.labels?.prev ?? "Back"}
            </Button>
          )}
          {!isLastActiveStep(activeTab, fieldGroupsActiveStatus) ? (
            <Button
              type="button"
              className={classes.submit}
              onClick={handleNext}
            >
              {formRenderConfig?.labels?.next ?? "Next"}
            </Button>
          ) : (
            <Button
              type="button"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {formRenderConfig?.labels?.complete ?? "Submit"}
            </Button>
          )}
        </Box>
      </div>
    </Fragment>
  );
};

const isGroupExcluded = (
  formName: string,
  currentGroupFields: string[],
  excludedFields: string[]
) => {
  const remaningFields = currentGroupFields.filter((fieldName) => {
    const fullFieldName = `${formName}/${fieldName}`;
    return excludedFields.indexOf(fullFieldName) >= 0 ? false : true;
  });
  if (remaningFields.length > 0) {
    return true;
  }
  return false;
};

const getNextActiveStep = (
  currentStep: number,
  fieldGroupsActiveStatus: {
    name: string;
    status: boolean;
  }[]
) => {
  for (let i = currentStep + 1; i < fieldGroupsActiveStatus.length; i++) {
    if (fieldGroupsActiveStatus[i].status === true) {
      return i;
    }
  }

  return currentStep;
};

const getPrevActiveStep = (
  currentStep: number,
  fieldGroupsActiveStatus: {
    name: string;
    status: boolean;
  }[]
) => {
  for (let i = currentStep - 1; i >= 0; i--) {
    if (fieldGroupsActiveStatus[i].status === true) {
      return i;
    }
  }
  return currentStep;
};

const isLastActiveStep = (
  currentStep: number,
  fieldGroupsActiveStatus: {
    name: string;
    status: boolean;
  }[]
) => {
  let finalStep = currentStep;
  for (let i = currentStep + 1; i < fieldGroupsActiveStatus.length; i++) {
    if (fieldGroupsActiveStatus[i].status === true) {
      finalStep = i;
      break;
    }
  }

  return finalStep === currentStep;
};
