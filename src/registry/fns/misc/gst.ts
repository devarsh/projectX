const GSTAPI = () => {
  const getCompanyName = (getCompanyName) => async (fieldData) => {
    let codes = await getCompanyName(fieldData.value, 10);
    return {
      companyName: {
        value: codes,
      },
    };
  };
  return {
    getCompanyName,
  };
};

export const GST = GSTAPI();
