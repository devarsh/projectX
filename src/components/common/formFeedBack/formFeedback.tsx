import React from "react";
import { useFormFeedback } from "packages/form";

import Alert, { AlertProps } from "@material-ui/lab/Alert";

const FormFeedBack: React.FC<AlertProps> = (props) => {
  const { isError, message } = useFormFeedback();
  if ((message ?? "") !== "") {
    return (
      <Alert {...props} severity={isError ? "error" : "success"}>
        {message}
      </Alert>
    );
  }
  return null;
};

export default FormFeedBack;
