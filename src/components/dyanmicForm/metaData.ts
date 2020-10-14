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
        inputVariant: "outlined",
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
        group: "Personal Details",
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
      dependentFields: ["email"],
      enableGrid: true,
      fieldKey: "salutation",
    },
    {
      render: {
        componentType: "textField",
        group: "Personal Details",
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
      enableGrid: true,
      fieldKey: "firstName",
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
