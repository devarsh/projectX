import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { GeneralDetailsMetaData } from "./generalDetailsMetadata";

export const GeneralDetailsData = () => {
  return (
    <FormWrapper
      key={`generalDetails`}
      metaData={GeneralDetailsMetaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        console.log("meta value", values);
        endSubmit(true);
      }}
    />
  );
};
