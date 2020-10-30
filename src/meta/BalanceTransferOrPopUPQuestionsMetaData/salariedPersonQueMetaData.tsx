import { trim } from "lodash";
import { MetaDataType } from "components/dyanmicForm/types";
import { getPropertyCity, getPincode, getMiscVal, getBankList } from "meta/fns";

const salariedPersonQueMetaData: MetaDataType = {
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
      groups: ["Step 1", "Step 2", "Step 3"],
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
      }
    },
  },

  fields: [
    {
      render: {
        componentType: "inputMask",
        group: 0,
      },
      name: "panNumber",
      type: "text",
      label: "Pan Card Number",
      placeholder: "Pan Card Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Pan Number is required"] },
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
      placeholder: "Aadhar Card Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Aadhar Number is required"] },
          {
            name: "matches",
            params: [/^\d{4}\d{4}\d{4}$/, "Please enter valid Aadhar Number"],
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
      placeholder: "Property City",
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
          return "Propert City is Required";
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
      placeholder: "Type of Property",
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
          return "Type of Property is Required.";
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
      placeholder: "Market value of Property",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["This field is required"] },
          { name: "required", params: ["This field is required"] },
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
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "totalWorkExperiance",
      label: "Your Total Work Experiance",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("EXPERI_YEARS"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Total Work Experiance is Required.";
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
      label: "Total Monthly Emi Pay",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["This field is required"] },
          { name: "required", params: ["This field is required"] },
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
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "monthlysalary",
      type: "text",
      label: "Net Monthly Salary",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["This field is required"] },
          { name: "required", params: ["This field is required"] },
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
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Select Any Other Source of Income.";
        }
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
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
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Select Present Residential Status.";
        }
      },
    },

    //Step 2
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
          return "Existing Loan From field is Required.";
        }
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      name: "CurrentLoanOutstanding",
      type: "text",
      label: "Current Loan Outstanding",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["This field is required"] },
          { name: "required", params: ["This field is required"] },
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
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      name: "existingLoanInterest",
      type: "text",
      label: "Rate of Interest on existing Loan",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["This field is required"] },
          { name: "required", params: ["This field is required"] },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        suffix: "%",
        decimalScale: 2,
        format: "##.##%",
        fixedDecimalScale: true,
        allowNegative: false,
        allowLeadingZeros: false,
      },
      validationRun: "onChange",
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      name: "existingLoanEmi",
      type: "text",
      label: "EMI of Existing Loan",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["This field is required"] },
          { name: "required", params: ["This field is required"] },
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
    },

    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "offeredByRBI",
      label: "Availed Moratorium offered by RBI",
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
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Select Availed Moratorium offered by RBI";
        }
      },
    },

    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "coApplicant",
      label: "Do you want to add co-applicant",
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
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Do you want to add co-applicant field is Required.";
        }
      },
    },

    //Co-Applicant
    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "coApplicantfirstName",
      type: "text",
      label: "First Name",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["First Name is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      // dependentFields:["coApplicant"],
      // shouldExclude:(_, dependentValues) => {
      //   if (dependentValues?.coApplicant?.value === "Y") {
      //     return false;
      //   }
      //   return true;
      // },
    },
    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "coApplicantmiddleName",
      label: "Middle Name",
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
        group: 2,
      },
      name: "coApplicantlastName",
      label: "Last Name",
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
        group: 2,
      },
      name: "coApplicantgender",
      label: "Gender",
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("GENDER"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Select Gender.";
        }
      },
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "coApplicantmobileNo",
      type: "text",
      label: "Mobile No",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Mobile is required"] },
          {
            name: "matches",
            params: [
              /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/,
              "Please enter valid Mobile Number",
            ],
          },
        ],
      },
      StartAdornment: "+91",
    },
    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "coApplicantemail",
      type: "text",
      label: "Email",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Email is required"] },
          {
            name: "matches",
            params: [/^[^@]+@[^@]+\.[^@]+$/, "Please enter valid Email"],
          },
        ],
      },
    },
    {
      render: {
        componentType: "numberFormat",
        group: 2,
      },
      name: "coApplicantpincode",
      label: "Residence Pincode",
      required: true,
      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
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
    },

    {
      render: {
        componentType: "select",
        group: 2,
      },
      name: "location",
      label: "Location",
      required: true,
      runPostValidationHookAlways: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
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
        group: 2,
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
        group: 2,
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
        group: 2,
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
        group: 2,
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
        componentType: "numberFormat",
        group: 2,
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      name: "coApplicantnetIncome",
      type: "text",
      label: "Net Income",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Enter your income"] },
          { name: "required", params: ["Enter your income"] },
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
    },
  ],
};

export default salariedPersonQueMetaData;
