import { MetaDataType } from "components/dyanmicForm";

export const GSTUploadMetaData: MetaDataType = {
  form: {
    name: "gstAPI",
    label: "GST Upload Request Interface",
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
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
      },
      name: "entity",
      label: "Entity",
      defaultValue: "1",
      options: [
        { value: "1", label: "Legal" },
        { value: "2", label: "Individual" },
      ],
    },
    {
      render: {
        componentType: "select",
      },
      name: "management",
      label: "Management Person",
      defaultValue: "",
      shouldExclude: "",
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "fromDate",
      label: "From Date",
      format: "MM/yyyy",
      validationRun: "onChange",
      schemaValidation: {
        type: "date",
        rules: [
          {
            name: "required",
            params: ["required field"],
          },
        ],
      },
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "toDate",
      label: "To Date",
      format: "MM/yyyy",
      schemaValidation: {
        type: "date",
        rules: [
          {
            name: "required",
            params: ["required field"],
          },
        ],
      },
      dependentFields: ["fromDate"],
      validationRun: "onChange",
      validate: {
        conditions: {
          any: [
            {
              fact: "dependentFields",
              path: "$.fromDate.value",
              operator: "lessThan",
              value: {
                fact: "currentField",
                path: "$.value",
              },
            },
          ],
        },
        success: "",
        failure: "To date must be gerater than from date",
      },
    },
  ],
};
