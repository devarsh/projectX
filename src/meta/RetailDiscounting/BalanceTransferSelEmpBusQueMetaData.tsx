import { Message, ViewArray } from "@material-ui/icons";
import { validate } from "@material-ui/pickers";
import { matches, trim } from "lodash";
import { MetaDataType } from "components/dyanmicForm/types";
import { getPropertyCity, getMiscVal, getPincode, getBankList } from "meta/fns";

export const BalanceTransferSelEmpBusQueMetaData: MetaDataType = {
  form: {
    name: "questionsbalancetransfersel",
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
      //   checkboxGroup: {
      //     fullWidth: true,
      //   },
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
      label: "Pan Card Number ",
      placeholder: "Pan Card Number ",
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
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getPropertyCity,
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
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
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("PROPERTY_TYPE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Property type is required";
        }
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "monthlyRentalIncome",
      type: "text",
      label: "Monthly Rental Income",
      placeholder: "Monthly Rental Income",
      // required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      // schemaValidation: {
      //   type: "string",
      //   rules: [
      //     { name: "typeError", params: ["Enter your monthly income"] },
      //     { name: "required", params: ["Enter your monthly income"] },
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
        componentType: "textField",
        group: 0,
      },
      name: "yearsofleasedeed",
      type: "text",
      label: "No. of years of lease deed",
      placeholder: "No. of years of lease deed",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["Enter years of lease deeed"] }],
      // },
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
      name: "pendingLeasePeriod",
      type: "text",
      label: "Pending Lease Period",
      // required: true,
      // schemaValidation: {
      //   type: "string",
      //   rules: [{ name: "required", params: ["Enter pending lease period"] }],
      // },
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
      name: "loanTypeAvail",
      label: "Type of loan you would like to avail",
      placeholder: "Type of loan you would like to avail",
      multiple: true,
      //   schemaValidation: {
      //     type: "string",
      //     rules: [{ name: "required", params: ["This Field is required"] }],
      //   },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: [
        { label: "Overdraft (OD)", value: "01" },
        { label: "Reducing Overdraft", value: "02" },
        { label: "Term Loan", value: "03" },
      ],
      runPostValidationHookAlways: true,
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "yearsOfExperience",
      label: "No. of Years of Experience",
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("PROF_YEARS"),
      runPostValidationHookAlways: true,
      // validate: (fieldData) => {
      //   if (fieldData.value === "0") {
      //     return "No. of Years of Experience is Required";
      //   }
      // },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "businessNature",
      label: "Nature of Business",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("BUSINESS_NATURE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Nature of Business is Required";
        }
      },
    },
    //step 2
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "industryType",
      label: "Type of Industry",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("INDUSTRY_TYPE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Type of Industry is Required";
        }
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
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
            params: ["Enter your monthly emi paying amount"],
          },
          {
            name: "required",
            params: ["Enter your monthly emi paying amount"],
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
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
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
          { name: "typeError", params: ["Enter annual net Income"] },
          { name: "required", params: ["Enter annual net Income"] },
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
        componentType: "numberFormat",
        group: 1,
      },
      name: "Depreciation",
      type: "text",
      label: "Any Add Back Like Depreciation",
      placeholder: "Any Add Back Like Depreciation",
      // required: true,
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
        group: 1,
      },
      name: "otherSourceOfIncome",
      label: "Any Other Source of Income",
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("INCOME_SOURCE"),
      runPostValidationHookAlways: true,
      // validate: (fieldData) => {
      //   if (fieldData.value === "0") {
      //     return "Select Valid Option";
      //   }
      // },
    },

    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "typeFirm",
      label: "Type of Firm",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Type of Firm is required"] }],
      },
      defaultValue: "xx",
      options: getMiscVal("FIRM_TYPE"),
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Select type of firm";
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
        rules: [{ name: "required", params: ["Enter address of business"] }],
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
        group: 1,
      },
      name: "location",
      label: "Location",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
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
      placeholder: "City",
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
      placeholder: "District",
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
      placeholder: "State",
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
      placeholder: "Country",
      isReadOnly: () => true,
    },

    //step 3
    {
      render: {
        componentType: "select",
        group: 2,
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

    {
      render: {
        componentType: "select",
        group: 2,
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
          return "Existing Loan From field is required.";
        }
      },
    },
    {
      render: {
        componentType: "numberFormat",
        group: 2,
      },
      name: "OutAmount",
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
        group: 2,
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
          { name: "typeError", params: ["Enter your existing loan interest"] },
          { name: "required", params: ["Enter your existing loan interest"] },
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
        group: 2,
      },
      name: "emiamt1",
      type: "text",
      label: "EMI of existing Loan",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["EMI of existing Loan is required"] },
          { name: "required", params: ["EMI of existing Loan is required"] },
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
      name: "offeredByRBI",
      label: "Availed Moratorium offered by RBI",
      defaultValue: "0",
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
      // runPostValidationHookAlways: true,
      // validate: (fieldData) => {
      //   if (fieldData.value === "0") {
      //     return "Propert City is Required";
      //   }
      // },
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "schemeName",
      type: "text",
      label: "Name of scheme",
      placeholder: "Name of scheme",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Name of scheme is required"] }],
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
      name: "registerWithRera",
      label: "Register with RERA",
      required: true,
      defaultValue: "0",
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
          return "Register with rera is required";
        }
      },
    },

    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "reraNo",
      type: "text",
      label: "RERA Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Rera number is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      // dependentFields: ["registerWithRera"],
      // shouldExclude: (_, dependentValues) => {
      //   if (dependentValues?.registerWithRera?.value === "Y") {
      //     return false;
      //   }
      //   return true;
      // },
    },
  ],
};
