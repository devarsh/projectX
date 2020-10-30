import { MetaDataType } from "components/dyanmicForm/types";
import { getPropertyCity, getPincode, getMiscVal, getBankList } from "meta/fns";
import { trim } from "lodash";

export const selfEmpBusQueMetaData: MetaDataType = {
  form: {
    name: "questions1-1",
    label: "Step 1",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    navigation: {
      nextPage: "/",
    },
    render: {
      ordering: "auto",
      renderType: "stepper",
      groups: ["Step 1", "Step 2"],
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
    //Step 1
    {
      render: {
        componentType: "inputMask",
        group: 0,
      },
      name: "panNumber",
      type: "text",
      label: "Pan Card Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Pan Card Number is required"] },
          {
            name: "matches",
            params: [
              /([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/,
              "Please enter valid Pan Card Number",
            ],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      MaskProps: {
        mask: /^\w+$/,
        prepare: function (str) {
          return str.toUpperCase();
        },
        lazy: true,
      },
    },
    {
      render: {
        componentType: "inputMask",
        group: 0,
      },
      name: "aadharNumber",
      type: "text",
      label: "Aadhar Card Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Aadhar Card Number is required"] },
          {
            name: "matches",
            params: [
              /^\d{4}\d{4}\d{4}$/,
              "Please enter valid Aadhar Card Number",
            ],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      MaskProps: {
        mask: "0000` 0000` 0000",
        lazy: true,
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "proprtyCity",
      label: "Property City",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getPropertyCity,
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Property City is Required";
        }
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "proprtyType",
      label: "Type of Property",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("PROPERTY_TYPE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Type of Property is Required";
        }
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "marketValueofProperty",
      type: "text",
      label: "Market value of Property",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["Market value of Property is required"],
          },
          {
            name: "required",
            params: ["Market value of Property is required"],
          },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        maxLength: 13,
        decimalScale: 0,
      },
      validationRun: "onChange",
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "yearsOfExperience",
      label: "No. of Years of Experience",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("PROF_YEARS"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "No. of Years of Experience is Required";
        }
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "businessNature",
      label: "Nature of Business",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("BUSINESS_NATURE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Nature of Business is Required";
        }
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "industryType",
      label: "Type of Industry",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("INDUSTRY_TYPE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Type of Industry is Required";
        }
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "monthlyEmiPay",
      type: "text",
      label: "Total EMI you pay Currently Monthly",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["Total EMI you pay Currently Monthly is required"],
          },
          {
            name: "required",
            params: ["Total EMI you pay Currently Monthly is required"],
          },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        maxLength: 13,
        decimalScale: 0,
      },
      validationRun: "onChange",
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "annualSalary",
      type: "text",
      label: "Your Annual Net Income",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Your Annual Net Income is required"] },
          { name: "required", params: ["Your Annual Net Income is required"] },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        maxLength: 13,
        decimalScale: 0,
      },
      validationRun: "onChange",
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "Depreciation",
      type: "text",
      label: "Any Add Back Like Depreciation",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        maxLength: 13,
        decimalScale: 0,
      },
      validationRun: "onChange",
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "otherSourceOfIncome",
      label: "Any Other Source of Income",
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("INCOME_SOURCE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Any Other Source of Income is Required.";
        }
      },
    },

    //Step 2
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "firmType",
      label: "Type of Firm",
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("FIRM_TYPE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Type of Firm is Required.";
        }
      },
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "businessAddress",
      type: "text",
      label: "Address of Business",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Address of Business is required"] },
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
        componentType: "textField",
        group: 1,
      },
      name: "Proflandmark",
      type: "text",
      label: "Landmark",
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
              location: { options: codes.options, others: codes.others },
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
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      name: "location",
      label: "Location",
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
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      name: "city",
      label: "City",
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      name: "district",
      label: "District",
      isReadOnly: () => true,
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      name: "state",
      label: "State",
      isReadOnly: () => true,
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      name: "country",
      label: "Country",
      isReadOnly: () => true,
    },

    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "presentResidentialStatus",
      label: "Present Residential Status",
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("RESI_STATUS"),
      runPostValidationHookAlways: true,
    },

    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "existingLoanFrom",
      label: "Existing Loan From",
      defaultValue: "X",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getBankList,
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Existing Loan From is Required";
        }
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      name: "LoanOutstandingAmount",
      type: "text",
      label: "Current Loan Outstanding",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["Current Loan Outstanding is required"],
          },
          {
            name: "required",
            params: ["Current Loan Outstanding is required"],
          },
        ],
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
      name: "intRate",
      type: "text",
      label: "Rate of Interest on existing Loan",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["Rate of Interest on existing Loan is required"],
          },
          {
            name: "required",
            params: ["Rate of Interest on existing Loan is required"],
          },
        ],
      },
      FormatProps: {
        suffix: "%",
        decimalScale: 2,
        format: "##.##%",
        fixedDecimalScale: true,
        allowNegative: false,
        allowLeadingZeros: false,
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
      name: "emiofexistingloan",
      type: "text",
      label: "EMI of Existing Loan",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["EMI of Existing Loan is required"],
          },
          {
            name: "required",
            params: ["EMI of Existing Loan is required"],
          },
        ],
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
        componentType: "select",
        group: 1,
      },
      name: "offeredByRBI",
      label: "Availed Moratorium offered by RBI",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select option", value: "X" },
              { label: "Yes", value: "Y" },
              { label: "No", value: "N" },
            ]);
          }, 1000);
        });
      },
    },
  ],
};
