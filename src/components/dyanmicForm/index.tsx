import { FormWrapper } from "./formWrapper";
import MetaData from "./metaData";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <FormWrapper metaData={MetaData} />
    </RecoilRoot>
  );
};

export default App;
