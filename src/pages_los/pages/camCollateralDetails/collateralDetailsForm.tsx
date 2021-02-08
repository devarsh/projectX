import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { CollateralDetailsMetaData } from "./collateralDetailsMetadata";

export const CollateralDetailsData = () => {
  return (
    <FormWrapper
      key={`collateralDetails`}
      metaData={CollateralDetailsMetaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        console.log("meta value", values);
        endSubmit(true);
      }}
    />
  );
};
