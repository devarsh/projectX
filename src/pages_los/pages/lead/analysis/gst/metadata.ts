import { MetaDataType } from "components/dyanmicForm";

export const GSTAnalysisMetaData: MetaDataType = {
  form: {
    name: "gstAnalysisAPI",
    label: "GST Analysis Request Interface",
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
      name: "processFor",
      label: "Entity",
      defaultValue: "ALL",
      options: [
        { value: "ALL", label: "ALL" },
        { value: "GSTR1", label: "GSTR1" },
        { value: "GSTR3", label: "GSTR3" },
      ],
    },
    {
      render: {
        componentType: "select",
      },
      name: "entityType",
      label: "Entity",
      defaultValue: "L",
      options: [{ value: "L", label: "Legal" }],
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "periodFrom",
      label: "Period From",
      format: "MM/yyyy",
      placeholder: "mm/yyyy",
      schemaValidation: {
        type: "date",
        rules: [
          {
            name: "typeError",
            params: ["Not a valid date"],
          },
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
      name: "periodTo",
      label: "Period To",
      format: "MM/yyyy",
      placeholder: "mm/yyyy",
      schemaValidation: {
        type: "date",
        rules: [
          {
            name: "typeError",
            params: ["Not a valid date"],
          },
          {
            name: "required",
            params: ["required field"],
          },
        ],
      },
      dependentFields: ["periodFrom"],
      validationRun: "all",
      runValidationOnDependentFieldsChange: true,
      validate: {
        conditions: {
          any: [
            {
              fact: "dependentFields",
              path: "$.periodFrom.value",
              operator: "lessThanDate",
              value: {
                fact: "currentField",
                path: "$.value",
              },
            },
          ],
        },
        success: "",
        failure: "Period To date must be gerater than Period from date",
      },
    },
  ],
};
