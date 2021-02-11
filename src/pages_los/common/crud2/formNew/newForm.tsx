import { useCallback, FC } from "react";
import { LOSSDK } from "registry/fns/los";
import { useMutation } from "react-query";
import { queryClient } from "cache";
import { SubmitFnType } from "packages/form";
import FormWrapper, {
  isMetaDataValid,
  MetaDataType,
} from "components/dyanmicForm";
import { transformMetaDataForNew } from "../utils";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  productType: string;
  refID: string;
}

const insertFormData = async ({
  data,
  productType,
  refID,
}: InsertFormDataFnType) => {
  return LOSSDK.insertLeadData(productType, refID, data);
};

export const NewForm: FC<{
  refID: string;
  productType: string;
  moveToViewForm: any;
  setSnackBarMessage: any;
  isProductEditedRef: any;
  setShowAsk: any;
  metaData: MetaDataType;
}> = ({
  refID,
  productType,
  moveToViewForm,
  setSnackBarMessage,
  isProductEditedRef,
  setShowAsk,
  metaData,
}) => {
  const returnToAsk = useCallback(() => setShowAsk(true), [setShowAsk]);

  const mutation = useMutation(insertFormData, {
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
      queryClient.refetchQueries(["checkDataExist", productType, refID]);
      endSubmit(true, "");
      setSnackBarMessage({
        type: "success",
        message: data?.msg ?? "Changes successfully saved",
      });
      isProductEditedRef.current = true;
      //moveToViewForm();
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

  let isError = false;
  let errorMsg = "";
  let newMetaData = JSON.parse(JSON.stringify(metaData)) as MetaDataType;
  isError = !isMetaDataValid(newMetaData);
  if (isError === false) {
    newMetaData = transformMetaDataForNew(newMetaData as MetaDataType);
  } else {
    errorMsg = "Error loading form";
  }

  const renderResult =
    isError === true ? (
      <span>{errorMsg}</span>
    ) : (
      <FormWrapper
        key={`${productType}-${refID}-NewMode`}
        metaData={metaData as MetaDataType}
        initialValues={{}}
        onSubmitHandler={onSubmitHandler}
        onCancleHandler={returnToAsk}
        defaultMode="edit"
      />
    );
  return renderResult;
};
