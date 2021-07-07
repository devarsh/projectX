import { FC, useEffect } from "react";
import loaderGif from "assets/images/loader.gif";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { useMutation, useQuery } from "react-query";
import { InitialValuesType, SubmitFnType } from "packages/form";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import { queryClient } from "cache";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { moveToInquiryMetaData } from "./metadata";
import * as API from "../coldCallingCRUD/api";
import * as API2 from "./api";

interface MoveToInquiryFnDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const moveToInquiryDataFnWrapper = (moveToInquiryFn) => async ({
  data,
}: MoveToInquiryFnDataType) => {
  return moveToInquiryFn(data);
};

export const MoveToInquiry: FC<{
  moduleType: any;
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView: "edit";
  setEditFormStateFromInitValues?: any;
  readOnly?: boolean;
  disableCache?: boolean;
  tran_cd: any;
}> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView,
  setEditFormStateFromInitValues,
  tran_cd,
}) => {
  const { enqueueSnackbar } = useSnackbar();

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

  const mutation = useMutation(
    moveToInquiryDataFnWrapper(
      API2.moveColdCallingToInquiry({ moduleType, tranCD: tran_cd })
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
        endSubmit(true, "");
        enqueueSnackbar(
          `ColdCallingNo. ${tran_cd} moved to Inquiry with InquiryNo. ${data?.inquiryNo}`,
          {
            variant: "success",
          }
        );
        isDataChangedRef.current = true;
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
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

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
  let metaData: MetaDataType = {} as MetaDataType;

  if (result.isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result.data)
        : undefined;
    metaData = cloneDeep(moveToInquiryMetaData) as MetaDataType;

    metaData.form.formState = {
      formCode: metaData.form.name,
      ...formStateFromInitValues,
    };
    metaData.form.name = `${metaData.form.name}-edit`;
    if (metaData?.form?.render?.renderType === "stepper") {
      metaData.form.render.renderType = "tabs";
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
  ) : defaultView === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${defaultView}`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={defaultView}
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
            Move
          </Button>
        </>
      )}
    </FormWrapper>
  ) : null;
  return renderResult;
};
