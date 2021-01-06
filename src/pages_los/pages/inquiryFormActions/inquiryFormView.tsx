import { useState, useEffect, Fragment } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";
import {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

export const InquiryViewFormWrapper = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formDisplayValues, setFormDisplayValues] = useState({});
  const [metaData, setMetaData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      APISDK.getInquiryFormDataForView(),
      APISDK.getInquiryFormMetaDataForViewOnly(),
    ])
      .then(function (responses) {
        Promise.all(responses).then((data) => {
          if (data[0].status === "success") {
            setLoading(false);
            setFormDisplayValues(data[0].data);
            setMetaData(data[1]);
            setLoading(false);
          } else {
            setLoading(false);
            setError(data[0].status);
          }
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
      <ViewFormWrapper
        metaData={metaData as MetaDataType}
        formDisplayValues={formDisplayValues}
      ></ViewFormWrapper>
    </Fragment>
  );
  return result;
};
