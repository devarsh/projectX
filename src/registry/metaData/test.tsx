import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { GeneralDetailsMetaData } from "./generalDetailsMetadata";

export const Form = () => {
  return (
    <FormWrapper
      key={`collateralDetails`}
      metaData={GeneralDetailsMetaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        endSubmit(true);
      }}
    />
  );
};
