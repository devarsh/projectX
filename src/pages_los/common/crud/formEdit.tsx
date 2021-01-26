import { FC, useContext, useEffect } from "react";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, {
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { SubmitFnType, InitialValuesType } from "packages/form";
import { useMutation, useQueries } from "react-query";
import { queryClient } from "cache";
import { transformMetaDataForEdit } from "./utils";
import { RemoveCacheRegisterContext } from "../removeCacheRegisterContext";

interface updateFormDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  productType: string;
  refID: string;
}

const updateFormData = async ({
  data,
  productType,
  refID,
}: updateFormDataType) => {
  return LOSSDK.updateData(productType, refID, data);
};

export const EditForm: FC<{
  refID: string;
  productType: string;
  moveToViewForm: any;
  setSnackBarMessage: any;
  isProductEditedRef: any;
}> = ({
  refID,
  productType,
  moveToViewForm,
  setSnackBarMessage,
  isProductEditedRef,
}) => {
  const removeCache = useContext(RemoveCacheRegisterContext);
  if (typeof setSnackBarMessage !== "function") {
    setSnackBarMessage = () => alert("userMessage function not set");
  }
  if (typeof moveToViewForm !== "function") {
    moveToViewForm = () => alert("move to view form function not set");
  }
  const mutation = useMutation(updateFormData, {
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg);
      setSnackBarMessage({
        type: "error",
        message: errorMsg,
      });
    },
    onSuccess: (data, { endSubmit }) => {
      queryClient.refetchQueries(["getViewData", productType, refID]);
      queryClient.refetchQueries(["getEditData", productType, refID]);
      endSubmit(true, "");
      setSnackBarMessage({
        type: "success",
        message: data?.msg ?? "Changes successfully saved",
      });
      isProductEditedRef.current = true;
      moveToViewForm();
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
    });
  };

  useEffect(() => {
    removeCache?.addEntry(["getEditMetaData", productType, refID]);
    removeCache?.addEntry(["getEditData", productType, refID]);
  }, []);

  const result = useQueries([
    {
      queryKey: ["getEditMetaData", productType, refID],
      queryFn: () => LOSSDK.getEditMetaData(productType, refID),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["getEditData", productType, refID],
      queryFn: () => LOSSDK.getEditData(productType, refID),
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  ]);

  const dataUniqueKey = result[1].dataUpdatedAt;

  const loading =
    result[0].isLoading ||
    result[1].isLoading ||
    result[0].isFetching ||
    result[1].isFetching;
  let isError = result[0].isError || result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg ?? ""} ${
    //@ts-ignore
    result[1].error?.error_msg ?? ""
  }`;
  let metaData = JSON.parse(
    JSON.stringify(result[0].data ?? {})
  ) as MetaDataType;
  let formEditData = result[1].data;
  if (loading === false && isError === false) {
    isError = !isMetaDataValid(metaData);
    if (isError === false) {
      metaData = transformMetaDataForEdit(metaData as MetaDataType);
    } else {
      errorMsg = "Error loading form";
    }
  }

  //for some odd reason our formWrapper is called without initial values need to find out why

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={`${productType}-${refID}-${dataUniqueKey}-editMode`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      onCancleHandler={moveToViewForm}
    />
  );
  return renderResult;
};
