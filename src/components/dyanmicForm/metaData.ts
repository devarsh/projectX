import { MetaDataType } from "./types";

const metaData: MetaDataType = {
  form: {
    name: "dynamic",
    label: "Dynamic Form",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "stepper",
      gridConfig: {
        item: {
          xs: 12,
          sm: 3,
          md: 3,
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
        componentType: "select",
        group: "Personal Details",
      },
      name: "salutation",
      label: "Salutation",
      required: true,
      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Salutation", value: "0" },
              { label: "Mr", value: "1" },
              { label: "Mrs", value: "2" },
              { label: "Miss", value: "3" },
            ]);
          }, 1000);
        });
      },
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Salutation is Required";
        }
      },
      postValidationSetCrossFieldValues: (field) => {
        return new Promise((res) => {
          if (field.value === "1") {
            res({
              gender: {
                value: "1",
              },
            });
          } else if (field.value === "2" || field.value === "3") {
            res({
              gender: {
                value: "2",
              },
            });
          } else {
            res({
              gender: {
                value: "0",
              },
            });
          }
        });
      },
    },
    {
      render: {
        componentType: "textField",
        group: "Personal Details",
      },
      name: "firstName",
      type: "text",
      label: "First Name[As Per PAN Card]",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["First Name is required"] }],
      },
    },
    {
      render: {
        componentType: "textField",
        group: "Personal Details",
      },
      name: "middleName",
      label: "Middle Name",
      type: "text",
    },
    {
      render: {
        componentType: "textField",
        group: "Personal Details",
      },
      name: "lastName",
      label: "Last Name",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Last Name is required"] }],
      },
    },
    {
      render: {
        componentType: "select",
        group: "Personal Details",
      },
      name: "gender",
      label: "Gender",
      required: true,
      type: "text",
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Gender", value: "0" },
              { label: "Male", value: "1" },
              { label: "Female", value: "2" },
            ]);
          }, 1000);
        });
      },
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Gender is Required";
        }
      },
    },
    {
      render: {
        componentType: "datePicker",
        group: "Personal Details",
      },
      name: "dob",
      label: "Date Of Birth",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
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
        group: "Personal Details",
      },
      name: "loanAmount",
      type: "text",
      label: "Your Desired Loan Amount",
      required: true,
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
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
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
      },
    },
    {
      render: {
        componentType: "textField",
        group: "Contact Details",
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
