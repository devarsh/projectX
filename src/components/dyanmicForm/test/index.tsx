import FormWrapper, { MetaDataType } from "../index";
import metaData from "./meta";
import { singletonFunctionRegisrationFactory } from "components/utils";
import { LeadSearch } from "pages_los/common/search";

const { registerFn } = singletonFunctionRegisrationFactory;

const MyComponent = ({ onAccept, value }) => {
  return <button onClick={() => onAccept("wowow")}>Errr</button>;
};
//or registerFn("searchComponent", InquirySearch);
registerFn("searchComponent", LeadSearch);

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
