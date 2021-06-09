import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { taskAssignMetadata } from "./metadata";
import {
  AssignTaskAPIContext,
  AssignTaskAPIProvider,
  generateAssignTaskAPIContext,
} from "./context";

export const AssignTask = ({ closeDialog }) => {
  return (
    <FormWrapper
      key="assign"
      metaData={taskAssignMetadata as MetaDataType}
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

export const AssignTaskWrapper = ({
  moduleType,
  refID,
  isDataChangedRef,
  closeDialog,
}) => {
  debugger;
  return (
    <AssignTaskAPIProvider
      {...generateAssignTaskAPIContext({ refID, moduleType })}
    >
      <AssignTask closeDialog={() => {}} />
    </AssignTaskAPIProvider>
  );
};
