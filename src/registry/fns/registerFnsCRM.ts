import { CRMSDK } from "./crm";
import { GST } from "./misc/gst";

import { singletonFunctionRegisrationFactory } from "components/dyanmicForm";
const { registerFn } = singletonFunctionRegisrationFactory;
registerFn("validatePanNumber", CRMSDK.validatePanNumber);
registerFn(
  "getCompanyNameFromGST",
  GST.getCompanyName(CRMSDK.getCompanyNameFromGST)
);
