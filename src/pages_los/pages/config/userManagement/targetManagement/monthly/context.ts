import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";

export const TargetAPICrudProviderGenerator = (
  moduleType: any,
  productType: any,
  serialNo?: any
) => ({
  context: {
    moduleType,
    productType,
    serialNo,
  },
  insertFormData: {
    fn: CRUD2API.insertFormData,
    args: { moduleType, productType, serialNo },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, productType, serialNo },
  },
  deleteFormData: {
    fn: CRUD2API.deleteFormData,
    args: { moduleType, productType, serialNo },
  },
  updateFormData: {
    fn: API.updateMonthlyTargetData,
    args: { moduleType, productType, serialNo },
  },
  getFormMetaData: {
    fn: CRUD2API.getFormMetaData,
    args: { moduleType, productType, serialNo },
  },
  getFormData: {
    fn: API.getTargetGridData,
    args: { moduleType, productType, serialNo },
  },
  getGridFormMetaData: {
    fn: API.getGridFormMetaData,
    args: { moduleType, productType, serialNo },
  },
  getGridFormData: {
    fn: API.getTargetGridData,
    args: { moduleType, productType, serialNo },
  },
});
