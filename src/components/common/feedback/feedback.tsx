import React from "react";
import { useFormFeedback } from "packages/form";

import Alert from "@material-ui/lab/Alert";

export const FormFeedback: React.FC = () => {
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
