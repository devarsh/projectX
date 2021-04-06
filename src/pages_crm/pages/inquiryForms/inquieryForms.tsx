import { useState, useRef, memo, Fragment, useCallback } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useStyleFormWrapper } from "./style";
import FormWrapper, {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { navigationFlowDecisionMaker } from "../utils/navHelpers";
import { ConfirmationBox } from "./confirmationBox";
import loaderGif from "assets/images/loader.gif";
import * as API from "./api";

const MemoizedFormWrapper = memo(FormWrapper);

export const InquiryFormWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    if (Boolean(metaData.current?.form.confirmationBox)) {
      if (confirmation === false) {
        setConfirmationError("This is a required field");
        return;
      }
    }
    setIsSubmitting(true);
    const result = await API.submitInquiryQuestionData(
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

  const result = useQuery(
    //@ts-ignore
    ["inquiryOrQuestion", "new", navigationState?.metaProps],
    //@ts-ignore
    () => API.getInquiryQuestionMetaData(navigationState?.metaProps ?? {}),
    {
      cacheTime: 0,
    }
  );

  const loading = result.isLoading;
  let isError = result.isError;
  let errorMsg =
    typeof result.error === "string"
      ? result.error
      : "cannot read error,unknown error";
  metaData.current = result.data;
  if (!isError) {
    if (!isMetaDataValid(metaData.current as MetaDataType)) {
      isError = true;
      errorMsg = "Error loading form";
    }
  }

  const renderResult = loading ? (
    <img src={loaderGif} className={classes.loader} alt="loader" />
  ) : isError ? (
    <span>{errorMsg}</span>
  ) : (
    <Fragment>
      <MemoizedFormWrapper
        key={"dataForm"}
        metaData={metaData.current as MetaDataType}
        initialValues={initialValues}
        onSubmitHandler={onSubmitHandlerNew}
        hidden={showDialog === true}
        displayMode={"new"}
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
                {Boolean(formMetaData?.confirmationBox) ? (
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
                ) : null}
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
  return renderResult;
};
