import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { CollateralDetailsMetaData } from "./collateralDetailsMetadata";

export const DetailsData = () => {
  return (
    <FormWrapper
      key={`collateralDetails`}
      metaData={CollateralDetailsMetaData as MetaDataType}
      initialValues={{}}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        endSubmit(true);
      }}
    />
  );
};
