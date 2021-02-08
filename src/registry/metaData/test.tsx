import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { BussinessDetailsMetadata } from "./businessDetailsMetadata";

export const Form = () => {
  return (
    <FormWrapper
      key={`collateralDetails`}
      metaData={BussinessDetailsMetadata as MetaDataType}
      initialValues={{}}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        endSubmit(true);
      }}
    />
  );
};
