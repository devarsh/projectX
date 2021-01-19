import {
  useState,
  useEffect,
  useRef,
  memo,
  Fragment,
  useCallback,
} from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
import { APISDK } from "registry/fns/sdk";
import { navigationFlowDecisionMaker } from "../utils/navHelpers";
import loaderGif from "assets/images/loader.gif";
import { useStyleFormWrapper } from "./style";
import FormWrapper, {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { ConfirmationBox } from "./confirmationBox";

const MemoizedFormWrapper = memo(FormWrapper);

export const InquiryFormWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formDisplayValues, setFormDisplayValues] = useState({});
  const [formData, setFormData] = useState({});
  const submitEndRef = useRef<any>(() => {});
  let metaData = useRef<MetaDataType | null>(null);

  const [confirmation, setConfirmation] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");

  const { state: navigationState } = location;
  const classes = useStyleFormWrapper();
  //passed as NOOP attach it if api returns the same
  let initialValues = {};
  let currentSeq = 0;
  const onSubmitHandlerNew = useCallback((values, displayValues, submitEnd) => {
    setFormDisplayValues(displayValues);
    setFormData(values);
    submitEndRef.current = submitEnd;
    setShowDialog(true);
  }, []);

  const rejectSubmission = (submissionError) => {
    setConfirmation(false);
    setConfirmationError("");
    setIsSubmitting(false);
    setShowDialog(false);
    setFormData({});
    setFormDisplayValues({});
    const submitEndFn = submitEndRef.current;
    submitEndFn(false, submissionError);
    submitEndRef.current = () => {};
  };

  const postFormData = async () => {
    if (confirmation === false) {
      setConfirmationError("This is a required field");
      return;
    }
    setIsSubmitting(true);
    const result = await APISDK.sumibtInquiryData(
      metaData?.current?.form.submitAction ?? "NO_ACTION_FOUND",
      {
        ...formData,
        [metaData.current?.form?.confirmationBox?.name ??
        "confirmation_value_not_found"]: confirmation,
      },
      //@ts-ignore
      navigationState?.metaProps ?? {},
      metaData.current?.form?.refID
    );
    if (result.status === "success") {
      submitEndRef.current(true);
      let nextFlow = navigationFlowDecisionMaker(
        metaData.current?.form?.flow,
        ++currentSeq,
        "/thankyou"
      );
      navigate(nextFlow.url, {
        replace: true,
        state: {
          flow: metaData.current?.form?.flow ?? [],
          refID:
            metaData.current?.form?.refID ??
            //@ts-ignore
            navigationState?.metaProps?.refID ??
            "",
          prevSeq: currentSeq,
          metaProps: {
            action: result.data.questionnaireAction,
            refID:
              metaData.current?.form?.refID ??
              //@ts-ignore
              navigationState?.metaProps?.refID ??
              "",
          },
        },
      });
    } else {
      rejectSubmission("Error submitting form");
    }
  };

  //@ts-ignore
  useEffect(() => {
    setLoading(true);
    metaData.current = null;
    //@ts-ignore need to find how to set router loaction state type (react-router-dom)
    APISDK.getInquiryMetaData(navigationState?.metaProps ?? {})
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
  }, Object.values(navigationState ?? []));

  const result = loading ? (
    <img src={loaderGif} className={classes.loader} alt="loader" />
  ) : !isMetaDataValid(metaData.current as MetaDataType) ? (
    <span>"Error loading form"</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        key={"dataForm"}
        metaData={metaData.current as MetaDataType}
        initialValues={initialValues}
        onSubmitHandler={onSubmitHandlerNew}
        hidden={showDialog === true}
      />
      {showDialog ? (
        <ViewFormWrapper
          key={"viewForm"}
          metaData={metaData.current as MetaDataType}
          formDisplayValues={formDisplayValues}
          isSubmitting={isSubmitting}
          onAccept={postFormData}
          onReject={rejectSubmission}
        >
          {({ classes, isSubmitting, formMetaData, onAccept, onReject }) => (
            <Fragment>
              <Box width={1} display="flex" justifyContent="flex-start">
                <ConfirmationBox
                  name={formMetaData?.confirmationBox?.name}
                  label={formMetaData?.confirmationBox?.label}
                  value={confirmation}
                  error={confirmationError}
                  handleChange={(e) => {
                    setConfirmation(e.target.checked);
                  }}
                  isSubmitting={isSubmitting}
                />
              </Box>
              <Box width={1} display="flex" justifyContent="flex-end">
                <Button
                  type="button"
                  className={classes.backBtn}
                  disabled={isSubmitting}
                  onClick={onReject}
                >
                  {formMetaData?.render?.labels?.prev ?? "Go Back"}
                </Button>
                <div className={classes.buttonWrapper}>
                  <Button
                    type="button"
                    className={classes.submit}
                    disabled={isSubmitting}
                    onClick={onAccept}
                  >
                    {formMetaData?.render?.labels?.complete ?? "Accept"}
                  </Button>
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
            </Fragment>
          )}
        </ViewFormWrapper>
      ) : null}
    </Fragment>
  );
  return result;
};
