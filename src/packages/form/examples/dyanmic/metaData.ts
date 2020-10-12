import { MetaData } from "./types";

const metaData: MetaData = {
  form: {
    name: "",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      fieldGroups: ["groupA", "groupB", "groupC", "groupD"],
      groupEnabled: true,
      ordering: "auto",
      renderType: "slider",
      gridConfig: {
        item: {
          xs: 12,
          sm: 6,
          md: 3,
        },
        container: {
          direction: "row",
        },
      },
    },
  },
  fields: [
    {
      render: {
        group: "groupA",
        componentType: "textField",
        sequence: 1,
      },
      name: "firstName",
      label: "First Name",
      type: "text",
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["First Name is required"] }],
      },
    },
    {
      render: {
        group: "groupA",
        componentType: "textField",
        sequence: 2,
      },
      name: "lastName",
      label: "Last Name",
      type: "text",
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Last Name is required"] }],
      },
    },
    {
      render: {
        group: "groupA",
        componentType: "select",
        sequence: 0,
      },
      name: "salutation",
      label: "Salutation",
      defaultValue: "",
      options: [
        { value: 1, label: "Mr" },
        { value: 2, label: "Mrs" },
        { value: 3, label: "Miss" },
      ],
    },
    {
      render: {
        group: "groupB",
        componentType: "array",
        sequence: 0,
      },
      name: "contact",
      label: "Contact",
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
      schemaValidation: {
        type: "array",
      },
    },
  ],
};
