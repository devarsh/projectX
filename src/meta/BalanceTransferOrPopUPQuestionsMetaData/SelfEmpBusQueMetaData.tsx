import { trim } from "lodash";
import { MetaDataType } from "components/dyanmicForm/types";
import { getPropertyCity, getPincode, getMiscVal, getBankList } from "meta/fns";

export const SelfEmpBusQueMetaData: MetaDataType = {
  form: {
    name: "questions1-1",
    label: "Questionnaire",
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
      },
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
          return "Propert City is required.";
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
          return "Type of Property is required.";
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
      placeholder: "No. of Years of Experience",
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
          return "No. of Years of Experience is required.";
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
          return "Nature of Business is required.";
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
          return "Type of Industry is required";
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
      placeholder: "Total EMI you pay Currently Monthly",
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
      name: "annualSalary",
      type: "text",
      label: "Your Annual Net Income",
      placeholder: "Your Annual Net Income",
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
      name: "Depreciation",
      type: "text",
      label: "Any Add Back Like Depreciation",
      placeholder: "Any Add Back Like Depreciation",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      // schemaValidation: {
      //   type: "string",
      //   rules: [
      //     { name: "typeError", params: ["This field is required"] },
      //     { name: "required", params: ["This field is required"] },
      //   ],
      // },
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
      placeholder: "Any Other Source of Income",
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
          return "Select Any Other Source of Income.";
        }
      },
    },

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
          return "Select Type of Firm.";
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
      placeholder: "Address of Business",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
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
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Select Present Residential Status.";
        }
      },
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
          return "Existing Loan From is required.";
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
      placeholder: "Current Loan Outstanding",
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
      placeholder: "Rate of Interest on existing Loan",
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
      placeholder: "EMI of Existing Loan",
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
          return "Select Availed Moratorium offered by RBI.";
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
              { label: "Select option", value: "0" },
              { label: "Yes", value: "Y" },
              { label: "No", value: "N" },
            ]);
          }, 1000);
        });
      },
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Do you want to add co-applicant is required.";
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
      placeholder: "First Name",
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "coApplicantmiddleName",
      label: "Middle Name",
      placeholder: "Middle Name",
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "coApplicantlastName",
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
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
        componentType: "select",
        group: 2,
      },
      name: "coApplicantRelatioship",
      label: "Relationship",
      placeholder: "Relationship",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
      options: getMiscVal("RELATIONSHIP"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "X") {
          return "Relationship is required";
        }
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 2,
      },
      name: "coApplicantmobileNo",
      type: "text",
      label: "Mobile No",
      placeholder: "Mobile No",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
      FormatProps: {
        format: "##########",
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Mobile No is required."] },
          { name: "min", params: [10, "Mobile No should be 10 digit."] },
          { name: "max", params: [10, "Mobile No should be 10 digit."] },
          {
            name: "matches",
            params: [/^\d{10}/, "Please enter valid Mobile No."],
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
      placeholder: "Email",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
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
      placeholder: "Residence Pincode",
      required: true,
      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Residence Pincode is required."] },
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
      name: "city",
      label: "City",
      placeholder: "City",
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
      name: "district",
      label: "District",
      placeholder: "District",
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
      name: "state",
      label: "State",
      placeholder: "State",
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
      name: "country",
      label: "Country",
      placeholder: "Country",
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
      dependentFields: ["coApplicant"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.coApplicant?.value === "Y") {
          return false;
        }
        return true;
      },
      name: "coApplicantnetIncome",
      type: "text",
      label: "Net Income",
      placeholder: "Net Income",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Net Income is required."] },
          { name: "required", params: ["Net Income is required."] },
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
