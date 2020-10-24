//@ts-nocheck
import { MetaDataType } from "components/dyanmicForm/types";

const metaData: MetaDataType = {
  form: {
    name: "rhl-1",
    label: "Retail Home Loan",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "stepper",
      labels: {
        next: "Next",
        complete: "Complete",
        prev: "Back",
      },
      groups: ["Personal Details", "Contact Details", "Conditional"],
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
        componentType: "toggleButtonGroup",
        group: 0,
      },
      name: "productType",
      label: "Product Type",
      defaultValue: "p",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: [
        { label: "Home Loan", value: "p", iconName: "person" },
        { label: "Personal Loan", value: "b", iconName: "business" },
      ],
      exclusive: true,
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
        componentType: "inputMask",
        group: 0,
      },
      name: "lala",
      type: "text",
      label: "Format lalalal",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      MaskProps: {
        mask: "0000` aaaa` aaaa",
        lazy: true,
      },
    },
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "salutation",
      label: "Salutation",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: "functionOne",
      runPostValidationHookAlways: true,
      validate: "functionTwo",
      postValidationSetCrossFieldValues: "functionThree",
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
      required: true,
      type: "text",
      defaultValue: "0",
      isReadOnly: "functionFour",
      options: "functionFive",
      validate: "functionSix",
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
          { name: "typeError", params: ["Date of Birth is required"] },
          { name: "required", params: ["Date of Birth is required"] },
        ],
      },
    },
    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "loanAmount",
      type: "text",
      label: "Your Desired Loan Amount",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Loan Amount is required"] },
          { name: "required", params: ["Loan Amount is required"] },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        suffix: "/-",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        fixedDecimalScale: true,
      },
      validationRun: "onChange",
    },
    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "aadhar",
      type: "text",
      label: "AadharNumber",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Loan Amount is required"] },
          { name: "required", params: ["Loan Amount is required"] },
        ],
      },
      FormatProps: {
        format: "####-####-####-####",
      },
      validationRun: "onChange",
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "mobileNo",
      type: "text",
      label: "Mobile No",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Mobile No is required"] },
          { name: "required", params: ["Mobile No is required"] },
        ],
      },
      StartAdornment: "+91",
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "email",
      type: "text",
      label: "Email",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Email is required"] },
          { name: "required", params: ["Email is required"] },
        ],
      },
    },
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "employementStatus",
      label: "How Are You Currently Employed",
      required: true,
      defaultValue: "0",
      options: "functionSeven",
    },
    {
      render: {
        componentType: "textField",
        group: 2,
      },
      name: "label1",
      type: "text",
      label: "Label 1",
      dependentFields: ["employementStatus"],
      shouldExclude: "functionEight",
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "pincode",
      label: "Residence Pincode",
      required: true,
      defaultValue: "",
      postValidationSetCrossFieldValues: "functionNine",
    },
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "location",
      label: "Location",
      required: true,
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "city",
      label: "City",
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "district",
      label: "District",
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "state",
      label: "State",
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "country",
      label: "Country",
    },
    {
      render: {
        componentType: "checkbox",
        group: 1,
      },
      name: "agreed",
      label:
        "I have read and agreed to the Terms of Use and hereby appoint Ratnaafin as my authorised representative to receive my credit information from Cibil/ Equifax/ Experian/ Highmark (bureau).",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
};

export default metaData;
