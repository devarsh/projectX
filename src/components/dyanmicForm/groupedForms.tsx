import { FC, useState, useRef, cloneElement } from "react";
import { useRecoilValue } from "recoil";
import {
  useForm,
  SubmitFnType,
  formFieldsExcludedAtom,
  formFieldsErrorWatcherAtom,
} from "packages/form";
import Grid from "@material-ui/core/Grid";
import { GroupWiseRenderedFieldsType, FormRenderConfigType } from "./types";
import { useStyles } from "./style";
import { MyStepper } from "./stepperForm";
import { MyTabs } from "./tabsForm";

interface FormProps {
  fields: GroupWiseRenderedFieldsType;
  formRenderConfig: FormRenderConfigType;
  formDisplayName: string;
  formName: string;
  submitFn: SubmitFnType;
  cancelFn: any;
}

export const GroupedForm: FC<FormProps> = ({
  fields,
  formRenderConfig,
  formDisplayName,
  formName,
  submitFn,
  cancelFn,
}) => {
  const defaultGroupName = "DefaultGroup";
  const excludedFields = useRecoilValue(formFieldsExcludedAtom(formName));
  //Need to remove this code it defeats the purpose of the library maybe move it to an invididual component that
  //wont have the whole form rerender
  const errorWatcherFields = useRecoilValue(
    formFieldsErrorWatcherAtom(formName)
  );
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { handleSubmit, handleSubmitPartial } = useForm({
    onSubmit: submitFn,
  });
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());
  const fieldGroupsActiveStatus = fieldGroups.current.map((one) => {
    let groupName = defaultGroupName;
    if (typeof formRenderConfig.groups === "object") {
      groupName = formRenderConfig.groups[one];
    }
    return {
      index: one,
      name: groupName,
      status: isGroupExcluded(formName, fields[one].fieldNames, excludedFields),
      hasError: isGroupHavingError(
        formName,
        fields[one].fieldNames,
        errorWatcherFields
      ),
    };
  });

  const handleNext = async () => {
    if (!isLastActiveStep(activeStep, fieldGroupsActiveStatus)) {
      const currentStep = fieldGroupsActiveStatus[activeStep];
      const currentFieldsToValidate = fields[currentStep.index].fieldNames;
      let hasError = await handleSubmitPartial(currentFieldsToValidate);
      //In debug mode allow to move to next step without validating
      if (process.env.REACT_APP_DEBUG_MODE === "true") {
        hasError = false;
      }
      if (!hasError) {
        const nextStep = getNextActiveStep(activeStep, fieldGroupsActiveStatus);
        setActiveStep(nextStep);
      }
    }
  };
  const handlePrev = () => {
    if (activeStep > 0) {
      let step = getPrevActiveStep(activeStep, fieldGroupsActiveStatus);
      setActiveStep(step);
    }
  };

  const steps = fieldGroups.current.map((one, index) => {
    const current = fields[one];
    current.fields[0] = cloneElement(current.fields[0], {
      isFieldFocused: index === activeStep ? true : false,
    });
    const hideMe = index !== Number(activeStep) ? { display: "none" } : {};
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
  const CURRENT_COMPONENT =
    formRenderConfig.renderType === "stepper" ? MyStepper : MyTabs;

  return (
    <CURRENT_COMPONENT
      key={formRenderConfig.renderType}
      classes={classes}
      formDisplayName={formDisplayName}
      activeStep={activeStep}
      filteredFieldGroups={filteredFieldGroups}
      formRenderConfig={formRenderConfig}
      defaultGroupName={defaultGroupName}
      fieldGroups={fieldGroups}
      fieldGroupsActiveStatus={fieldGroupsActiveStatus}
      steps={steps}
      handlePrev={handlePrev}
      handleNext={handleNext}
      handleSubmit={handleSubmit}
      handleCancel={cancelFn}
      isLastActiveStep={isLastActiveStep}
      setActiveStep={setActiveStep}
    />
  );
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

const isGroupHavingError = (
  formName: string,
  currentGroupFields: string[],
  errorFields: string[]
) => {
  const remaningFields = currentGroupFields.filter((fieldName) => {
    const fullFieldName = `${formName}/${fieldName}`;
    let result = errorFields.indexOf(fullFieldName) >= 0 ? true : false;
    if (result === false) {
      result = Boolean(
        errorFields.find((one) => one.indexOf(fullFieldName) > -1)
      )
        ? true
        : false;
    }
    return result;
  });
  if (remaningFields.length > 0) {
    return true;
  }
  return false;
};
