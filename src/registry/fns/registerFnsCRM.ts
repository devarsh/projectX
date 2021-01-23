import { CRMSDK } from "./crm";

import { singletonFunctionRegisrationFactory } from "components/dyanmicForm";
const { registerFn } = singletonFunctionRegisrationFactory;
registerFn("validatePanNumber", CRMSDK.validatePanNumber);
