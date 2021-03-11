import Button from "@material-ui/core/Button";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import CircularProgress from "@material-ui/core/CircularProgress";

export const APIForm = ({ metaData, formState, handleSubmitFn }) => {
  if (metaData?.form) {
    metaData.form.formState = formState;
  }
  return (
    <FormWrapper
      metaData={metaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={handleSubmitFn}
      displayMode={"new"}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Proceed
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};
