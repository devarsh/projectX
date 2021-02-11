import { FC, useContext, useEffect } from "react";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, {
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { SubmitFnType, InitialValuesType } from "packages/form";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "cache";
import { transformMetaDataForEdit } from "./utils";
import { ClearCacheContext } from "cache";

interface updateFormDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  productType: string;
  refID: string;
  formState: any;
}

const updateFormData = async ({
  data,
  productType,
  refID,
  formState,
}: updateFormDataType) => {
  return LOSSDK.updateLeadData(productType, refID, data, formState);
};

export const EditForm: FC<{
  refID: string;
  productType: string;
  moveToViewForm: any;
  setSnackBarMessage: any;
  isProductEditedRef: any;
  metaData: MetaDataType;
  formState: any;
}> = ({
  refID,
  productType,
  moveToViewForm,
  setSnackBarMessage,
  isProductEditedRef,
  metaData,
  formState,
}) => {
  const removeCache = useContext(ClearCacheContext);
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
      // setSnackBarMessage({
      //   type: "error",
      //   message: errorMsg,
      // });
    },
    onSuccess: (data, { endSubmit }) => {
      queryClient.refetchQueries(["getViewData", productType, refID]);
      queryClient.refetchQueries([
        "getEditData",
        productType,
        refID,
        formState,
      ]);
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
      formState,
    });
  };

  useEffect(() => {
    removeCache?.addEntry(["getEditData", productType, refID]);
  }, []);

  const result = useQuery(
    ["getEditData", productType, refID, formState],
    () => LOSSDK.getLeadDataForEdit(productType, refID),
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
  // if (loading === false && isError === false) {
  //   isError = !isMetaDataValid(metaData);
  //   if (isError === false) {
  //     metaData = transformMetaDataForEdit(metaData as MetaDataType);
  //   } else {
  //     errorMsg = "Error loading form";
  //   }
  // }

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={`${productType}-${refID}-editMode`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      onCancleHandler={moveToViewForm}
      defaultMode="edit"
    />
  );
  return renderResult;
};
