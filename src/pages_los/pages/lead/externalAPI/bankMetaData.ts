export const BankDetailsMetadata = {
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
          name: "accountType",
          label: "Account Type",
          defaultValue: "00",
          //@ts-ignore
          options: "bankFacilityType",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            //@ts-ignore
            componentType: "autocomplete",
          },
          name: "bankName",
          label: "Name of Bank",
          placeholder: "Name of Bank",
          defaultValue: "00",
          enableVirtualized: true,
          //@ts-ignore
          options: "getPerfiosBankList",
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
          dependentFields: ["accountType"],
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
          format: "dd/MM/yyyy",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["accountType"],
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
          dependentFields: ["accountType"],
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
          dependentFields: ["accountType"],
          shouldExclude: "shouldExcludeBankDetailNatureofFacilityPresent",
        },
      ],
    },
  ],
};
