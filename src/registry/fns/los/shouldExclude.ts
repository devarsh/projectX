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
export const showSMELAPSubProductTypeField = (_, dependentValues) => {
  if (dependentValues["productId"]?.value === "12300009") {
    return false;
  }
  return true;
};

export const showInfraSubProduct2TypeField = (_, dependentValues) => {
  if (
    dependentValues?.["subProduct1"]?.value === "123400021" ||
    dependentValues?.["subProduct1"]?.value === "123400022" ||
    dependentValues?.["subProduct1"]?.value === "123400026" ||
    dependentValues?.["subProduct1"]?.value === "123400027"
  ) {
    return false;
  }
  return true;
};

export const shouldShowRetailHomeLAPSalariedField = (_, dependentValues) => {
  if (dependentValues?.["employeeCode"]?.value === "02") {
    return false;
  }
  return true;
};

export const showRetailHomeEmployementField = (_, dependentValues) => {
  if (dependentValues?.["employeeCode"]?.value !== "02") {
    return false;
  }
  return true;
};

export const showRetailHomeLAPEmployementField = (_, dependentValues) => {
  if (
    dependentValues?.["employeeCode"]?.value !== "02" &&
    dependentValues?.["productId"]?.value === "12300002"
  ) {
    return false;
  }
  return true;
};

export const externalAPIManagementDetails = (_, dependentValues) => {
  if (dependentValues?.entityType?.value === "L") {
    return true;
  }
  return false;
};

//should exclude for external Bank API

export const sanctionLimitVariableAmountDocumentUploadBankDetails = async (
  _,
  dependentFields
) => {
  if (
    dependentFields["bankFacility"].value === "Overdraft" &&
    dependentFields["sanctionLimitFixed"].value === "N"
  ) {
    return false;
  } else {
    return true;
  }
};

export const sanctionLimitOptionsExternalAPIBank = async (
  _,
  dependentFields
) => {
  if (
    dependentFields["bankFacility"].value === "Overdraft" ||
    dependentFields["bankFacility"].value === "Cash Credit"
  ) {
    return false;
  }
  return true;
};

export const sanctionLimitFixedAmountExternalAPIBank = async (
  _,
  dependentFields
) => {
  if (
    dependentFields["sanctionLimitType"].value === "fixed" &&
    (dependentFields["bankFacility"].value === "Overdraft" ||
      dependentFields["bankFacility"].value === "Cash Credit")
  ) {
    return false;
  }
  return true;
};

export const sanctionLimitVariableAmountExternalAPIBank = async (
  _,
  dependentFields
) => {
  if (
    dependentFields["sanctionLimitType"].value === "variable" &&
    (dependentFields["bankFacility"].value === "Overdraft" ||
      dependentFields["bankFacility"].value === "Cash Credit")
  ) {
    return false;
  }
  return true;
};

export const drawingPowerVariableAmountExternalAPIBank = async (
  _,
  dependentFields
) => {
  if (dependentFields["bankFacility"].value === "Cash Credit") {
    return false;
  }
  return true;
};

export const showOtherIncomeAmountField = async (_, dependentFields) => {
  if (dependentFields["incomeDetails.sourceIncomeOther"].value !== "00") {
    return false;
  }
  return true;
};

export const showRetailOtherIncomeAmountField = async (_, dependentFields) => {
  if (
    dependentFields["returnFilingDetails.otherIncome"].value === "00" ||
    dependentFields["returnFilingDetails.otherIncome"].value === "06"
  ) {
    return true;
  }
  return false;
};

export const showRetailOtherIncomeTypeField = async (_, dependentFields) => {
  if (dependentFields["returnFilingDetails.otherIncome"].value !== "05") {
    return true;
  }
  return false;
};

export const showReraNoField = async (_, dependentFields) => {
  if (dependentFields["reraReceived"].value === "Y") {
    return false;
  }
  return true;
};

export const showCostOfProject = async (_, dependentFields) => {
  if (
    dependentFields["projectParticularDetails.particularType"].value === "01"
  ) {
    return false;
  }
  return true;
};

export const showMeansOfFinance = async (_, dependentFields) => {
  if (
    dependentFields["projectParticularDetails.particularType"].value === "02"
  ) {
    return false;
  }
  return true;
};

export const showRetailSalaryOtherIncomeAmountField = async (
  _,
  dependentFields
) => {
  if (
    dependentFields["salaryDetails.otherIncome"].value === "00" ||
    dependentFields["salaryDetails.otherIncome"].value === "06"
  ) {
    return true;
  }
  return false;
};

export const showRetailSalaryOtherIncomeTypeField = async (
  _,
  dependentFields
) => {
  if (dependentFields["salaryDetails.otherIncome"].value !== "05") {
    return true;
  }
  return false;
};

export const showRetailCoApplicantSelEmployeed = async (_, dependentFields) => {
  if (dependentFields["employementType"].value === "01") {
    return false;
  }
  return true;
};

export const showRetailCoApplicantSalaried = async (_, dependentFields) => {
  if (dependentFields["employementType"].value === "02") {
    return false;
  }
  return true;
};

export const showPurposeOfLoanOtherTextfield = async (_, dependentFields) => {
  if (dependentFields["purposeLoan"].value === "04") {
    return false;
  }
  return true;
};

export const showProjectPromoterAndFirmNameField = async (
  _,
  dependentFields
) => {
  if (dependentFields["landDetails"].value === "O") {
    return false;
  }
  return true;
};
