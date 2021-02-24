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

export const getcoApplicantLocationDtl = async (fieldData) => {
  if (fieldData.value === "") {
    return {
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
  } else {
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
  }
};

export const getSiteLocationDtl = async (fieldData) => {
  if (fieldData.value === "") {
    return {
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
  } else {
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
  }
};
