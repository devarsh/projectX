import { shouldExclude, LOSSDK, retail } from "./los";

import { singletonFunctionRegisrationFactory } from "components/utils";
const { registerFn } = singletonFunctionRegisrationFactory;

registerFn(
  "shouldExcludeGeneralDetailProposed",
  shouldExclude.generalDetailNatureofFacilityProposed
);
registerFn(
  "shouldExcludeBankDetailNatureofFacilityPresent",
  shouldExclude.bankDetailNatureofFacilityPresent
);

registerFn(
  "shouldExcludeBankDetailArrangements",
  shouldExclude.bankDetailBankingArrangements
);

registerFn(
  "shouldExcludeGeneralDetailBusinessNature",
  shouldExclude.generalDetailBusinessNature
);

registerFn(
  "shouldExcludeProjectDetailsTypeCostOfProject",
  shouldExclude.projectDetailsTypeCostOfProject
);

registerFn(
  "shouldExcludeProjectDetailsTypeMeansOFFinance",
  shouldExclude.projectDetailsTypeMeansOFFinance
);
registerFn(
  "shouldExcludeMainDetailsdeveloperOrContactor",
  shouldExclude.mainDetailsdeveloperOrContactor
);

registerFn("getLeadSubStageCode", LOSSDK.getLeadSubStageCode);
registerFn("getLeadEmploymentType", LOSSDK.getLeadEmploymentType);

registerFn(
  "shouldExcludesShowSMELAPSubProductTypeField",
  shouldExclude.showSMELAPSubProductTypeField
);

registerFn(
  "shouldExcludeShowInfraSubProduct2TypeField",
  shouldExclude.showInfraSubProduct2TypeField
);
registerFn(
  "shouldShowRetailHomeLAPSalariedField",
  shouldExclude.shouldShowRetailHomeLAPSalariedField
);
registerFn(
  "shouldShowRetailHomeEmployementField",
  shouldExclude.showRetailHomeEmployementField
);
registerFn(
  "shouldShowRetailHomeLAPEmployementField",
  shouldExclude.showRetailHomeLAPEmployementField
);

registerFn("getBankListForLeadDocuments", LOSSDK.getBankListForLeadDocuments);

registerFn("deleteFormArrayFieldData", LOSSDK.deleteFormArrayFieldData);
registerFn("getProductTypeForProductName", LOSSDK.getProductTypeForProductName);
registerFn("getManagementPersonnel", LOSSDK.getManagementPersonnel);
registerFn(
  "shouldExcludeExternalAPIManagementDetails",
  shouldExclude.externalAPIManagementDetails
);
registerFn("retailCalculateEligibleEMI", retail.eligibleEMI);
registerFn(
  "retailCalculateLoanAmountBasedOnFOIR",
  retail.loanAmountBasedOnFOIR
);
registerFn("retailCalculateLTV", retail.calculateLTV);
registerFn("retailCalculateLoanAmountBasedOnLTV", retail.loanAmountBasedOnLTV);
registerFn(
  "retailCalculateLoanAmountBasedOnFOIRLTV",
  retail.loanAmountBasedOnFOIRLTV
);
registerFn(
  "retailCalculateEligibileLoanAmountDifference",
  retail.eligibileLoanAmountDifference
);
registerFn("retailSetEligibleLoanAmount", retail.setEligibleLoanAmount);
