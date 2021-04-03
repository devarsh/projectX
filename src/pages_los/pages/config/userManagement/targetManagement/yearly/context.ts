import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";

export const TargetAPICrudProviderGenerator = (
  moduleType: any,
  productType: any,
  userID?: any
) => ({
  context: {
    moduleType,
    productType,
    userID,
  },
  insertFormData: {
    fn: API.insertYearlyTargetData,
    args: { moduleType, productType, userID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, productType, userID },
  },
  deleteFormData: {
    fn: API.deleteTarget,
    args: { moduleType, productType, userID },
  },
  updateFormData: {
    fn: API.updateYearlyTargetData,
    args: { moduleType, productType, userID },
  },
  getFormMetaData: {
    fn: API.getFormMetaData,
    args: { moduleType, productType, userID },
  },
  getFormData: {
    fn: CRUD2API.getFormData,
    args: { moduleType, productType, userID },
  },
  getGridFormMetaData: {
    fn: API.getGridFormMetaData,
    args: { moduleType, productType, userID },
  },
  getGridFormData: {
    fn: API.getTargetGridData,
    args: { moduleType, productType, userID },
  },
});
