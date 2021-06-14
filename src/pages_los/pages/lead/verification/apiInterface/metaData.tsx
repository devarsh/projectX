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
          value: "credit-score",
          label: "Credit Score",
        },
      ],
      postValidationSetCrossFieldValues: () => {
        return {
          entityType: { value: "00" },
          management: { value: "00" },
        };
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "entityType",
      label: "Entity",
      defaultValue: "L",
      dependentFields: ["apiType"],
      //@ts-ignore
      options: "getEntityType",
      disableCaching: true,
    },
    {
      render: {
        componentType: "select",
      },
      name: "management",
      label: "Management Person",
      //@ts-ignore
      options: "getApplicants",
      dependentFields: ["entityType"],
      shouldExclude: "shouldExcludeExternalAPIManagementDetails",
      disableCaching: true,
    },
  ],
};
