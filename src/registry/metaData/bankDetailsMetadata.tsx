import { MetaDataType } from "components/dyanmicForm/types";
export const BankDetailsMetadata: MetaDataType = {
  form: {
    name: "bankDetails",
    label: "Bank Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: {
          xs: 12,
          sm: 4,
          md: 4,
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
      inputMask: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "arrayField",
        group: 1,
      },
      name: "bankDetails",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            //@ts-ignore
            componentType: "hidden",
          },
          name: "lineNo",
        },

        {
          render: {
            componentType: "select",
          },
          name: "accoutType",
          label: "Account Type",
          defaultValue: "01",
          //@ts-ignore
          options: [
            { label: "Saving", value: "01" },
            { label: "Current", value: "02" },
            { label: "Term Loan", value: "03" },
            { label: "Overdraft", value: "04" },
            { label: "Cash Credit", value: "05" },
          ],
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "textField",
          },
          name: "bankName",
          label: "Name of Bank",
          placeholder: "Name of Bank",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "textField",
            group: 2,
          },
          name: "address",
          label: "Address",
          placeholder: "Address",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "textField",
          },
          name: "accountNo",
          label: "A/C No",
          placeholder: "A/C No",
          type: "text",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            //@ts-ignore
            componentType: "currencyWithoutWords",
          },
          name: "averageBalance",
          label: "Average Bank Balance",
          placeholder: "Average Bank Balance",
          type: "text",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["accoutType"],
          shouldExclude: "shouldExcludeBankDetailArrangements",
        },

        {
          render: {
            //@ts-ignore
            componentType: "datePicker",
          },
          name: "outstandingAmountAsOn",
          label: "O/s Amount as on",
          placeholder: "dd/mm/yyyy",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["accoutType"],
          shouldExclude: "shouldExcludeBankDetailNatureofFacilityPresent",
        },

        {
          render: {
            //@ts-ignore
            componentType: "currency",
            group: 3,
          },
          name: "outstandingAmount",
          label: "O/s Amount",
          placeholder: "O/s Amount",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["accoutType"],
          shouldExclude: "shouldExcludeBankDetailNatureofFacilityPresent",
        },

        {
          render: {
            //@ts-ignore
            componentType: "rateOfInt",
          },
          name: "rateOfInterest",
          label: "Rate of Interest",
          placeholder: "Rate of Interest",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["accoutType"],
          shouldExclude: "shouldExcludeBankDetailNatureofFacilityPresent",
        },
      ],
    },
  ],
};
