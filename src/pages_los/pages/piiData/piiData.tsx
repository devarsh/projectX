import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import metaData from "./meta";

export const PIIData = () => {
  return (
    <FormWrapper
      key={`piiData`}
      metaData={metaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        console.log(values);
        endSubmit(true);
      }}
    />
  );
};
