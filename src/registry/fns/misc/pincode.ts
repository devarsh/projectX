//copy of locationDtl method which will be deleted after fix the issue of pincode
export const postValidationSetPincodeDtl = async () => {
  return {
    location: {
      value: "",
    },
    city: {
      value: "",
    },
    state: {
      value: "",
    },
    district: {
      value: "",
    },
    country: {
      value: "",
    },
  };
};
export const postValidationSetLocationDtl = async (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    city: {
      value: fieldValues?.city,
    },
    state: {
      value: fieldValues?.state,
    },
    district: {
      value: fieldValues?.district,
    },
    country: {
      value: fieldValues?.country,
    },
  };
};

export const postValidationSetCoApplicantPincodeDtl = async () => {
  return {
    coApplicantLocation: {
      value: "",
    },
    coApplicantCity: {
      value: "",
    },
    coApplicantState: {
      value: "",
    },
    coApplicantDistrict: {
      value: "",
    },
    coApplicantCountry: {
      value: "",
    },
  };
};
export const postValidationSetCoApplicantLocationDtl = async (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    coApplicantCity: {
      value: fieldValues?.city,
    },
    coApplicantState: {
      value: fieldValues?.state,
    },
    coApplicantDistrict: {
      value: fieldValues?.district,
    },
    coApplicantCountry: {
      value: fieldValues?.country,
    },
  };
};

export const postValidationSetSitePincodeDtl = async (fieldData) => {
  return {
    siteLocation: {
      value: "",
    },
    siteCity: {
      value: "",
    },
    siteState: {
      value: "",
    },
    siteDistrict: {
      value: "",
    },
    siteCountry: {
      value: "",
    },
  };
};
export const postValidationSetSiteLocationDtl = async (fieldData) => {
  const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
  return {
    siteCity: {
      value: fieldValues?.city,
    },
    siteState: {
      value: fieldValues?.state,
    },
    siteDistrict: {
      value: fieldValues?.district,
    },
    siteCountry: {
      value: fieldValues?.country,
    },
  };
};
