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
  if (dependentValues["natureFacility.loanType"].value === "01") {
    return false;
  }
  return true;
};

export const generalDetailNatureofFacilityPresent = (_, dependentValues) => {
  if (dependentValues["natureFacility.loanType"].value === "02") {
    return false;
  }
  return true;
};
