import FormWrapper, { MetaDataType } from "../index";
import metaData from "./meta";

const TestForm = () => {
  return (
    <FormWrapper
      key={`testForm`}
      metaData={metaData as MetaDataType}
      initialValues={{
        addressDetails: [
          { value1: "334" },
          { value2: "3434" },
          { value1: "34345354" },
        ],
      }}
      onSubmitHandler={(values, displayValues, endSubmit) => {
        console.log(values);
        endSubmit(true);
      }}
      displayMode="edit"
    >
      {({ handleSubmit }) => {
        return <button onClick={handleSubmit}>Save</button>;
      }}
    </FormWrapper>
  );
};

export default TestForm;
