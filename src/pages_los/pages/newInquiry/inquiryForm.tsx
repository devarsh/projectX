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
import { CRMSDK } from "registry/fns/crm";
import loaderGif from "assets/images/loader.gif";
import { useStyleFormWrapper } from "./style";
import FormWrapper, {
  ViewFormWrapper,
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";

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

  const { state: navigationState } = location;
  const classes = useStyleFormWrapper();
  //passed as NOOP attach it if api returns the same
  let initialValues = {};

  const onSubmitHandlerNew = useCallback((values, displayValues, submitEnd) => {
    setFormDisplayValues(displayValues);
    setFormData(values);
    submitEndRef.current = submitEnd;
    setShowDialog(true);
  }, []);

  const rejectSubmission = (submissionError) => {
    setIsSubmitting(false);
    setShowDialog(false);
    setFormData({});
    setFormDisplayValues({});
    const submitEndFn = submitEndRef.current;
    submitEndFn(false, submissionError);
    submitEndRef.current = () => {};
  };

  const postFormData = async () => {
    setIsSubmitting(true);
    const result = await CRMSDK.submitInquiryQuestionData(
      metaData?.current?.form.submitAction ?? "NO_ACTION_FOUND",
      {
        ...formData,
      },
      //@ts-ignore
      navigationState?.metaProps ?? {},
      metaData.current?.form?.refID
    );
    if (result.status === "success") {
      submitEndRef.current(true);
      //@ts-ignore
      if (navigationState?.metaProps?.action === "crm_inquiry_metaData") {
        navigate("/los/newInquiryQuestion", {
          replace: true,
          state: {
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
        navigate("/los");
      }
    } else {
      rejectSubmission("Error submitting form");
    }
  };

  //@ts-ignore
  useEffect(() => {
    setLoading(true);
    metaData.current = null;
    //@ts-ignore need to find how to set router loaction state type (react-router-dom)
    CRMSDK.getInquiryQuestionMetaData(navigationState?.metaProps ?? {})
      .then((result) => {
        if (Boolean(result?.form?.render?.renderType)) {
          result.form.render.renderType = "tabs";
        }
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
        //@ts-ignore
        key={`dataForm`}
        metaData={metaData.current as MetaDataType}
        initialValues={initialValues}
        onSubmitHandler={onSubmitHandlerNew}
        hidden={showDialog === true}
      />
      {showDialog ? (
        <ViewFormWrapper
          //@ts-ignore
          key={`viewForm`}
          metaData={metaData.current as MetaDataType}
          formDisplayValues={formDisplayValues}
          isSubmitting={isSubmitting}
          onAccept={postFormData}
          onReject={rejectSubmission}
        >
          {({ classes, isSubmitting, formMetaData, onAccept, onReject }) => (
            <Fragment>
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
