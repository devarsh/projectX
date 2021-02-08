import { CRMSDK, others, shouldExclude } from "./crm";

import { singletonFunctionRegisrationFactory } from "components/utils";

const { registerFn } = singletonFunctionRegisrationFactory;
registerFn("validatePanNumber", CRMSDK.validatePanNumber);
registerFn(
  "getCompanyNameFromGST",
  others.getGSTCompanyNameDtl(CRMSDK.getCompanyNameFromGST)
);
registerFn("shouldExcludeBecomePartner", shouldExclude.becomePartner);
registerFn(
  "shouldExcludeBecomePartnerIndividual",
  shouldExclude.becomePartnerIndividual
);
registerFn(
  "shouldExcludeBecomePartnerNominee",
  shouldExclude.becomePartnerNominee
);
registerFn(
  "validateSamePanNumber",
  others.validateSamePanNumber(CRMSDK.validatePanNumber)
);
registerFn(
  "shouldExcludeGeneralDetailProposed",
  shouldExclude.generalDetailNatureofFacilityProposed
);
registerFn(
  "shouldExcludeGeneralDetailPresent",
  shouldExclude.generalDetailNatureofFacilityPresent
);

registerFn(
  "shouldExcludeGeneralDetailBusinessNature",
  shouldExclude.generalDetailBusinessNature
);

registerFn("shouldExcludeCollateralSecurity", shouldExclude.collateralSecurity);

registerFn(
  "shouldExcludeCollateralPersonalGuarantee",
  shouldExclude.collateralPersonalGuarantee
);

registerFn(
  "shouldExcludeCollateralPrimarySecurity",
  shouldExclude.collateralPrimarySecurity
);
