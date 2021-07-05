import { FC, useCallback, useEffect, useState } from "react";
import loaderGif from "assets/images/loader.gif";
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
import { bankMasterMetadata } from "./metadata";
import { useMutation, useQuery } from "react-query";
import { Alert } from "components/common/alert";

interface updateBankDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  bankCode: string;
}

const updateBankDataWrapperFn = (updateBankData) => async ({
  data,
  bankCode,
}: updateBankDataType) => {
  return updateBankData(data, bankCode);
};

export const ViewEditBank: FC<{
  moduleType: any;
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "view" | "edit";
  readOnly?: boolean;
  bankCode: string;
}> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,
  bankCode,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultView);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const mutation = useMutation(
    updateBankDataWrapperFn(API.updateBank({ moduleType, bankCode })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        queryClient.refetchQueries(["getFormData", moduleType, bankCode]);
        endSubmit(true, "");
        enqueueSnackbar("Bank Update Successfully", {
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
      queryClient.removeQueries(["getFormData", moduleType, bankCode]);
    };
  }, [bankCode]);

  const result = useQuery<any, any>(["getFormData", moduleType, bankCode], () =>
    API.getFormData({ moduleType })(bankCode)
  );

  const dataUniqueKey = `${result.dataUpdatedAt}`;
  const metaData = cloneDeep(bankMasterMetadata) as MetaDataType;
  let editMetaData = metaData;
  let viewMetaData = metaData;
  if (result.isSuccess) {
    editMetaData.form.name = `${editMetaData.form.name}-edit`;
    viewMetaData.form.name = `${viewMetaData.form.name}-view`;
  }

  const renderResult = result.isLoading ? (
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
  ) : result.isError === true ? (
    <>
      <Alert
        severity="error"
        errorMsg={result?.error?.error_msg}
        errorDetail={result?.error?.error_dtl ?? ""}
      />
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
      metaData={viewMetaData as MetaDataType}
      onSubmitHandler={onSubmitHandler}
      initialValues={result?.data}
      //@ts-ignore
      displayMode={formMode}
      disableGroupErrorDetection={false}
      disableGroupExclude={true}
      formStyle={{
        background: "white",
        height: "calc(50vh - 230px)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {!readOnly ? <Button onClick={moveToEditMode}>Edit</Button> : null}
      {typeof closeDialog === "function" ? (
        <Button onClick={closeDialog}>Cancel</Button>
      ) : null}
    </FormWrapper>
  ) : formMode === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={editMetaData as MetaDataType}
      onSubmitHandler={onSubmitHandler}
      initialValues={result?.data}
      //@ts-ignore
      displayMode={formMode}
      disableGroupErrorDetection={false}
      disableGroupExclude={true}
      formStyle={{
        background: "white",
        height: "calc(50vh - 230px)",
        overflowY: "auto",
        overflowX: "hidden",
      }}
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
          <Button onClick={moveToViewMode} disabled={isSubmitting}>
            Cancel
          </Button>
        </>
      )}
    </FormWrapper>
  ) : null;
  return renderResult;
};
