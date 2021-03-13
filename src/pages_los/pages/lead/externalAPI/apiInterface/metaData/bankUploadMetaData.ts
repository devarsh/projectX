import { MetaDataType } from "components/dyanmicForm";

export const BankUploadMetaData: MetaDataType = {
  form: {
    name: "bankUploadAPI",
    label: "Bank Upload Request Interface",
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
      name: "entity",
      label: "Entity",
      defaultValue: "1",
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
      dependentFields: ["entity"],
      shouldExclude: "shouldExcludeExternalAPIManagementDetails",
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "fromDate",
      label: "From Date",
      format: "MM/yyyy",
      placeholder: "mm/yyyy",
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
      placeholder: "mm/yyyy",
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
      validationRun: "all",
      runValidationOnDependentFieldsChange: true,
      validate: {
        conditions: {
          any: [
            {
              fact: "dependentFields",
              path: "$.fromDate.value",
              operator: "lessThanDate",
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
    {
      render: {
        componentType: "select",
      },
      name: "acceptancePolicy",
      label: "Acceptance Policy",
      //@ts-ignore
      options: "getAcceptancePolicy",
    },
    {
      render: {
        componentType: "select",
      },
      name: "bank",
      label: "Bank",
      disableCaching: true,
      dependentFields: ["entity", "management"],
      //@ts-ignore
      options: "getBankListForLeadDocumentsForAPICallInterface",
    },
    {
      render: {
        componentType: "select",
      },
      name: "bankFacility",
      label: "Bank Facility",
      disableCaching: true,
      dependentFields: ["entity", "management"],
      //@ts-ignore
      options: "getBankFacilityOptions",
    },
  ],
};
