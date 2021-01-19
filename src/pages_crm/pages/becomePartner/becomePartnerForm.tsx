import { memo, Fragment, FC } from "react";
import { useNavigate } from "react-router-dom";
import { APISDK } from "registry/fns/sdk";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { InitialValuesType } from "packages/form";
import { becomePartnerMetaData } from "./metaData";

const MemoizedFormWrapper = memo(FormWrapper);

interface BecomePartnerFormProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
}

const BecomePartnerForm: FC<BecomePartnerFormProps> = ({
  metaData,
  initialValues,
}) => {
  const navigate = useNavigate();

  const onSubmitHandler = async (values, _, submitEnd) => {
    const data = await APISDK.submitBecomePartnerData(values);
    if (data.status === "success") {
      submitEnd(true);
      navigate("./thankyou");
    } else {
      //Todo: Need to set server error received in API
      submitEnd(false, "Error submitting form");
    }
  };
  const result = /*!isMetaDataValid(metaData)*/ !true ? (
    <span>Error loading form</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        metaData={metaData}
        initialValues={initialValues}
        onSubmitHandler={onSubmitHandler}
      />
    </Fragment>
  );

  return result;
};

export const BecomePartnerFormWrapper = () => {
  return <BecomePartnerForm metaData={becomePartnerMetaData} />;
};
