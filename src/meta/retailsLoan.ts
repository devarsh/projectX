import { MetaDataType } from "components/dyanmicForm/types";
import { getProductType, getMiscVal, getPincode } from "./fns";
import { trim } from "lodash";

const metaData: MetaDataType = {
  form: {
    name: "12300001",
    label: "Retail Home Loan",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    navigation: {
      nextPage: "/",
    },
    render: {
      ordering: "auto",
      renderType: "stepper",
      groups: ["Personal Details", "Contact Details"],
      gridConfig: {
        item: {
          xs: 12,
          sm: 4,
          md: 4,
        },
        container: {
          direction: "row",
          spacing: 2,
        },
      },
    },
    componentProps: {
      textField: {
        fullWidth: true,
        CircularProgressProps: {
          size: 20,
        },
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
      inputMask: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "product_type",
      label: "Product Type",
      placeholder: "Product Type",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: getProductType,
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Product Type is Required";
        }
      },
    },

    {
      render: {
        componentType: "spacer",
        group: 0,
      },
      name: "spacer",
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      HiddenProps: {
        smDown: true,
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "salutation",
      label: "Salutation",
      placeholder: "Salutation",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      multiple: true,
      showCheckbox: true,
      options: getMiscVal("SALUTATION_TYPE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Salutation is Required";
        }
      },
      postValidationSetCrossFieldValues: (field) => {
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
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "firstName",
      type: "text",
      label: "First Name[As Per PAN Card]",
      required: true,
      placeholder: "First Name[As Per PAN Card]",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["First Name is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "middleName",
      label: "Middle Name",
      placeholder: "Middle Name",
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Last Name is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "gender",
      label: "Gender",
      placeholder: "Gender",
      required: true,
      type: "text",
      defaultValue: "X",
      isReadOnly: () => true,
      options: getMiscVal("GENDER"),
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Gender is Required";
        }
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "datePicker",
        group: 0,
      },
      name: "dob",
      label: "Date Of Birth",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      schemaValidation: {
        type: "date",
        rules: [
          { name: "required", params: ["Date of Birth is required"] },
          { name: "typeError", params: ["Date of Birth is required"] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validationRun: "onChange",
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "loanAmount",
      type: "text",
      label: "Your Desired Loan Amount",
      placeholder: "Your Desired Loan Amount",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Loan Amount is required"] }],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        maxLength: 13,
      },
      validationRun: "onChange",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      name: "mobileNo",
      type: "text",
      label: "Mobile No",
      placeholder: "Mobile No",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Mobile No is required"] },
          { name: "min", params: [10, "Mobile No should be 10 digit."] },
          { name: "max", params: [10, "Mobile No should be 10 digit."] },
          {
            name: "matches",
            params: [/^\d{10}/, "Please enter valid Mobile No."],
          },
        ],
      },
      FormatProps: {
        format: "##########",
      },
      StartAdornment: "+91",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "email",
      type: "text",
      label: "Email",
      placeholder: "Email",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Email is required"] },
          { name: "email", params: ["Please enter Email ID."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "employementStatus",
      label: "How Are You Currently Employed",
      placeholder: "How Are You Currently Employed",
      required: true,
      defaultValue: "X",
      options: getMiscVal("RETAIL_EMPL"),
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "How Are You Currently Employed is Required";
        }
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "landmark",
      type: "text",
      label: "Landmark",
      placeholder: "Landmark",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Landmark is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      name: "pincode",
      label: "Residence Pincode",
      placeholder: "Residence Pincode",
      required: true,
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Residence Pincode is required"] },
          { name: "min", params: [6, "Residence Pincode should be 6 digit."] },
          { name: "max", params: [6, "Residence Pincode should be 6 digit."] },
          {
            name: "matches",
            params: [/^\d{6}/, "Please enter valid Pincode."],
          },
        ],
      },
      FormatProps: {
        format: "######",
      },
      runPostValidationHookAlways: true,
      postValidationSetCrossFieldValues: async (fieldData) => {
        if (fieldData.value === "") {
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
        } else {
          if (trim(fieldData.value).length === 6) {
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
          }
        }
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "location",
      label: "Location",
      placeholder: "Location",
      required: true,
      runPostValidationHookAlways: true,
      postValidationSetCrossFieldValues: async (fieldData) => {
        if (trim(fieldData.value) === "") {
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
          const fieldValues =
            fieldData.incomingMessage?.others[fieldData.value];
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
      },
      validate: (fieldData) => {
        if (fieldData.value === "") {
          return "Location is Required";
        }
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "city",
      label: "City",
      placeholder: "City",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "district",
      label: "District",
      placeholder: "District",
      isReadOnly: () => true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "state",
      label: "State",
      placeholder: "State",
      isReadOnly: () => true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "country",
      label: "Country",
      placeholder: "Country",
      isReadOnly: () => true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    /*
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "you_are",
      label: "You Are",
      required: true,
      defaultValue: "X",
      options: getMiscVal("YOU_ARE"),
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "You Are Field is Required";
        }
      },
    },*/

    {
      render: {
        componentType: "checkbox",
        group: 1,
      },
      name: "agreed",
      required: true,
      label:
        "I have read and agreed to the Terms of Use and hereby appoint Ratnaafin as my authorised representative to receive my credit information from Cibil/ Equifax/ Experian/ Highmark (bureau).",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      validate: (fieldData) => {
        if (fieldData.value === false || fieldData.value === "") {
          return "Please agreed with Terms and Conditions.";
        }
      },
      validationRun: "onChange",
    },
  ],
};

export default metaData;
