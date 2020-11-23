import { useState, Fragment } from "react";

export default function EmployeeDashboard() {
  const [IFrameVisible, setIFrameVisible] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => {
          setIFrameVisible(!IFrameVisible);
        }}
      >
        open in Iframe
      </button>
      <br />
      {IFrameVisible ? (
        <iframe
          src="https://www.acuteinformatics.co.in/"
          width="100%"
          height="700px"
        />
      ) : null}
    </Fragment>
  );
}
