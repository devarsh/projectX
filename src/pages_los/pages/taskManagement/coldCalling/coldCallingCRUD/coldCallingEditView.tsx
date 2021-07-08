import { FC, useCallback, useEffect, useState } from "react";
import loaderGif from "assets/images/loader.gif";
import { useQuery, useMutation } from "react-query";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { queryClient } from "cache";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import * as API from "./api";
import { coldCallingMetadata } from "../metadata";

interface updateColdCallingDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  tran_cd: string;
}

const updateColdCallingDataWrapperFn = (updateColdCallingData) => async ({
  data,
  tran_cd,
}: updateColdCallingDataType) => {
  return updateColdCallingData(data, tran_cd);
};

export const ColdCallingViewEdit: FC<{
  moduleType: any;
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "view" | "edit";
  setEditFormStateFromInitValues?: any;
  readOnly?: boolean;
  disableCache?: boolean;
  tran_cd: string;
}> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,
  tran_cd,
  setEditFormStateFromInitValues,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultView);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const mutation = useMutation(
    updateColdCallingDataWrapperFn(
      API.updateColdCallingFormData({
        moduleType,
        tran_cd,
      })
    ),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        queryClient.refetchQueries([
          "getColdCallingFormData",
          moduleType,
          tran_cd,
        ]);
        endSubmit(true, "");
        enqueueSnackbar("Cold Calling Update Successfully", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        moveToViewMode();
        if (typeof closeDialog === "function") {
          closeDialog();
        }
      },
    }
  );

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    //@ts-ignore
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getColdCallingFormData",
        moduleType,
        tran_cd,
      ]);
    };
  }, [tran_cd]);

  const result = useQuery(["getColdCallingFormData", moduleType, tran_cd], () =>
    API.getColdCallingFormData({ moduleType })(tran_cd)
  );

  const dataUniqueKey = `${result.dataUpdatedAt}`;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let formEditData = result.data;

  let viewEditMetaData: MetaDataType = {} as MetaDataType;

  if (result.isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result.data)
        : undefined;
    viewEditMetaData = cloneDeep(coldCallingMetadata) as MetaDataType;

    viewEditMetaData.form.formState = {
      formCode: viewEditMetaData.form.name,
      ...formStateFromInitValues,
    };
    viewEditMetaData.form.name = `${viewEditMetaData.form.name}-edit`;
    if (viewEditMetaData?.form?.render?.renderType === "stepper") {
      viewEditMetaData.form.render.renderType = "tabs";
    }
  }

  const renderResult = loading ? (
    <>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : isError === true ? (
    <>
      <span>{errorMsg}</span>
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : formMode === "view" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={viewEditMetaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
      disableGroupErrorDetection={false}
      disableGroupExclude={true}
    >
      {!readOnly ? <Button onClick={moveToEditMode}>Edit</Button> : null}
    </FormWrapper>
  ) : formMode === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={viewEditMetaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
      disableGroupErrorDetection={false}
      disableGroupExclude={true}
    >
      {({ isSubmitting, handleSubmit }) => (
        <>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            Save
          </Button>
        </>
      )}
    </FormWrapper>
  ) : null;
  return renderResult;
};
