import { useState } from "react";
const makeAPIReq = async (docType, docNumber, dob) => {
  var myHeaders = new Headers();
  myHeaders.append("authkey", "c53a2f4e-98d4-435b-8a84-1dbcea9791c5");
  var formdata = new FormData();
  formdata.append("docType", docType);
  formdata.append("docNumber", docNumber);
  if (Boolean(dob)) {
    formdata.append("dob", dob);
  }
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    credentials: "include",
  };
  try {
    let resp = await fetch("https://gc.invoid.co", requestOptions);
    let result = resp.text();
    return result;
  } catch (e) {
    console.log(e, typeof e);
    return { unExpectedError: e };
  }
};

export const APITest = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Control label="panCard" docType="pan"></Control>
      <Control label="panCard" docType="pan"></Control>
    </div>
  );
};

const Control = ({ label, docType }) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <label>{label}</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={async () => {
          let result = makeAPIReq(docType, text);
          setResult(result);
        }}
      >
        Validate
      </button>
      <pre>{JSON.stringify(result, 2, null)}</pre>
    </div>
  );
};
