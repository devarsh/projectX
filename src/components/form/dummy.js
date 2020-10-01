import React, { useState } from "react";

const makeRequest = async (data, controller) => {
  const req = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=8HblZGNucvRDFBTEzAIn6Da3nBYpc5Eb&q=${data}&limit=4&offset=0&rating=g&lang=en`,
    {
      signal: controller.signal,
    }
  );
  let result = await req.json();
  if (result?.data?.length > 0) {
    return result?.data?.map((one) => one.images.looping);
  } else {
    return [];
  }
};

const handleRemoteFetch = (data) => {
  const controller = new AbortController();
  const result = makeRequest(data, controller);
  result.cancel = () => {
    console.log("cancelled", data);
    controller.abort();
  };
  return result;
};

const App = () => {
  return <Input />;
};

export default App;

const Input = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const lastPromise = React.useRef([]);
  const lastValue = React.useRef(null);

  const fetchData = (query) => {
    if (lastValue.current === query) {
      return;
    }
    const promise = handleRemoteFetch(query);
    const _ = lastPromise.current?.cancel?.();
    lastPromise.current = promise;
    lastValue.current = query;
    promise
      .then((res) => {
        if (promise === lastPromise.current) {
          console.log("setting result for", query);
          setResult(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const output = result.map((one, index) => {
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

  const handleChange = async (e) => {
    setValue(e.target.value);
    fetchData(e.target.value);
  };

  return (
    <React.Fragment>
      <label>Name:</label>
      <input type="text" value={value} onChange={handleChange} />
      <div style={{ display: "flex" }}>{output}</div>
    </React.Fragment>
  );
};
