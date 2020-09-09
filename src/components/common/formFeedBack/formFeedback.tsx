import React from "react";
import { useFormFeedback } from "packages/form";

import Alert from "@material-ui/lab/Alert";

const FormFeedBack: React.FC = () => {
  const { isError, message } = useFormFeedback();
  if ((message ?? "") !== "") {
    return (
      <Alert severity={isError ? "error" : "success"} variant="filled">
        {message}
      </Alert>
    );
  }
  return null;
};

export default FormFeedBack;
