import { CRMSDK, others } from "./crm";

import { singletonFunctionRegisrationFactory } from "components/dyanmicForm";
const { registerFn } = singletonFunctionRegisrationFactory;
registerFn("validatePanNumber", CRMSDK.validatePanNumber);
registerFn(
  "getCompanyNameFromGST",
  others.getGSTCompanyNameDtl(CRMSDK.getCompanyNameFromGST)
);
