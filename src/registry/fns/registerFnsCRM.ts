import { CRMSDK, others } from "./crm";

import { singletonFunctionRegisrationFactory } from "components/utils";
const { registerFn } = singletonFunctionRegisrationFactory;
registerFn("validatePanNumber", CRMSDK.validatePanNumber);
registerFn(
  "getCompanyNameFromGST",
  others.getGSTCompanyNameDtl(CRMSDK.getCompanyNameFromGST)
);
