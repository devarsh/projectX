export const getGSTCompanyNameDtl = (getGSTCompanyName) => async (
  fieldData,
  formState
) => {
  let codes = await getGSTCompanyName(fieldData, formState);
  return {
    companyName: {
      value: codes,
    },
  };
};

export const validateSamePanNumber = (validatePanNumber) => async (
  currentField,
  dependentFields,
  formState
) => {
  if (currentField.value == dependentFields.firmPanNumber.value) {
    return "Pan card No. could not be the same as Firm Pan card No.";
  }
  return validatePanNumber(currentField, dependentFields, formState);
};
