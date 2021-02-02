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
