import { FC, useState, useEffect, useContext } from "react";
import loaderGif from "assets/images/loader.gif";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import { queryClient, ClearCacheContext } from "cache";
import { SubmitFnType } from "packages/form";
import { useMutation, useQuery } from "react-query";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { cloneDeep } from "lodash-es";
import { mandateMetaData } from "./metadata";
import * as API from "./api";

interface MandateFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const MandateFormDataFnWrapper = (mandateFn) => async ({
  data,
}: MandateFormDataFnType) => {
  return mandateFn(data);
};

export const Mandate: FC<{
  defaultView?: "view" | "edit";
  moduleType: any;
  productType: any;
  refID: any;
  isDataChangedRef: any;
  closeDialog?: any;
  setEditFormStateFromInitValues?: any;
  readOnly?: boolean;
}> = ({
  defaultView = "edit",
  moduleType,
  productType,
  refID,
  isDataChangedRef,
  closeDialog,
  setEditFormStateFromInitValues,
  readOnly = false,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);
  const [formMode, setFormMode] = useState(defaultView);

  const mutation = useMutation(
    MandateFormDataFnWrapper(
      API.updateMandate({
        moduleType,
        productType,
        refID,
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
          "getmandateFormData",
          moduleType,
          productType,
          refID,
        ]);
        endSubmit(true, "");
        enqueueSnackbar("Mandate Save Successfully", {
          variant: "success",
        });
        isDataChangedRef.current = true;
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
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries([
        "getMandateFormData",
        moduleType,
        productType,
        refID,
      ]);
    };
  }, [refID]);

  const result = useQuery(
    ["getMandateFormData", moduleType, productType, refID],
    () => API.getMandateFormData({ moduleType, productType, refID })()
  );

  const dataUniqueKey = `${result.dataUpdatedAt}`;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? ""}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let formEditData: any = result.data;

  let editViewMetaData: MetaDataType = {} as MetaDataType;

  if (result.isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result.data)
        : undefined;
    editViewMetaData = cloneDeep(mandateMetaData) as MetaDataType;
    editViewMetaData.form.formState = {
      formCode: editViewMetaData.form.name,
      ...formStateFromInitValues,
    };
    editViewMetaData.form.name = `${editViewMetaData.form.name}-edit`;
    if (editViewMetaData?.form?.render?.renderType === "stepper") {
      editViewMetaData.form.render.renderType = "tabs";
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
      metaData={editViewMetaData as MetaDataType}
      initialValues={formEditData ?? ""}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
      disableGroupErrorDetection={false}
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
