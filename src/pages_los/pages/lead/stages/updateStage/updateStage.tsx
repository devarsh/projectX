import { useContext, useRef, useEffect, Fragment } from "react";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { cacheWrapperKeyGen, ClearCacheContext } from "cache";
import { stageChangeMetaData } from "./metaData";
import { StagesAPIContext } from "../context";
import loaderGif from "assets/images/loader.gif";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (updatePriorityFn) => async ({
  data,
}: InsertFormDataFnType) => {
  return updatePriorityFn(data);
};

export const UpdatePriority = ({ isDataChangedRef, closeDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);
  const { updateCurrentStage, getCurrentStage, context } = useContext(
    StagesAPIContext
  );
  stageChangeMetaData.form.formState = context;
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(updateCurrentStage.args)
    );
  }
  const queryData = useQuery<any, any, any>(
    ["getCurrentLeadStage", wrapperKey.current],
    getCurrentStage.fn(getCurrentStage.args),
    { cacheTime: 0 }
  );
  useEffect(() => {
    removeCache?.addEntry(["getCurrentLeadStage", wrapperKey.current]);
  }, [removeCache]);

  const mutation = useMutation(
    insertFormDataFnWrapper(updateCurrentStage.fn(updateCurrentStage.args)),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("Lead Stage successfully changed", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

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
      key={`changeStages-${queryData.dataUpdatedAt}`}
      metaData={stageChangeMetaData as MetaDataType}
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
