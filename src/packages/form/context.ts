import React from "react";
import { FormContextType } from "./types";

export const FormContext = React.createContext<FormContextType>({
  formName: "FORM_NAME",
  initialValues: {},
  validationRun: "onChange",
  resetFieldOnUnmount: true,
});
FormContext.displayName = "FormContext";
