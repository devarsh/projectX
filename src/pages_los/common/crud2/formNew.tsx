import { FC, useContext, useRef, useEffect } from "react";
import loaderGif from "assets/images/loader.gif";
import { useMutation, useQuery } from "react-query";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { CRUDContext } from "./context";
import { cacheWrapperKeyGen, ClearCacheContext } from "cache";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper = (insertFormData) => async ({
  data,
}: InsertFormDataFnType) => {
  return insertFormData(data);
};

export const FormNew: FC<{
  isProductEditedRef: any;
  successAction: any;
  cancelAction: any;
}> = ({ isProductEditedRef, successAction, cancelAction }) => {
  const { insertFormData, getFormMetaData } = useContext(CRUDContext);
  const removeCache = useContext(ClearCacheContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(Object.values(insertFormData.args));
  }

  const mutation = useMutation(
    insertFormDataFnWrapper(insertFormData.fn(insertFormData.args)),
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
        isProductEditedRef.current = true;
        if (typeof successAction === "function") {
          successAction();
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
    mutation.mutate({
      data,
      displayData,
      endSubmit,
      setFieldError,
    });
  };

  useEffect(() => {
    removeCache?.addEntry(["getFormMetaData", wrapperKey.current, "new"]);
  }, []);

  const result = useQuery(
    ["getFormMetaData", wrapperKey.current, "new"],
    () => getFormMetaData.fn(getFormMetaData.args)("new"),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const dataUniqueKey = result.dataUpdatedAt;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? "unknown error occured"}`;

  let metaData = JSON.parse(JSON.stringify(result.data ?? {})) as MetaDataType;
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
      key={`${wrapperKey.current}-${dataUniqueKey}-new`}
      metaData={metaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
      defaultMode={"new"}
      onCancleHandler={
        typeof cancelAction === "function" ? () => cancelAction(true) : null
      }
      disableGroupErrorDetection={true}
      disableGroupExclude={true}
    />
  );
  return renderResult;
};
