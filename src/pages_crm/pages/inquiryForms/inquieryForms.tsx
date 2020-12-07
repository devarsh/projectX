import { useState, useEffect, useRef, memo, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APISDK } from "registry/fns/sdk";
import OTPVerificationDialog from "../otpVerificationDialog";
import { displayOTPPage } from "../utils/navHelpers";
import loaderGif from "assets/images/loader.gif";
import { useStyleFormWrapper } from "./style";
import FormWrapper, {
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";

const MemoizedFormWrapper = memo(FormWrapper);

export const InquiryFormWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let metaData = useRef<MetaDataType | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [submitProps, setSubmitProps] = useState({});
  const { state: navigationState } = location;
  const classes = useStyleFormWrapper();
  //passed as NOOP attach it if api returns the same
  let initialValues = {};

  const onSubmitHandler = async (values, submitEnd) => {
    if (displayOTPPage(navigationState)) {
      setSubmitProps(() => ({
        values: values,
        submitEnd: submitEnd,
        submitAction: metaData.current?.form.submitAction ?? "",
        navigationProps: navigationState,
      }));
      setShowDialog(true);
    } else {
      const data = await APISDK.pushFormData(
        metaData.current?.form.submitAction ?? "",
        values,
        navigationState
      );
      if (data.status === "success") {
        submitEnd(true);
        navigate("/thankyou");
      } else {
        //Todo: Need to set server error received in API
        submitEnd(false, "Error submitting form");
      }
    }
  };

  //@ts-ignore
  useEffect(() => {
    setLoading(true);
    metaData.current = null;
    //@ts-ignore need to find how to set router loaction state type (react-router-dom)
    APISDK.getMetaData(navigationState)
      .then((result) => {
        metaData.current = result;
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    /*eslint-disable react-hooks/exhaustive-deps*/
    //@ts-ignore
  }, [navigationState?.prodCode, navigationState?.empCode]);

  const result = loading ? (
    <img src={loaderGif} className={classes.loader} alt="loader" />
  ) : !isMetaDataValid(metaData.current as MetaDataType) ? (
    <span>"Error loading form"</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        metaData={metaData.current as MetaDataType}
        initialValues={initialValues}
        onSubmitHandler={onSubmitHandler}
      />
      {showDialog ? (
        <OTPVerificationDialog
          isOpen={showDialog}
          setShowDialog={setShowDialog}
          submitProps={submitProps}
        />
      ) : null}
    </Fragment>
  );
  return result;
};
