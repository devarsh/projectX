export const AutoFillGender = (field) => {
  if (typeof field.value === "string") {
    field.value = field.value.trim();
  }
  return new Promise((res) => {
    if (field.value === "00") {
      res({
        gender: {
          value: "00",
        },
        firstName: {
          value: "",
        },
      });
    } else if (field.value === "01" || field.value === "02") {
      res({
        gender: {
          value: "01",
        },
      });
    } else {
      res({
        gender: {
          value: "00",
        },
      });
    }
  });
};

export const getYesOrNoOptions = () => {
  return new Promise((res) => {
    res([
      { label: "Select option", value: "0" },
      { label: "Yes", value: "Y" },
      { label: "No", value: "N" },
    ]);
  });
};

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
        value: fieldValues.city,
      },
      state: {
        value: fieldValues.state,
      },
      district: {
        value: fieldValues.district,
      },
      country: {
        value: fieldValues.country,
      },
    };
  }
};

export const getValidateValue = async (fieldData) => {
  if (
    fieldData.value === "X" ||
    fieldData.value === "" ||
    fieldData.value === "0" ||
    fieldData.value === false ||
    fieldData.value === "" ||
    fieldData.value === "00"
  ) {
    return "This field is required";
  } else {
  }
};

export const getGenderValue = (field) => {
  if (typeof field === "string") {
    field = field.trim();
  }
  return new Promise((res) => {
    if (field.value === "01") {
      res({
        gender: {
          value: "01",
        },
        firstName: {
          value: "",
        },
      });
    } else if (field.value === "02" || field.value === "03") {
      res({
        gender: {
          value: "02",
        },
      });
    } else {
      res({
        gender: {
          value: "00",
        },
      });
    }
  });
};
