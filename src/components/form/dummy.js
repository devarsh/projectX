import React from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValueLoadable,
  RecoilRoot,
} from "recoil";

const ResultValue = atom({
  key: "resultValue",
  default: "",
});

const RecoilQuerySelector = selector({
  key: "recoilQuerySelector",
  get: async ({ get }) => {
    let req;
    const newValue = get(ResultValue);
    req = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=8HblZGNucvRDFBTEzAIn6Da3nBYpc5Eb&q=${newValue}&limit=4&offset=0&rating=g&lang=en`
    );

    let result = await req.json();
    if (result?.data?.length > 0) {
      return result?.data?.map((one) => one.images.looping);
    } else {
      return [];
    }
  },
});

const App = () => {
  return (
    <RecoilRoot>
      <Input />
    </RecoilRoot>
  );
};

export default App;

const Input = () => {
  const [value, setValue] = useRecoilState(ResultValue);
  const result = useRecoilValueLoadable(RecoilQuerySelector);
  console.log(result);
  let output;
  switch (result.state) {
    case "hasValue": {
      output = result.contents.map((one, index) => {
        return (
          <video
            key={index}
            src={one.mp4}
            autoPlay={true}
            height="300"
            width="300"
            loop={true}
          />
        );
      });
      break;
    }
    case "loading": {
      output = <div>loading...</div>;
      break;
    }
    case "hasError": {
      output = <div>Error occured</div>;
      console.log(result.contents);
      break;
    }
    default: {
      output = <div>unkonwn</div>;
    }
  }

  const handleChange = async (e) => {
    setValue(e.target.value);
  };

  return (
    <React.Fragment>
      <label>Name:</label>
      <input type="text" value={value} onChange={handleChange} />
      <div style={{ display: "flex" }}>{output}</div>
    </React.Fragment>
  );
};
