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
