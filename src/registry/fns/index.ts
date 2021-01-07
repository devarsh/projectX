import { APISDK as api } from "./sdk";
import * as others from "./others";
import * as pincode from "./pincode";

import { singletonFunctionRegisrationFactory } from "components/dyanmicForm";

const { registerFn } = singletonFunctionRegisrationFactory;

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
registerFn("getUnsecuredEmployee", api.getMiscVal("UNSECURED_EMPL"));
registerFn("getSMEEmployee", api.getMiscVal("SME_EMPL"));
registerFn("getSMEBusinessEmployee", api.getMiscVal("SME_EMPL_01"));
registerFn("getLoanPurpose", api.getMiscVal("LOAN_PURPOSE"));
registerFn("getTypeOfLoan", api.getMiscVal("TYPE_OF_LOAN"));
registerFn("getResidentialType", api.getMiscVal("RESIDENCE_TYPE"));
registerFn("getBusinessPremise", api.getMiscVal("BUSIN_PREMIS"));
registerFn("getProductType", api.getProductType);
registerFn("getPropertyCity", api.getPropertyCity);
registerFn("getBankList", api.getBankList);
registerFn("getYesOrNoOptions", others.getYesOrNoOptions);
registerFn("AutoFillGender", others.AutoFillGender);
registerFn("getValidateValue", others.getValidateValue);
registerFn("getGenderValue", others.getGenderValue);
registerFn("getSecurityOffered", api.getMiscVal("SECURITY_OFF"));
registerFn("getYouAre", api.getMiscVal("YOU_ARE"));
registerFn("getsubProductDtl", api.getsubProductDtl);
registerFn("getInfraEmployee", api.getMiscVal("INFRA_EMPL"));
registerFn("getEducationDtl", api.getMiscVal("EDUCATION"));
registerFn("validatePanNumber", api.validatePanNumber);
registerFn(
  "getMonthlyEmiPayValidateValue",
  others.getMonthlyEmiPayValidateValue
);
registerFn("getAccountType", api.getMiscVal("ACCT_TYPE"));
registerFn("getChannelType", api.getMiscVal("CHANNEL_TYPE"));
registerFn("getBusinessInterest", api.getMiscVal("BUSI_INTREST"));

registerFn("getPincodeDtl", pincode.getPincodeDtl(api.getPincode));
registerFn("getLocationDtl", pincode.getLocationDtl);
registerFn(
  "getcoApplicantPincodeDtl",
  pincode.getcoApplicantPincodeDtl(api.getPincode)
);
registerFn("getcoApplicantLocationDtl", pincode.getcoApplicantLocationDtlEdit);
registerFn("getSitePincodeDtl", pincode.getSitePincodeDtlEdit(api.getPincode));
registerFn("getSiteLocationDtl", pincode.getSiteLocationDtlEdit);

registerFn("getPincodeDtlEdit", pincode.getPincodeDtlEdit(api.getPincode));
registerFn("getLocationDtlEdit", pincode.getLocationDtlEdit);
registerFn(
  "getcoApplicantPincodeDtlEdit",
  pincode.getcoApplicantPincodeDtlEdit(api.getPincode)
);
registerFn(
  "getcoApplicantLocationDtlEdit",
  pincode.getcoApplicantLocationDtlEdit
);
registerFn(
  "getSitePincodeDtlEdit",
  pincode.getSitePincodeDtlEdit(api.getPincode)
);
registerFn("getSiteLocationDtlEdit", pincode.getSiteLocationDtlEdit);
