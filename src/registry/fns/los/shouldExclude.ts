export const generalDetailNatureofFacilityProposed = (_, dependentValues) => {
  if (dependentValues["natureOfFacilityDetails.facilityType"]?.value === "02") {
    return false;
  }
  return true;
};

export const bankDetailNatureofFacilityPresent = (_, dependentValues) => {
  if (
    dependentValues["bankDetails.accoutType"]?.value === "03" ||
    dependentValues["bankDetails.accoutType"]?.value === "04" ||
    dependentValues["bankDetails.accoutType"]?.value === "05"
  ) {
    return false;
  }
  return true;
};

export const bankDetailBankingArrangements = (_, dependentValues) => {
  if (
    dependentValues["bankDetails.accoutType"]?.value === "01" ||
    dependentValues["bankDetails.accoutType"]?.value === "02"
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
