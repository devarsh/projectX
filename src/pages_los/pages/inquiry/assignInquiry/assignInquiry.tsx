import { useContext, useRef, useEffect, Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { SubmitFnType } from "packages/form";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { inquiryAssignMetadata } from "./metadata";
import * as API from "./api";
import { cacheWrapperKeyGen, ClearCacheContext } from "cache";
import {
  AssignInquiryAPIContext,
  AssignInquiryAPIProvider,
  generateAssignInquiryAPIContext,
} from "./context";
import loaderGif from "assets/images/loader.gif";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (assignInquiryFn) => async ({
  data,
}: InsertFormDataFnType) => {
  return assignInquiryFn(data);
};

export const AssignInquiry = ({
  moduleType,
  refID,
  isDataChangedRef,
  closeDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);
  const { getCurrentInquiry, context } = useContext(AssignInquiryAPIContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(getCurrentInquiry.args)
    );
  }

  useEffect(() => {
    removeCache?.addEntry(["getCurrentAssignInquiry", wrapperKey.current]);
  }, [removeCache]);

  const queryData = useQuery<any, any, any>(
    ["getCurrentAssignInquiry", wrapperKey.current],
    getCurrentInquiry.fn(getCurrentInquiry.args),
    { cacheTime: 0 }
  );

  const mutation = useMutation(
    insertFormDataFnWrapper(API.assignInquiry({ moduleType, inquiry: refID })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg);
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("inquiries successfully assigned to branch", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

  inquiryAssignMetadata.form.formState = context;

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    mutation.mutate({
      data,
      displayData,
      endSubmit,
      setFieldError,
    });
  };

  return queryData.isLoading || queryData.isFetching ? (
    <Fragment>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </Fragment>
  ) : queryData.isError ? (
    <Fragment>
      <span>{queryData.error?.error_msg ?? "Unknown error occured"}</span>
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </Fragment>
  ) : (
    <FormWrapper
      key="assignInquiry"
      metaData={inquiryAssignMetadata as MetaDataType}
      initialValues={queryData.data}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
      hideDisplayModeInTitle={true}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Save
            </Button>
            <Button onClick={closeDialog} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};

export const AssignInquiryWrapper = ({
  moduleType,
  refID,
  isDataChangedRef,
  closeDialog,
}) => {
  return (
    <AssignInquiryAPIProvider
      {...generateAssignInquiryAPIContext({ refID, moduleType })}
    >
      <AssignInquiry
        moduleType={moduleType}
        refID={refID}
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
      />
    </AssignInquiryAPIProvider>
  );
};
