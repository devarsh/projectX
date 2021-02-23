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
