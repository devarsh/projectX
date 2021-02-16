import { FC, useContext, useEffect } from "react";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { SubmitFnType, InitialValuesType } from "packages/form";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "cache";
import { ClearCacheContext } from "cache";

interface updateFormDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  changeFormMode?: any;
  enableForm?: any;
  disableForm?: any;
  moduleType: string;
  productType: string;
  refID: string;
  serialNo?: string;
}

const updateFormData = async ({
  data,
  moduleType,
  productType,
  refID,
  serialNo,
}: updateFormDataType) => {
  return LOSSDK.updateFormData(moduleType, productType, refID, data, serialNo);
};

export const FormViewEdit: FC<{
  refID: string;
  moduleType: string;
  productType: string;
  isProductEditedRef: any;
  metaData: MetaDataType;
  serialNo?: string;
  closeDialog?: any;
  defaultView?: "view" | "edit";
  formState?: any;
}> = ({
  refID,
  moduleType,
  productType,
  serialNo,
  isProductEditedRef,
  metaData,
  closeDialog,
  defaultView,
}) => {
  const removeCache = useContext(ClearCacheContext);
  const mutation = useMutation(updateFormData, {
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg);
    },
    onSuccess: (data, { changeFormMode, disableForm }) => {
      queryClient.refetchQueries([
        "getFormData",
        moduleType,
        productType,
        refID,
      ]);
      changeFormMode("view");
      disableForm();
      isProductEditedRef.current = true;
      closeDialog();
    },
  });

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
      refID,
      moduleType,
      productType,
      serialNo,
    });
  };

  useEffect(() => {
    removeCache?.addEntry(["getFormData", moduleType, productType, refID]);
  }, []);

  const result = useQuery(
    ["getFormData", moduleType, productType, refID, serialNo],
    () => LOSSDK.getFormData(moduleType, productType, refID, serialNo),
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
    moduleType: moduleType,
    productType: productType,
    refID: refID,
    serialNo: serialNo,
  };

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={`${moduleType}-${productType}-${refID}-${result.dataUpdatedAt}`}
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
