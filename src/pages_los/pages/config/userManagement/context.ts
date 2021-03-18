import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";

export const createRoleAssignmentContext = (
  moduleType,
  productType,
  refID,
  productCode
) => ({
  context: {
    moduleType,
    productType,
    refID,
    productCode,
  },
  insertFormData: {
    fn: API.insertData,
    args: { moduleType, productType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  deleteFormData: {
    fn: API.deleteData,
    args: { moduleType, productType, refID },
  },
  updateFormData: {
    fn: API.updateData,
    args: { moduleType, productType, refID },
  },
  getFormData: {
    fn: API.getData,
    args: { moduleType, productType, refID },
  },
  getGridFormData: {
    fn: API.getGridData,
    args: { moduleType, productType, refID },
  },
  getFormMetaData: {
    fn: CRUD2API.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  getGridFormMetaData: {
    fn: CRUD2API.getGridFormMetaData,
    args: { moduleType, productType, refID },
  },
});
