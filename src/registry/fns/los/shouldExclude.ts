export const generalDetailNatureofFacilityProposed = (_, dependentValues) => {
  if (dependentValues["natureOfFacilityDetails.facilityType"]?.value === "02") {
    return false;
  }
  return true;
};

export const bankDetailNatureofFacilityPresent = (_, dependentValues) => {
  if (
    dependentValues["bankDetails.accountType"]?.value === "L1" ||
    dependentValues["bankDetails.accountType"]?.value === "L2" ||
    dependentValues["bankDetails.accountType"]?.value === "L3"
  ) {
    return false;
  }
  return true;
};

export const bankDetailBankingArrangements = (_, dependentValues) => {
  if (
    dependentValues["bankDetails.accountType"]?.value === "D1" ||
    dependentValues["bankDetails.accountType"]?.value === "D2"
  ) {
    return false;
  }
  return true;
};

export const generalDetailBusinessNature = (_, dependentValues) => {
  if (dependentValues?.businessNature?.value === "05") {
    return false;
  }
  return true;
};

export const collateralPrimarySecurity = (_, dependentValues) => {
  if (
    dependentValues["collateralSecurityDetails.collateralSecurityType"]
      ?.value === "01" ||
    dependentValues["collateralSecurityDetails.collateralSecurityType"]
      ?.value === "02"
  ) {
    return false;
  }
  return true;
};

export const collateralSecurity = (_, dependentValues) => {
  if (
    dependentValues["collateralSecurityDetails.collateralSecurityType"]
      ?.value === "02"
  ) {
    return false;
  }
  return true;
};

export const collateralPersonalGuarantee = (_, dependentValues) => {
  if (
    dependentValues["collateralSecurityDetails.collateralSecurityType"]
      ?.value === "03"
  ) {
    return false;
  }
  return true;
};

export const projectDetailsTypeCostOfProject = (_, dependentValues) => {
  if (
    dependentValues["projectParticularDetails.particularType"]?.value === "01"
  ) {
    return false;
  }
  return true;
};

export const projectDetailsTypeMeansOFFinance = (_, dependentValues) => {
  if (
    dependentValues["projectParticularDetails.particularType"]?.value === "02"
  ) {
    return false;
  }
  return true;
};

export const mainDetailsdeveloperOrContactor = (_, dependentValues) => {
  if (
    dependentValues["product"]?.value === "123000011" ||
    dependentValues["product"]?.value === "123000012"
  ) {
    return false;
  }
  return true;
};
