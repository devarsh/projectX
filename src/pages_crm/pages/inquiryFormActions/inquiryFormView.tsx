import { useState, useEffect, Fragment } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";
import {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";

export const InquiryViewFormWrapper = () => {
  const [loading, setLoading] = useState(false);
  const [formDisplayValues, setFormDisplayValues] = useState({});
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    setLoading(true);
    Promise.all([
      APISDK.getInquiryFormDataForView(),
      APISDK.getInquiryFormMetaDataForViewOnly(),
    ])
      .then(function (responses) {
        Promise.all(responses).then((data) => {
          console.log("view", data);
          setFormDisplayValues(data[0].data);
          setMetaData(data[1]);
          setLoading(false);
        });
      })
      .then(function (data) {
        setLoading(false);
        // console.log("fmrdata", data);
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
      <ViewFormWrapper
        metaData={metaData as MetaDataType}
        formDisplayValues={formDisplayValues}
      ></ViewFormWrapper>
    </Fragment>
  );
  return result;
};
