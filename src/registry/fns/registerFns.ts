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
registerFn("getIndividualAddressType", miscSDK.getMiscVal("IND_ADD_TYPE"));
registerFn("businessAddressType", miscSDK.getMiscVal("BUSSIN_ADD_TYPE"));
registerFn("facilityType", miscSDK.getMiscVal("FACILITY_TYPE"));
registerFn("securityType", miscSDK.getMiscVal("SECURITY_TYPE"));
registerFn("businessSize", miscSDK.getMiscVal("BUSINESS_SIZE"));
registerFn("getNatureOfFacility", miscSDK.getMiscVal("NATURE_FACILITY"));
registerFn("projectParticularType", miscSDK.getMiscVal("PARTICULAR_TYPE"));
registerFn("bankFacilityType", miscSDK.getMiscVal("ACCOUNT_TYPE"));
registerFn("getBankDocType", miscSDK.getMiscVal("BANK_DOC_TYPE"));
registerFn("getITRDocType", miscSDK.getMiscVal("ITR_DOC_TYPE"));
registerFn("getITRDocTypeOther", miscSDK.getMiscVal("ITR_DOC_TYPE_O"));
registerFn("getKYCDocType", miscSDK.getMiscVal("KYC_DOC_TYPE"));
registerFn("getOtherDocType", miscSDK.getMiscVal("OTHER_DOC_TYPE"));
registerFn("getGSTDocType", miscSDK.getMiscVal("GST_DOC_TYPE"));
registerFn("getLeadStage", miscSDK.getMiscVal("LEAD_STAGE"));
registerFn("getNomineeRelation", miscSDK.getMiscVal("NOMINI_RELATION"));
registerFn("getSMEDepartment", miscSDK.getMiscVal("SME_DEPARTMENT"));
registerFn("getAcceptancePolicy", miscSDK.getMiscVal("ACCEPT_POLICY"));
registerFn("getTargetYears", miscSDK.getMiscVal("TARGET_YEARS"));
registerFn("getTargetMonth", miscSDK.getMiscVal("TARGET_MONTH"));
registerFn("getNewTakeover", miscSDK.getMiscVal("NEW_TAKEOVER"));
registerFn("getFinancialSource", miscSDK.getMiscVal("FIN_SOURCE"));
registerFn("getProductType", miscSDK.getProductType);
registerFn("getProductTypeForBank", miscSDK.getProductTypeForBank);
registerFn("getBankSubProductType", miscSDK.getBankSubProductType);
registerFn("getBankSubProductType2", miscSDK.getBankSubProductType2);
registerFn("getPropertyCity", miscSDK.getPropertyCity);
registerFn("getBankList", miscSDK.getBankList);
registerFn("getIndustryType", miscSDK.getIndustryType);
registerFn("getIndustrySubType", miscSDK.getIndustrySubType);
registerFn("getCRMSubProductType", miscSDK.getCRMSubProductType);
registerFn("getPerfiosBankList", miscSDK.getPerfiosBankList);
registerFn("getBranchList", miscSDK.getBranchList);
registerFn("getSourcelist", miscSDK.getSourcelist);

/*register others*/

registerFn("getYesOrNoOptions", others.getYesOrNoOptions);
registerFn("AutoFillGender", others.AutoFillGender);
registerFn("getValidateValue", others.getValidateValue);
registerFn("getGenderValue", others.getGenderValue);
registerFn("setLTVValue", others.setLTVValue);
registerFn("setNewLTVValue", others.setNewLTVValue);
registerFn("setLTVValueForCAM", others.setLTVValueForCAM);

registerFn(
  "getMonthlyEmiPayValidateValue",
  others.getMonthlyEmiPayValidateValue
);

registerFn("getPincode", miscSDK.getPincodeExternal);

// Post validation hooks
registerFn("postValidationSetPincodeDtl", pincode.postValidationSetPincodeDtl);
registerFn(
  "postValidationSetLocationDtl",
  pincode.postValidationSetLocationDtl
);
registerFn(
  "postValidationSetCoApplicantPincodeDtl",
  pincode.postValidationSetCoApplicantPincodeDtl
);
registerFn(
  "postValidationSetCoApplicantLocationDtl",
  pincode.postValidationSetCoApplicantLocationDtl
);

registerFn(
  "postValidationSetSiteLocationDtl",
  pincode.postValidationSetSiteLocationDtl
);
registerFn(
  "postValidationSetSitePincodeDtl",
  pincode.postValidationSetSitePincodeDtl
);

registerFn(
  "setValueOnDependentFieldsChangeOne",
  others.setValueOnDependentFieldsChangeOne
);
//Dummy only for testing
registerFn("shouldExcludeDummy", others.shouldExcludeDummy);
registerFn("getMonthDifferenceInRows", others.getMonthDifferenceInRows);
registerFn("setBankFacilityValue", others.setBankFacilityValue);
//End of Dummy only for testing
