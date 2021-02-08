export const becomePartner = (_, dependentValues) => {
  if (dependentValues?.partner_type?.value === "C") {
    return false;
  }
  return true;
};
export const becomePartnerIndividual = (_, dependentValues) => {
  if (dependentValues?.partner_type?.value === "I") {
    return false;
  }
  return true;
};
export const becomePartnerNominee = (_, dependentValues) => {
  if (
    dependentValues?.nominee_flag?.value === "Y" &&
    dependentValues?.partner_type?.value === "I"
  ) {
    return false;
  }
  return true;
};

export const generalDetailNatureofFacilityProposed = (_, dependentValues) => {
  if (
    dependentValues["natureOfFacilityDetails.natureFacilityType"].value === "01"
  ) {
    return false;
  }
  return true;
};

export const generalDetailNatureofFacilityPresent = (_, dependentValues) => {
  if (
    dependentValues["natureOfFacilityDetails.natureFacilityType"].value === "02"
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
    dependentValues["collateralDetails.collateralSecurityType"].value ===
      "01" ||
    dependentValues["collateralDetails.collateralSecurityType"].value === "02"
  ) {
    return false;
  }
  return true;
};

export const collateralSecurity = (_, dependentValues) => {
  if (
    dependentValues["collateralDetails.collateralSecurityType"].value === "02"
  ) {
    return false;
  }
  return true;
};

export const collateralPersonalGuarantee = (_, dependentValues) => {
  if (
    dependentValues["collateralDetails.collateralSecurityType"].value === "03"
  ) {
    return false;
  }
  return true;
};
