import { useState, useEffect, Fragment, memo } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, {
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";

const MemoizedFormWrapper = memo(FormWrapper);

export const InquiryEditFormWrapper = () => {
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState({});
  const [formEditableValues, setFormEditableValues] = useState({});

  const onSubmitHandlerNew = () => {};

  useEffect(() => {
    setLoading(true);

    Promise.all([
      APISDK.getInquiryFormDataForEdit(),
      APISDK.getInquiryFormMetaDataForEditOnly(),
    ])
      .then(function (responses) {
        Promise.all(responses).then((data) => {
          console.log("edit view", responses);
          setMetaData(data[1]);
          setFormEditableValues(data[0].data);
          setLoading(false);
        });
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }, []);

  /*eslint-disable react-hooks/exhaustive-deps*/
  //@ts-ignore

  const result = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : !isMetaDataValid(metaData as MetaDataType) ? (
    <span>"Error loading form"</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        key={"dataForm"}
        metaData={metaData as MetaDataType}
        initialValues={formEditableValues}
        onSubmitHandler={onSubmitHandlerNew}
      />
    </Fragment>
  );
  return result;
};
