import { useEffect, FC, useState } from "react";
import loaderGif from "assets/images/loader.gif";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { useMutation, useQueries } from "react-query";
import { useSnackbar } from "notistack";
import { SubmitFnType, InitialValuesType } from "packages/form";
import { cloneDeep } from "lodash-es";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { moveToInquiryMetaData } from "./metadata";
import { queryClient } from "cache";
import * as API from "../coldCallingCRUD/api";
import * as API2 from "./api";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  tran_cd: any;
}

const insertFormDataFnWrapper = (moveToLeadFn) => async ({
  data,
}: InsertFormDataFnType) => {
  return moveToLeadFn(data);
};

export const MoveToInquiry: FC<{
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
  tran_cd,
  setEditFormStateFromInitValues,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState("edit");

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getColdCallingFormData",
        moduleType,
        tran_cd,
      ]);
      queryClient.removeQueries([
        "getColdCallingFormMetaData",
        "view",
        tran_cd,
      ]);
      queryClient.removeQueries([
        "getColdCallingFormMetaData",
        "edit",
        tran_cd,
      ]);
    };
  }, [tran_cd]);

  // const mutation = useMutation(
  //   insertFormDataFnWrapper(API2.moveToInquiry({ refID, moduleType })),
  //   {
  //     onError: (error: any, { endSubmit }) => {
  //       let errorMsg = "Unknown Error occured";
  //       if (typeof error === "object") {
  //         errorMsg = error?.error_msg ?? errorMsg;
  //       }
  //       endSubmit(false, errorMsg, error?.error_detail ?? "");
  //     },
  //     onSuccess: (data, { endSubmit }) => {
  //       endSubmit(true, "");
  //       isDataChangedRef.current = true;
  //       enqueueSnackbar(
  //         `InquiryNo. ${data?.inquiryNo} moved to Lead with LeadNo. ${data?.leadNo}`,
  //         {
  //           variant: "success",
  //         }
  //       );
  //       closeDialog();
  //     },
  //   }
  // );

  const result = useQueries([
    {
      queryKey: ["getColdCallingFormData", moduleType, tran_cd],
      queryFn: () => API.getColdCallingFormData({ moduleType })(tran_cd),
    },
    {
      queryKey: ["getColdCallingFormMetaData", "edit", tran_cd],
      queryFn: () => API2.getMetadata(),
    },
  ]);

  const dataUniqueKey = `${result[0].dataUpdatedAt}`;
  const loading =
    result[0].isLoading ||
    result[1].isLoading ||
    result[0].isFetching ||
    result[1].isFetching;
  let isError = result[0].isError || result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg} ${
    //@ts-ignore
    result[1].error?.error_msg
  }`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let formEditData = result[0].data;

  let editMetaData: MetaDataType = {} as MetaDataType;

  if (result[1].isSuccess && result[0].isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result[0].data)
        : undefined;
    editMetaData = cloneDeep(result[1].data) as MetaDataType;

    editMetaData.form.formState = {
      formCode: editMetaData.form.name,
      ...formStateFromInitValues,
    };
    editMetaData.form.name = `${editMetaData.form.name}-edit`;
    if (editMetaData?.form?.render?.renderType === "stepper") {
      editMetaData.form.render.renderType = "tabs";
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
  ) : formMode === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={editMetaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={() => {}}
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
          <Button onClick={closeDialog} disabled={isSubmitting}>
            Cancel
          </Button>
        </>
      )}
    </FormWrapper>
  ) : null;
  return renderResult;
};
