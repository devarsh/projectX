import { useState, useEffect, Fragment } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";
import {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";

export const QuestionnaireViewFormWrapper = () => {
  const [loading, setLoading] = useState(false);
  const [formDisplayValues, setFormDisplayValues] = useState({});
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    setLoading(true);
    Promise.all([
      APISDK.getQuestionnairesFormDataForView(),
      APISDK.getQuestionnaireFormMetaDataForViewOnly(),
    ])
      .then(function (responses) {
        Promise.all(responses).then((data) => {
          console.log("questions", responses);
          setMetaData(data[1]);
          setFormDisplayValues(data[0].data);
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
        key={"viewForm"}
        metaData={metaData as MetaDataType}
        formDisplayValues={formDisplayValues}
      ></ViewFormWrapper>
    </Fragment>
  );
  return result;
};
