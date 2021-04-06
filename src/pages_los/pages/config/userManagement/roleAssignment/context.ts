import * as API from "./api";
import { API as CRUD2API } from "pages_los/common/crud2";

export const createRoleAssignmentContext = (
  moduleType,
  productType,
  refID
) => ({
  context: {
    moduleType,
    productType,
    refID,
  },
  insertFormData: {
    fn: API.insertUserData,
    args: { moduleType, productType, refID },
  },
  checkFormDataExist: {
    fn: CRUD2API.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  deleteFormData: {
    fn: CRUD2API.deleteFormData,
    args: { moduleType, productType, refID },
  },
  updateFormData: {
    fn: API.updateUserData,
    args: { moduleType, productType, refID },
  },
  getFormData: {
    fn: API.getUsersData,
    args: { moduleType, productType, refID },
  },
  getGridFormData: {
    fn: CRUD2API.getGridFormData,
    args: { moduleType, productType, refID },
  },
  getFormMetaData: {
    fn: CRUD2API.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  getGridFormMetaData: {
    fn: API.getGridFormMetaData,
    args: { moduleType, productType, refID },
  },
});
