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

export const getGenderValue = async (field) => {
  console.log(field.value);
  if (field.value === "00") {
    return {
      gender: {
        value: "00",
      },
    };
  }
  if (field.value === "01") {
    return {
      gender: {
        value: "01",
      },
    };
  } else if (field.value === "02" || field.value === "03") {
    return {
      gender: {
        value: "02",
      },
    };
  } else {
    return {
      gender: {
        value: "00",
      },
    };
  }
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

//dropdown value - dynamic form
export const getSubProductDtl = (getProductType) => async (fieldData) => {
  if (fieldData.value.length !== 0) {
    try {
      let codes = await getProductType(null, { formCode: fieldData.value });
      return {
        subProductType: {
          options: codes,
          value: "00",
        },
      };
    } catch (e) {
      return {
        subProductType: {
          options: [],
          value: "",
        },
      };
    }
  } else if (fieldData.value === "") {
    return {
      subProductType: {
        options: [],
        value: "",
      },
    };
  }
};
