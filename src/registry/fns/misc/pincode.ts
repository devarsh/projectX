export const getPincodeDtl = (getPincode) => async (fieldData) => {
  if (fieldData.value.length === 6) {
    let codes = await getPincode(fieldData.value);
    return {
      location: {
        options: codes.options,
        others: codes.others,
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
  } else if (fieldData.value === "") {
    return {
      location: {
        options: [],
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
  }
};

export const getLocationDtlCopy = async (fieldData) => {
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

//copy of locationDtl method which will be deleted after fix the issue of pincode
export const getLocationDtl = async (fieldData) => {
  if (fieldData.value === "") {
    return {
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
  } else {
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
  }
};

export const getcoApplicantPincodeDtl = (getPincode) => async (fieldData) => {
  if (fieldData.value.length === 6) {
    let codes = await getPincode(fieldData.value);
    return {
      coApplicantLocation: {
        options: codes.options,
        others: codes.others,
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
  } else if (fieldData.value === "") {
    return {
      coApplicantLocation: {
        options: [],
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
  }
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

export const getSitePincodeDtl = (getPincode) => async (fieldData) => {
  if (fieldData.value.length === 6) {
    let codes = await getPincode(fieldData.value);
    return {
      siteLocation: {
        options: codes.options,
        others: codes.others,
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
  } else if (fieldData.value === "") {
    return {
      siteLocation: {
        options: [],
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
