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

export const getPincodeDtlEdit = (getPincode) => async (fieldData) => {
  if (fieldData.value.length === 6) {
    let codes = await getPincode(fieldData.value);
    return {
      location: {
        options: codes.options,
        others: codes.others,
        value: "DEFAULT_VALUE",
      },
    };
  } else if (fieldData.value === "") {
    return {
      location: {
        options: [],
        value: "DEFAULT_VALUE",
      },
      city: {
        value: "DEFAULT_VALUE",
      },
      state: {
        value: "DEFAULT_VALUE",
      },
      district: {
        value: "DEFAULT_VALUE",
      },
      country: {
        value: "DEFAULT_VALUE",
      },
    };
  }
};

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

export const getLocationDtlEdit = async (fieldData) => {
  if (fieldData.value === "") {
    return {
      city: {
        value: "DEFAULT_VALUE",
      },
      state: {
        value: "DEFAULT_VALUE",
      },
      district: {
        value: "DEFAULT_VALUE",
      },
      country: {
        value: "DEFAULT_VALUE",
      },
    };
  } else {
    const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
    return {
      city: {
        value: fieldValues?.city ?? "DEFAULT_VALUE",
      },
      state: {
        value: fieldValues?.state ?? "DEFAULT_VALUE",
      },
      district: {
        value: fieldValues?.district ?? "DEFAULT_VALUE",
      },
      country: {
        value: fieldValues?.country ?? "DEFAULT_VALUE",
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

export const getcoApplicantPincodeDtlEdit = (getPincode) => async (
  fieldData
) => {
  if (fieldData.value.length === 6) {
    let codes = await getPincode(fieldData.value);
    return {
      coApplicantLocation: {
        options: codes.options,
        others: codes.others,
        value: "DEFAULT_VALUE",
      },
      coApplicantCity: {
        value: "DEFAULT_VALUE",
      },
      coApplicantState: {
        value: "DEFAULT_VALUE",
      },
      coApplicantDistrict: {
        value: "DEFAULT_VALUE",
      },
      coApplicantCountry: {
        value: "DEFAULT_VALUE",
      },
    };
  } else if (fieldData.value === "") {
    return {
      coApplicantLocation: {
        options: [],
        value: "DEFAULT_VALUE",
      },
      coApplicantCity: {
        value: "DEFAULT_VALUE",
      },
      coApplicantState: {
        value: "DEFAULT_VALUE",
      },
      coApplicantDistrict: {
        value: "DEFAULT_VALUE",
      },
      coApplicantCountry: {
        value: "DEFAULT_VALUE",
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

export const getcoApplicantLocationDtlEdit = async (fieldData) => {
  if (fieldData.value === "") {
    return {
      coApplicantCity: {
        value: "DEFAULT_VALUE",
      },
      coApplicantState: {
        value: "DEFAULT_VALUE",
      },
      coApplicantDistrict: {
        value: "DEFAULT_VALUE",
      },
      coApplicantCountry: {
        value: "DEFAULT_VALUE",
      },
    };
  } else {
    const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
    return {
      coApplicantCity: {
        value: fieldValues?.city ?? "DEFAULT_VALUE",
      },
      coApplicantState: {
        value: fieldValues?.state ?? "DEFAULT_VALUE",
      },
      coApplicantDistrict: {
        value: fieldValues?.district ?? "DEFAULT_VALUE",
      },
      coApplicantCountry: {
        value: fieldValues?.country ?? "DEFAULT_VALUE",
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

export const getSitePincodeDtlEdit = (getPincode) => async (fieldData) => {
  if (fieldData.value.length === 6) {
    let codes = await getPincode(fieldData.value);
    return {
      siteLocation: {
        options: codes.options,
        others: codes.others,
        value: "DEFAULT_VALUE",
      },
      siteCity: {
        value: "DEFAULT_VALUE",
      },
      siteState: {
        value: "DEFAULT_VALUE",
      },
      siteDistrict: {
        value: "DEFAULT_VALUE",
      },
      siteCountry: {
        value: "DEFAULT_VALUE",
      },
    };
  } else if (fieldData.value === "") {
    return {
      siteLocation: {
        options: [],
        value: "DEFAULT_VALUE",
      },
      siteCity: {
        value: "DEFAULT_VALUE",
      },
      siteState: {
        value: "DEFAULT_VALUE",
      },
      siteDistrict: {
        value: "DEFAULT_VALUE",
      },
      siteCountry: {
        value: "DEFAULT_VALUE",
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

export const getSiteLocationDtlEdit = async (fieldData) => {
  if (fieldData.value === "") {
    return {
      siteCity: {
        value: "DEFAULT_VALUE",
      },
      siteState: {
        value: "DEFAULT_VALUE",
      },
      siteDistrict: {
        value: "DEFAULT_VALUE",
      },
      siteCountry: {
        value: "DEFAULT_VALUE",
      },
    };
  } else {
    const fieldValues = fieldData.incomingMessage?.others[fieldData.value];
    return {
      siteCity: {
        value: fieldValues?.city ?? "DEFAULT_VALUE",
      },
      siteState: {
        value: fieldValues?.state ?? "DEFAULT_VALUE",
      },
      siteDistrict: {
        value: fieldValues?.district ?? "DEFAULT_VALUE",
      },
      siteCountry: {
        value: fieldValues?.country ?? "DEFAULT_VALUE",
      },
    };
  }
};
