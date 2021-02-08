import { shouldExclude } from "./los";
import { singletonFunctionRegisrationFactory } from "components/utils";
const { registerFn } = singletonFunctionRegisrationFactory;

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
