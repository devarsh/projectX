import { MetaDataType } from "components/dyanmicForm";

export const verificationInitateFormMetaData: MetaDataType = {
  form: {
    name: "itrAPI",
    label: "Verification Inititation Request",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "simple",
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
      datePicker: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
      },
      name: "apiType",
      label: "API Type",
      defaultValue: "mobile",
      options: [
        { value: "mobile", label: "Mobile" },
        { value: "email", label: "Email" },
        {
          value: "credit",
          label: "creditScore",
        },
        {
          value: "aadhar",
          label: "Aadhar",
        },
      ],
    },
    {
      render: {
        componentType: "select",
      },
      name: "entityType",
      label: "Entity",
      defaultValue: "L",
      options: [
        { value: "L", label: "Legal" },
        { value: "I", label: "Individual" },
      ],
    },
    {
      render: {
        componentType: "select",
      },
      name: "management",
      label: "Management Person",
      //@ts-ignore
      options: "getManagementPersonnel",
      dependentFields: ["entityType"],
      shouldExclude: "shouldExcludeExternalAPIManagementDetails",
    },
  ],
};
