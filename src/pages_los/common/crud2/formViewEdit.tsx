import { FC, useContext, useEffect, useRef } from "react";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { SubmitFnType, InitialValuesType } from "packages/form";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "cache";
import { ClearCacheContext } from "cache";
import { CRUDContext } from "./context";
import { cacheWrapperKeyGen } from "cache";

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
  metaData: MetaDataType;
  serialNo?: string;
  closeDialog?: any;
  defaultView?: "view" | "edit";
}> = ({ serialNo, isProductEditedRef, metaData, closeDialog, defaultView }) => {
  const removeCache = useContext(ClearCacheContext);
  const { updateFormData, getFormData } = useContext(CRUDContext);
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
  }, []);

  const result = useQuery(
    ["getFormData", wrapperKey.current, serialNo ?? ""],
    () => getFormData.fn(getFormData.args)(serialNo),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? ""}`;
  let formEditData = result.data;
  metaData.form.formState = {
    ...getFormData.args,
    serialNo: serialNo,
  };

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={`${wrapperKey.current}-${result.dataUpdatedAt}`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      defaultMode={defaultView ?? "view"}
      onCancleHandler={closeDialog}
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
    />
  );
  return renderResult;
};
