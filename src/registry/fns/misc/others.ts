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

export const getYesOrNoOptions = () => {
  return new Promise((res) => {
    res([
      { label: "Select option", value: "0" },
      { label: "Yes", value: "Y" },
      { label: "No", value: "N" },
    ]);
  });
};

export const getMonthlyEmiPayValidateValue = async (fieldData) => {
  if (
    fieldData.value === "X" ||
    fieldData.value === false ||
    fieldData.value === "" ||
    fieldData.value === null
  ) {
    return "This field is required";
  } else {
  }
};

export const getValidateValue = async (fieldData) => {
  if (
    fieldData.value === "X" ||
    fieldData.value === "" ||
    fieldData.value === "0" ||
    fieldData.value === false ||
    fieldData.value === null ||
    fieldData.value === "00"
  ) {
    return "This field is required";
  } else {
  }
};
