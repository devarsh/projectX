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
      textField: {
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
      },
      name: "entityType",
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
      dependentFields: ["entityType"],
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
      name: "bankLineID",
      label: "Bank",
      disableCaching: true,
      dependentFields: ["entityType", "management"],
      //@ts-ignore
      options: "getBankListForLeadDocumentsForAPICallInterface",
      //@ts-ignore
      postValidationSetCrossFieldValues: "setBankFacilityValue",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "bankFacility",
      label: "Bank Facility",
      isReadOnly: true,
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
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "loanAmount",
      label: "Loan Amount",
      placeholder: "Loan Amount",
      defaultValue: "",
      isReadOnly: true,
    },
    {
      render: {
        componentType: "textField",
      },
      name: "loanDuration",
      type: "number",
      label: "Loan Duration",
      placeholder: "Loan Duration",
      maxLength: 2,
      required: true,
    },
    {
      render: {
        //@ts-ignore
        componentType: "textField",
      },
      name: "loanType",
      label: "Loan Type",
      placeholder: "Loan Type",
      defaultValue: "Home",
      required: true,
    },
    {
      render: {
        componentType: "select",
      },
      name: "sanctionLimitType",
      label: "Sanction Limit Type",
      //@ts-ignore
      options: [
        { label: "Select option", value: "0" },
        { label: "Fixed", value: "fixed" },
        { label: "Variable", value: "variable" },
      ],
      defaultValue: "0",
      //@ts-ignore
      disableCaching: true,
      dependentFields: ["bankFacility"],
      shouldExclude: "shouldExcludeSanctionLimitOptionsExternalAPIBank",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "sanctionLimitFixedAmount",
      label: "Sanction Limit Fixed Amount",
      placeholder: "Sanction Limit Fixed Amount",
      dependentFields: ["bankFacility", "sanctionLimitType"],
      shouldExclude: "shouldExcludeSanctionLimitFixedAmountExternalAPIBank",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "spacer",
      },
      name: "emptySpace",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      HiddenProps: {
        smDown: true,
      },
    },
    {
      render: {
        componentType: "arrayField",
      },
      name: "sanctionLimitVariableAmount",
      label: "Sancation Limit For Each Month",
      dependentFields: [
        "bankFacility",
        "sanctionLimitType",
        "fromDate",
        "toDate",
      ],
      shouldExclude: "shouldExcludeSanctionLimitVariableAmountExternalAPIBank",
      fixedRows: true,
      getFixedRowsCount: "getMonthDifferenceInRows",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      _fields: [
        {
          render: {
            //@ts-ignore
            componentType: "currency",
          },
          name: "sanctionAmount",
          label: "Sancation Limit Amount",
          required: true,
          GridProps: {
            xs: 12,
            md: 12,
            sm: 12,
          },
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
      },
      name: "drawingPowerVariableAmount",
      label: "Drawing Power For Each Month",
      dependentFields: ["bankFacility", "fromDate", "toDate"],
      shouldExclude: "shouldExcludeDrawingPowerVariableAmountExternalAPIBank",
      fixedRows: true,
      getFixedRowsCount: "getMonthDifferenceInRows",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      _fields: [
        {
          render: {
            //@ts-ignore
            componentType: "currency",
          },
          name: "drawingPowerAmount",
          label: "Drawing Power Amount",
          required: true,
          GridProps: {
            xs: 12,
            md: 12,
            sm: 12,
          },
        },
      ],
    },
  ],
};
