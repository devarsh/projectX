import { FormWrapper } from "./formWrapper";
import MetaData from "./metaData";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <FormWrapper
        metaData={MetaData}
        inititalValues={{
          firstName: "devarsh",
        }}
      />
    </RecoilRoot>
  );
};

export default App;
