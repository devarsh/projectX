import { shouldExclude, LOSSDK } from "./los";

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
registerFn("deleteFormArrayFieldData", LOSSDK.deleteFormArrayFieldData);

registerFn("getBankListForLeadDocuments", LOSSDK.getBankListForLeadDocuments);
registerFn("getLeadSubStageCode", LOSSDK.getLeadSubStageCode);
registerFn("getLeadEmploymentType", LOSSDK.getLeadEmploymentType);
registerFn("getProductTypeForProductName", LOSSDK.getProductTypeForProductName);
registerFn("getMinLTVForProductName", LOSSDK.getMinLTVForProductName);
registerFn("getMaxLTVForProductName", LOSSDK.getMaxLTVForProductName);

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
