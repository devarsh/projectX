import { others, pincode, MiscSDK as miscSDK } from "./misc";
import { singletonFunctionRegisrationFactory } from "components/utils";

const { registerFn } = singletonFunctionRegisrationFactory;

registerFn("getOtherSourceIncome", miscSDK.getMiscVal("INCOME_SOURCE"));
registerFn("getResidentialStatus", miscSDK.getMiscVal("RESI_STATUS"));
registerFn("getSalutation", miscSDK.getMiscVal("SALUTATION_TYPE"));
registerFn("getProfessionalYears", miscSDK.getMiscVal("PROF_YEARS"));
registerFn("getBusinessNature", miscSDK.getMiscVal("BUSINESS_NATURE"));
registerFn("getFirmType", miscSDK.getMiscVal("FIRM_TYPE"));
registerFn("getProfession", miscSDK.getMiscVal("PROFESSION"));
registerFn("getProfessionYears", miscSDK.getMiscVal("PROF_YEARS"));
registerFn("getProjectType", miscSDK.getMiscVal("PROJECT_TYPE"));
registerFn("getExperianceyears", miscSDK.getMiscVal("EXPERI_YEARS"));
registerFn("getPropertyType", miscSDK.getMiscVal("PROPERTY_TYPE"));
registerFn("getGenderList", miscSDK.getMiscVal("GENDER"));
registerFn("getRelationship", miscSDK.getMiscVal("RELATIONSHIP"));
registerFn("getRetailEmployee", miscSDK.getMiscVal("RETAIL_EMPL"));
registerFn("getUnsecuredEmployee", miscSDK.getMiscVal("UNSECURED_EMPL"));
registerFn("getSMEEmployee", miscSDK.getMiscVal("SME_EMPL"));
registerFn("getSMEBusinessEmployee", miscSDK.getMiscVal("SME_EMPL_01"));
registerFn("getLoanPurpose", miscSDK.getMiscVal("LOAN_PURPOSE"));
registerFn("getTypeOfLoan", miscSDK.getMiscVal("TYPE_OF_LOAN"));
registerFn("getResidentialType", miscSDK.getMiscVal("RESIDENCE_TYPE"));
registerFn("getBusinessPremise", miscSDK.getMiscVal("BUSIN_PREMIS"));
registerFn("getInfraEmployee", miscSDK.getMiscVal("INFRA_EMPL"));
registerFn("getEducationDtl", miscSDK.getMiscVal("EDUCATION"));
registerFn("getSecurityOffered", miscSDK.getMiscVal("SECURITY_OFF"));
registerFn("getYouAre", miscSDK.getMiscVal("YOU_ARE"));
registerFn("getAccountType", miscSDK.getMiscVal("ACCT_TYPE"));
registerFn("getChannelType", miscSDK.getMiscVal("CHANNEL_TYPE"));
registerFn("getBusinessInterest", miscSDK.getMiscVal("BUSI_INTREST"));
registerFn("getLeadPriority", miscSDK.getMiscVal("LEAD_PRIORITY"));
registerFn("getIndividualAddType", miscSDK.getMiscVal("IND_ADD_TYPE"));
registerFn("businessAddType", miscSDK.getMiscVal("BUSSIN_ADD_TYPE"));
registerFn("getProductType", miscSDK.getProductType);
registerFn("getsubProductDtl", miscSDK.getSubProductDtl);
registerFn("getPropertyCity", miscSDK.getPropertyCity);
registerFn("getBankList", miscSDK.getBankList);
registerFn("getIndustryType", miscSDK.getIndustryType);
registerFn("getIndustrySubType", miscSDK.getIndustrySubType);

/*register others*/

registerFn("getYesOrNoOptions", others.getYesOrNoOptions);
registerFn("AutoFillGender", others.AutoFillGender);
registerFn("getValidateValue", others.getValidateValue);
registerFn("getGenderValue", others.getGenderValue);

registerFn(
  "getMonthlyEmiPayValidateValue",
  others.getMonthlyEmiPayValidateValue
);

registerFn("getPincodeDtl", pincode.getPincodeDtl(miscSDK.getPincodeExternal));
registerFn(
  "getPincodeDtlEdit",
  pincode.getPincodeDtlEdit(miscSDK.getPincodeExternal)
);

registerFn("getLocationDtl", pincode.getLocationDtl);
registerFn("getLocationDtlEdit", pincode.getLocationDtlEdit);
registerFn(
  "getcoApplicantPincodeDtl",
  pincode.getcoApplicantPincodeDtl(miscSDK.getPincodeExternal)
);
registerFn("getcoApplicantLocationDtl", pincode.getcoApplicantLocationDtlEdit);
registerFn(
  "getSitePincodeDtl",
  pincode.getSitePincodeDtlEdit(miscSDK.getPincodeExternal)
);

registerFn(
  "getcoApplicantPincodeDtlEdit",
  pincode.getcoApplicantPincodeDtlEdit(miscSDK.getPincodeExternal)
);
registerFn(
  "getcoApplicantLocationDtlEdit",
  pincode.getcoApplicantLocationDtlEdit
);
registerFn(
  "getSitePincodeDtlEdit",
  pincode.getSitePincodeDtlEdit(miscSDK.getPincodeExternal)
);
registerFn("getSiteLocationDtl", pincode.getSiteLocationDtlEdit);
registerFn("getSiteLocationDtlEdit", pincode.getSiteLocationDtlEdit);
