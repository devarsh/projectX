import { FC, useContext, useEffect, useRef } from "react";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { SubmitFnType, InitialValuesType } from "packages/form";
import { useMutation, useQueries } from "react-query";
import { queryClient } from "cache";
import { ClearCacheContext } from "cache";
import { CRUDContext } from "./context";
import { cacheWrapperKeyGen } from "./utils";

interface updateFormDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  changeFormMode?: any;
  enableForm?: any;
  disableForm?: any;
  serialNo?: string;
}

const updateFormDataWrapperFn = (updateFormData) => async ({
  data,
  serialNo,
}: updateFormDataType) => {
  return updateFormData(data, serialNo);
};

export const FormViewEdit: FC<{
  isProductEditedRef: any;
  serialNo?: string;
  closeDialog?: any;
  defaultView?: "view" | "edit";
}> = ({ serialNo, isProductEditedRef, closeDialog, defaultView = "view" }) => {
  const removeCache = useContext(ClearCacheContext);
  const { updateFormData, getFormData, getFormMetaData } = useContext(
    CRUDContext
  );
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(Object.values(getFormData.args));
  }
  const mutation = useMutation(
    updateFormDataWrapperFn(updateFormData.fn(updateFormData.args)),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg);
      },
      onSuccess: (data, { changeFormMode, disableForm, serialNo }) => {
        queryClient.refetchQueries([
          "getFormData",
          wrapperKey.current,
          serialNo,
        ]);
        changeFormMode("view");
        disableForm();
        isProductEditedRef.current = true;
        closeDialog();
      },
    }
  );

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError,
    changeFormMode,
    enableForm,
    disableForm
  ) => {
    mutation.mutate({
      data,
      displayData,
      endSubmit,
      setFieldError,
      changeFormMode,
      enableForm,
      disableForm,
      serialNo,
    });
  };

  useEffect(() => {
    removeCache?.addEntry(["getFormData", wrapperKey.current, serialNo ?? ""]);
    removeCache?.addEntry(["getFormMetaData", wrapperKey.current, "view"]);
    removeCache?.addEntry(["getFormMetaData", wrapperKey.current, "edit"]);
  }, []);

  const result = useQueries([
    {
      queryKey: ["getFormData", wrapperKey.current, serialNo ?? ""],
      queryFn: () => getFormData.fn(getFormData.args)(serialNo),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["getFormMetaData", wrapperKey.current, "view"],
      queryFn: () => getFormMetaData.fn(getFormMetaData.args)("view"),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["getFormMetaData", wrapperKey.current, "edit"],
      queryFn: () => getFormMetaData.fn(getFormMetaData.args)("edit"),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  ]);

  const dataUniqueKey = `${result[0].dataUpdatedAt}`;
  const loading =
    result[0].isLoading ||
    result[1].isLoading ||
    result[2].isLoading ||
    result[0].isFetching ||
    result[1].isFetching ||
    result[2].isFetching;
  let isError = result[0].isError || result[1].isError || result[2].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg ?? "Unknown error occured"} ${
    //@ts-ignore
    result[1].error?.error_msg ?? "Unknown error occured"
  }${
    //@ts-ignore
    result[2].error?.error_msg ?? "Unknown error occured"
  }`;

  let metaData: any = {};
  if (defaultView === "edit") {
    metaData = JSON.parse(JSON.stringify(result[2].data ?? {})) as MetaDataType;
  } else {
    metaData = JSON.parse(JSON.stringify(result[1].data ?? {})) as MetaDataType;
  }
  let formEditData = result[0].data;
  if (loading === false && isError === false) {
    // isError = !isMetaDataValid(metaData);
    if (isError === false) {
    } else {
      errorMsg = "Error loading form";
    }
  }

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={`${wrapperKey.current}-${dataUniqueKey}-${defaultView}`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      defaultMode={defaultView}
      onCancleHandler={closeDialog}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
    />
  );
  return renderResult;
};
