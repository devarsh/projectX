import { useState, useEffect, FC } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, {
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";

export const InquiryEditFormWrapper: FC<{
  inquiryID: string;
  inquiryType: "questionnaire" | "inquiry";
}> = ({ inquiryID, inquiryType }) => {
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState({});
  const [formEditableValues, setFormEditableValues] = useState({});
  const [error, setError] = useState("");
  const onSubmitHandlerNew = () => {};
  useEffect(() => {
    setLoading(true);
    Promise.all([
      APISDK.getInquiryFormEditMetaData(inquiryID, inquiryType),
      APISDK.getInquiryFormData(inquiryID, inquiryType),
    ])
      .then(function (responses) {
        Promise.all(responses).then((data) => {
          if (data[0].status === "success" && data[1].status === "success") {
            setLoading(false);
            setMetaData(data[1].data);
            setFormEditableValues(data[0].data);
          } else {
            setLoading(false);
            setError(`${data[0]?.data?.error_msg} ${data[1]?.data?.error_msg}`);
          }
        });
      })
      .catch(function (error) {
        setLoading(false);
        setError(error);
      });
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps*/
  //@ts-ignore
  const result = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : !isMetaDataValid(metaData as MetaDataType) ? (
    <span>"Error loading form"</span>
  ) : (
    <FormWrapper
      key={"dataForm"}
      metaData={metaData as MetaDataType}
      initialValues={formEditableValues}
      onSubmitHandler={onSubmitHandlerNew}
    />
  );
  return result;
};
