import { FC } from "react";
import { LOSSDK } from "registry/fns/los";
import { useMutation } from "react-query";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";

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

export const FormNew: FC<{
  refID: string;
  productType: string;
  isProductEditedRef: any;
  metaData: MetaDataType;
  successAction: any;
  cancelAction: any;
}> = ({
  refID,
  productType,
  isProductEditedRef,
  metaData,
  successAction,
  cancelAction,
}) => {
  const mutation = useMutation(insertFormData, {
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

  let newMetaData = JSON.parse(JSON.stringify(metaData)) as MetaDataType;

  const renderResult = (
    <FormWrapper
      key={`${productType}-${refID}-NewMode`}
      metaData={newMetaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
      defaultMode={"new"}
      onCancleHandler={
        typeof cancelAction === "function" ? () => cancelAction(true) : null
      }
    />
  );
  return renderResult;
};
