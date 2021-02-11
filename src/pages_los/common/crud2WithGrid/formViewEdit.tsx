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
  productType: string;
  refID: string;
  serialNo?: string;
}

const updateFormData = async ({
  data,
  productType,
  refID,
  serialNo,
}: updateFormDataType) => {
  return LOSSDK.updateLeadData(productType, refID, data, serialNo);
};

export const FormViewEdit: FC<{
  refID: string;
  productType: string;
  isProductEditedRef: any;
  metaData: MetaDataType;
  serialNo?: string;
  closeDialog?: any;
}> = ({
  refID,
  productType,
  serialNo,
  isProductEditedRef,
  metaData,
  closeDialog,
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
    onSuccess: (data, { endSubmit }) => {
      queryClient.refetchQueries(["getLeadDataForEdit", productType, refID]);
      endSubmit(true, "");
      isProductEditedRef.current = true;
      closeDialog();
    },
  });

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
      refID,
      productType,
      serialNo,
    });
  };

  useEffect(() => {
    removeCache?.addEntry(["getLeadDataForEdit", productType, refID]);
  }, []);

  const result = useQuery(
    ["getLeadDataForEdit", productType, refID, serialNo],
    () => LOSSDK.getLeadDataForEdit(productType, refID, serialNo),
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

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={`${productType}-${refID}-ViewEditMode`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
    />
  );
  return renderResult;
};
