import { FC, useContext, useRef } from "react";
import { useMutation } from "react-query";
import { SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { CRUDContext } from "./context";
import { cacheWrapperKeyGen } from "./utils";

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
  metaData: MetaDataType;
  successAction: any;
  cancelAction: any;
}> = ({ isProductEditedRef, metaData, successAction, cancelAction }) => {
  const { insertFormData } = useContext(CRUDContext);
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

  let newMetaData = JSON.parse(JSON.stringify(metaData)) as MetaDataType;

  const renderResult = (
    <FormWrapper
      key={`${wrapperKey.current}`}
      metaData={newMetaData as MetaDataType}
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
