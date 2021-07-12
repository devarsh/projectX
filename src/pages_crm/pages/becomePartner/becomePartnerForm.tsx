import { FC } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { InitialValuesType } from "packages/form";
import { becomePartnerMetaData } from "./metaData";
import * as API from "./api";

interface BecomePartnerFormProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
}

const BecomePartnerForm: FC<BecomePartnerFormProps> = () => {
  const navigate = useNavigate();

  const onSubmitHandler = async (values, _, submitEnd) => {
    const data: any = await API.submitBecomePartnerData(values);
    if (data.status === "success") {
      submitEnd(true);
      navigate("./thankyou");
    } else {
      let errorMsg = data?.data?.error_msg ?? "Unknown Error occured";
      submitEnd(false, errorMsg);
    }
  };
  return (
    <FormWrapper
      key="becomePartner"
      metaData={becomePartnerMetaData as MetaDataType}
      initialValues={""}
      onSubmitHandler={onSubmitHandler}
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
          </>
        );
      }}
    </FormWrapper>
  );
};

export const BecomePartnerFormWrapper = () => {
  return <BecomePartnerForm metaData={becomePartnerMetaData} />;
};
