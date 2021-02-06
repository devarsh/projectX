import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { BussinessDetailsMetadata } from "./businessDetailsMetadata";

export const BusinessDetailsWrapperForm = () => {
  return (
    <FormWrapper
      key={`businessDetails`}
      metaData={BussinessDetailsMetadata as MetaDataType}
      initialValues={{}}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        console.log(values);
        endSubmit(true);
      }}
    />
  );
};
