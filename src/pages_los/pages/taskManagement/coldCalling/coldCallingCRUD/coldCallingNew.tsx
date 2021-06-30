import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { coldCallingMetadata } from "../metadata/form";

export const AddColdCalling = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
}) => {
  return (
    <FormWrapper
      key="worklog"
      metaData={coldCallingMetadata as MetaDataType}
      initialValues={""}
      onSubmitHandler={() => {}}
      displayMode={"new"}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
      hideDisplayModeInTitle={true}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Save
            </Button>
            <Button onClick={closeDialog} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};

export const WorklogWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
}) => {
  return (
    <AddColdCalling
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
    />
  );
};
