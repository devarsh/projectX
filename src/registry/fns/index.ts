import { APISDK as api } from "./sdk";
import * as others from "./others";

import { singletonFunctionRegisrationFactory } from "components/dyanmicForm";

const { registerFn } = singletonFunctionRegisrationFactory;

//let token = "Bearer eaf78a37-d2f1-45cc-90a9-0fad6159af95";

registerFn("getOtherSourceIncome", api.getMiscVal("INCOME_SOURCE"));
registerFn("getResidentialStatus", api.getMiscVal("RESI_STATUS"));
registerFn("getSalutation", api.getMiscVal("SALUTATION_TYPE"));
registerFn("getProfessionalYears", api.getMiscVal("PROF_YEARS"));
registerFn("getBusinessNature", api.getMiscVal("BUSINESS_NATURE"));
registerFn("getIndustryType", api.getMiscVal("INDUSTRY_TYPE"));
registerFn("getFirmType", api.getMiscVal("FIRM_TYPE"));
registerFn("getProfession", api.getMiscVal("PROFESSION"));
registerFn("getProfessionYears", api.getMiscVal("PROF_YEARS"));
registerFn("getProjectType", api.getMiscVal("PROJECT_TYPE"));
registerFn("getExperianceyears", api.getMiscVal("EXPERI_YEARS"));
registerFn("getPropertyType", api.getMiscVal("PROPERTY_TYPE"));
registerFn("getGenderList", api.getMiscVal("GENDER"));
registerFn("getRelationship", api.getMiscVal("RELATIONSHIP"));
registerFn("getRetailEmployee", api.getMiscVal("RETAIL_EMPL"));
registerFn("getTypeOfLoan", api.getMiscVal("TYPE_OF_LOAN"));
registerFn("getResidentialType", api.getMiscVal("RESIDENCE_TYPE"));
registerFn("getBusinessPremise", api.getMiscVal("BUSIN_PREMIS"));
registerFn("getProductType", api.getProductType);
registerFn("getPropertyCity", api.getPropertyCity);
registerFn("getBankList", api.getBankList);
registerFn("getYesOrNoOptions", others.getYesOrNoOptions);
registerFn("AutoFillGender", others.AutoFillGender);
registerFn("getPincodeDtl", others.getPincodeDtl(api.getPincode));
registerFn("getLocationDtl", others.getLocationDtl);
registerFn(
  "getcoApplicantPincodeDtl",
  others.getcoApplicantPincodeDtl(api.getPincode)
);
registerFn("getcoApplicantLocationDtl", others.getcoApplicantLocationDtl);
registerFn("getValidateValue", others.getValidateValue);
registerFn("getGenderValue", others.getGenderValue);
