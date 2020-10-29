import { MetaDataType } from "components/dyanmicForm/types";
import { getPropertyCity, getProductType, getMiscVal, getPincode } from "./fns";
import { trim, values } from "lodash";

const metaData: MetaDataType = {
  form: {
    name: "infra-questions",
    label: "Infra Loan Questionnair - Self Employed Professional",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    navigation: {
      nextPage: "/",
    },
    render: {
      ordering: "auto",
      renderType: "stepper",
      groups: ["Step-1", "Step-2", "Step-3", "Step-4"],
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
    },
  },
  fields: [
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "firmName",
      type: "text",
      label: "Your Firm Name as per records",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Firm Name is required"] }],
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
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "addOffice",
      label: "Office Address",
      required: true,
      type: "text",
      multiline: true,
      rows: 3,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Office Address is required"] }],
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
      name: "landMark1",
      label: "Landmark",
      required: true,
      type: "text",
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
        group: 0,
      },
      name: "pinCode1",
      type: "text",
      label: "Pincode",
      required: true,
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Pincode is required"] },
          { name: "min", params: [6, "Pincode should be 6 digit."] },
          { name: "max", params: [6, "Pincode should be 6 digit."] },
          {
            name: "matches",
            params: [/^\d{6}/, "Please enter valid Mobile No."],
          },
        ],
      },
      FormatProps: {
        format: "######",
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      runPostValidationHookAlways: true,
      postValidationSetCrossFieldValues: async (fieldData) => {
        if (fieldData.value === "123456") {
          return {
            locality1: {
              options: [],
              value: "",
            },
            city1: {
              value: "",
            },
            state1: {
              value: "",
            },
            district1: {
              value: "",
            },
            country1: {
              value: "",
            },
          };
        } else {
          if (trim(fieldData.value).length === 6) {
            let codes = await getPincode(fieldData.value);
            return {
              locality1: {
                options: codes,
              },
            };
          }
        }
      },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "locality1",
      label: "Locality",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Locality is required"] }],
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
      name: "city1",
      label: "City",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["City is required"] }],
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
      name: "district1",
      label: "District",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["District is required"] }],
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
      name: "state1",
      label: "State",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["State is required"] }],
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
      name: "country1",
      label: "Country",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Country is required"] }],
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
      name: "nameScheme",
      label: "Name of Scheme",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Name of Scheme is required"] }],
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
      name: "addSite",
      label: "Site Address",
      required: true,
      type: "text",
      multiline: true,
      rows: 3,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Site Address is required"] }],
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
      name: "landMarks",
      label: "Landmark",
      required: true,
      type: "text",
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
      name: "pinCodes",
      type: "text",
      label: "Pincode",
      required: true,
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Pincode is required"] },
          { name: "min", params: [6, "Pincode should be 6 digit."] },
          { name: "max", params: [6, "Pincode should be 6 digit."] },
          {
            name: "matches",
            params: [/^\d{6}/, "Please enter valid Mobile No."],
          },
        ],
      },
      FormatProps: {
        format: "######",
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      runPostValidationHookAlways: true,
      postValidationSetCrossFieldValues: async (fieldData) => {
        if (fieldData.value === "") {
          return {
            localitys: {
              options: [],
              value: "",
            },
            citys: {
              value: "",
            },
            states: {
              value: "",
            },
            districts: {
              value: "",
            },
            countrys: {
              value: "",
            },
          };
        } else {
          if (trim(fieldData.value).length === 6) {
            let codes = await getPincode(fieldData.value);
            return {
              localitys: {
                location: { options: codes.options, others: codes.others },
              },
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
      name: "localitys",
      label: "Locality",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Locality is required"] }],
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
      name: "citys",
      label: "City",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["City is required"] }],
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
      name: "districts",
      label: "District",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["District is required"] }],
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
      name: "states",
      label: "State",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["State is required"] }],
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
      name: "countrys",
      label: "Country",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Country is required"] }],
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
      name: "mktValue",
      type: "text",
      label: "Market Value of Land",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Market Value of Land is required"] },
          { name: "required", params: ["Market Value of Land is required"] },
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
        group: 1,
      },
      name: "reraReceive",
      label: "RERA Received",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["RERA Received is required"] }],
      },
      defaultValue: "xx",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select RERA Received", value: "xx" },
              { label: "Yes", value: "1" },
              { label: "No", value: "2" },
            ]);
          }, 1000);
        });
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
      name: "reraNumber",
      label: "RERA Number",
      required: true,
      type: "text",
      //dependentFields:['reraReceive'],
      //shouldExclude:{}
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["RERA Number is required"] }],
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
      name: "typeProject",
      label: "Type of Project",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Type of Project is required"] }],
      },
      defaultValue: "xx",
      options: getMiscVal("PROJECT_TYPE"),
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
      name: "monthRent",
      type: "text",
      label: "Monthly Rental Income",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Monthly Rental Income is required"] },
          { name: "required", params: ["Monthly Rental Income is required"] },
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
      name: "leaseDeed",
      type: "text",
      label: "No.of Years of lease deed",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["No.of Years of lease deed Income is required"],
          },
          {
            name: "required",
            params: ["No.of Years of lease deed Income is required"],
          },
        ],
      },
      enableNumWords: false,
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
      name: "pendleaseDeed",
      type: "text",
      label: "Pending years of lease deed",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["Pending years of lease deed Income is required"],
          },
          {
            name: "required",
            params: ["Pending years of of lease deed Income is required"],
          },
        ],
      },
      enableNumWords: false,
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
        componentType: "textField",
        group: 2,
      },
      name: "yPan",
      label: "Your PAN Card Number",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Your PAN Card Number is required"] },
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
        group: 2,
      },
      name: "adharNo",
      label: "Adhar Card Number",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Adhar Card Number is required"] },
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
        group: 2,
      },
      name: "existLoan",
      label: "Existing Loan From",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Existing Loan From is required"] },
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
      name: "moniStatus",
      label: "Avail Moratorium offered by RBI",
      required: false,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Avail Moratorium offered by RBI is required"],
          },
        ],
      },
      defaultValue: "xx",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Avail Moratorium offered by RBI", value: "xx" },
              { label: "Yes", value: "1" },
              { label: "No", value: "2" },
            ]);
          }, 1000);
        });
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
      name: "typeofloan",
      label: "Please select type of loan you would like to Avail",
      required: false,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Type of Loan is required"],
          },
        ],
      },
      defaultValue: "xx",
      options: getMiscVal("TYPE_OF_LOAN"),
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
    {
      render: {
        componentType: "select",
        group: 3,
      },
      name: "currprofess",
      label: "Your Current Profession",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Your Current Profession is required"] },
        ],
      },
      defaultValue: "xx",
      options: getMiscVal("PROFESSION"),
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "numberFormat",
        group: 3,
      },
      name: "yearProf",
      type: "text",
      label: "No.of Years in Current Profession",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["No.of Years in Current Profession is required"],
          },
          {
            name: "required",
            params: ["No.of Years in Current Profession is required"],
          },
        ],
      },
      enableNumWords: false,
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
        group: 3,
      },
      name: "totemi1",
      type: "text",
      label: "Total EMI you Pay Monthly",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["Total EMI you Pay Monthly is required"],
          },
          {
            name: "required",
            params: ["Total EMI you Pay Monthly is required"],
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
        group: 3,
      },
      name: "annualNet",
      type: "text",
      label: "Your Annual Net Income",
      required: true,

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
        group: 3,
      },
      name: "anyAdd",
      type: "text",
      label: "Any Add Back like Depreciation",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "typeError",
            params: ["Any Add Back like Depreciation is required"],
          },
          {
            name: "required",
            params: ["Any Add Back like Depreciation is required"],
          },
        ],
      },
      enableNumWords: false,
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
        group: 3,
      },
      name: "anySourcein",
      label: "Any other source of income",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Any other source of income is required"],
          },
        ],
      },
      defaultValue: "xx",
      options: getMiscVal("INCOME_SOURCE"),
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};

export default metaData;

/*
{
      render: {
        group: "groupB",
        componentType: "array",
        sequence: 0,
      },
      name: "contact",
      label: "Contact",
      schemaValidation: {
        type: "array",
      },
      template: [
        {
          render: {
            componentType: "text",
          },
          name: "contactNo",
          label: "Contact No",
        },
        {
          render: {
            componentType: "text",
          },
          name: "contactPerson",
          label: "Contact Person",
        },
      ],
    },
    */
