import { useState, useEffect, useRef, memo, Fragment } from "react";
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

const MemoizedFormWrapper = memo(FormWrapper);

export const InquiryFormWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({});
  let metaData = useRef<MetaDataType | null>(null);
  const { state: navigationState } = location;
  const classes = useStyleFormWrapper();
  //passed as NOOP attach it if api returns the same
  let initialValues = {};
  let currentSeq = 0;
  const onSubmitHandlerNew = (values, submitEnd) => {
    setFormData(values);
    setShowDialog(true);
  };
  const onSubmitHandler = async (values, submitEnd) => {
    const result = await APISDK.pushFormData(
      metaData.current?.form.submitAction ?? "NO_ACTION_FOUND",
      values,
      //@ts-ignore
      navigationState?.metaProps ?? {},
      metaData.current?.form?.refID
    );
    if (result.status === "success") {
      submitEnd(true);
      let nextFlow = navigationFlowDecisionMaker(
        metaData.current?.form?.flow,
        ++currentSeq,
        "/thankyou"
      );
      navigate(nextFlow.url, {
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
      submitEnd(false, "Error submitting form");
    }
  };

  //@ts-ignore
  useEffect(() => {
    setLoading(true);
    metaData.current = null;
    //@ts-ignore need to find how to set router loaction state type (react-router-dom)
    APISDK.getMetaData(navigationState?.metaProps ?? {})
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
        metaData={metaData.current as MetaDataType}
        initialValues={initialValues}
        onSubmitHandler={onSubmitHandlerNew}
        hidden={showDialog === true}
      />
      {showDialog ? (
        <ViewFormWrapper
          metaData={metaData.current as MetaDataType}
          formData={formData}
        />
      ) : null}
    </Fragment>
  );
  return result;
};
