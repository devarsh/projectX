import { MetaDataType } from "./types";

const metaData: MetaDataType = {
  form: {
    name: "dynamic",
    label: "Dynamic Form",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "sequence",
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
        variant: "outlined",
      },
      select: {
        variant: "outlined",
        autoWidth: true,
      },
      datePicker: {
        variant: "outlined",
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        group: "Personal Details",
        componentType: "textField",
        sequence: 0,
      },
      name: "salutation-1",
      label: "Salutation-1",
      defaultValue: "Mrs.",
      validate: (fieldName) => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            console.log("i am in timeout", fieldName);
            if (fieldName.value !== "alpesh") {
              res("there is some error");
            } else {
              res(null);
            }
          }, 4000);
        });
      },
    },
    {
      render: {
        group: "Personal Details",
        componentType: "select",
        sequence: 0,
      },
      name: "salutation",
      label: "Salutation",
      defaultValue: "",
      required: true,
      options: [
        { value: 1, label: "Mr" },
        { value: 2, label: "Mrs" },
        { value: 3, label: "Miss" },
      ],
    },
    {
      render: {
        group: "Personal Details",
        componentType: "textField",
        sequence: 1,
      },
      name: "firstName",
      label: "First Name",
      type: "email",
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["First Name is required"] },
          { name: "email", params: ["Not a valid email"] },
        ],
      },
    },
    {
      render: {
        group: "Personal Details",
        componentType: "textField",
        sequence: 2,
      },
      name: "middleName",
      label: "Middle Name",
      type: "text",
      defaultValue: "",
    },
    {
      render: {
        group: "Personal Details",
        componentType: "textField",
        sequence: 3,
      },
      name: "lastName",
      label: "Last Name",
      type: "text",

      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Last Name is required"] }],
      },
    },
    {
      render: {
        group: "Personal Details",
        componentType: "datePicker",
        sequence: 4,
      },
      name: "dob",
      label: "Date of Birth",
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
    },
    {
      render: {
        group: "Personal Details",
        componentType: "select",
        sequence: 5,
      },
      name: "gender",
      label: "Gender",

      options: [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
      ],
    },
    {
      render: {
        group: "Personal Details",
        componentType: "textField",
        sequence: 1,
      },
      name: "loanamt",
      label: "Your Desired Loan Amount",
      type: "text",
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["First Name is required"] }],
      },
    },
    {
      render: {
        group: "Contact Details",
        componentType: "textField",
        sequence: 1,
      },
      name: "mobNo",
      label: "Mobile Number",
      required: true,
      type: "text",
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["First Name is required"] }],
      },
    },
    {
      render: {
        group: "Contact Details",
        componentType: "textField",
        sequence: 1,
      },
      name: "email",
      label: "Email",
      required: true,
      type: "text",
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["First Name is required"] },
          { name: "email", params: ["email should be valid"] },
        ],
      },
    },
    {
      render: {
        group: "Contact Details",
        componentType: "select",
        sequence: 1,
      },
      name: "gender-2",
      label: "Gender",
      required: true,
      options: [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
        { value: 3, label: "Transgender" },
      ],
    },
    {
      render: {
        group: "Contact Details",
        componentType: "textField",
        sequence: 1,
      },
      name: "emi",
      label: "Monthly EMI",
      required: true,
      schemaValidation: {
        type: "number",
        rules: [
          { name: "min", params: [4, "Emi greater than 1lac"] },
          { name: "email", params: ["email should be valid"] },
        ],
      },
      validation: "function",
      dependentFields: ["name", "email", ""],
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
