import { MetaDataType } from "components/dyanmicForm";

const getLoanType = [
  { label: "Select option", value: "00" },
  { label: "Proposed", value: "01" },
  { label: "Present", value: "02" },
];

const GeneralDetailsMetaData: MetaDataType = {
  form: {
    name: "123456",
    label: "General Details",
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
        componentType: "textField",
      },
      name: "unitName",
      label: "Name of the Unit",
      placeholder: "Name of the Unit",
      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      // validate: "getValidateValue",
    },
    {
      render: {
        componentType: "select",
      },
      name: "constitutionOfBusiness",
      label: "Constitution of Business",
      defaultValue: "00",
      //@ts-ignore
      options: "getFirmType",
      // validate: "getValidateValue",

      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
      },
      name: "businessPremises",
      label: "Ownership of Factory / Business Premises",
      defaultValue: "00",
      //@ts-ignore
      options: "getBusinessPremise",
      // validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "datePicker",
        // componentType: "futureDateNotAllowed",
      },
      name: "incorporationDate",
      label: "Date of incorporation",
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
      },
      name: "typeOfIndustry",
      label: "Existing Type of Industry",
      defaultValue: "00",
      //@ts-ignore
      options: "getIndustryType",
      // validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
      },
      name: "typeOfSubIndustry",
      label: "Existing Type of Sub Industry",
      defaultValue: "00",
      //@ts-ignore
      options: "getIndustrySubType",
      dependentFields: ["typeOfIndustry"],
      // validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
      },
      name: "existingBusinessNature",
      label: "Nature of Existing Business",
      defaultValue: "00",
      //@ts-ignore
      options: "getBusinessNature",
      // validate: "getValidateValue",
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
      name: "existingBusinessOtherNature",
      label: "Nature of Existing Other Business",
      placeholder: "Nature of Existing Other Business",
      // validate: "getValidateValue",
      dependentFields: ["existingBusinessNature"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.existingBusinessNature?.value === "05") {
          return false;
        }
        return true;
      },
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
      name: "proposedBusiness",
      label: "Proposed business",
      placeholder: "Proposed business",

      //@ts-ignore
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
      name: "creditRating",
      label: " External credit rating",
      placeholder: " External credit rating",

      //@ts-ignore
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "panCard",
      },
      name: "pan_no",
      type: "text",
      label: "Pan Card Number",
      placeholder: "PAN Card number",

      // validate: "validatePanNumber",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "aadharCard",
      },
      name: "udhyamNumber",
      type: "text",
      label: "Udhyam No",
      placeholder: "Udhyam No",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "textField",
      },
      name: "cmrRanking",
      type: "text",
      label: "CMR Ranking",
      placeholder: "CMR Ranking",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "textField",
      },
      name: "rfRating",
      type: "text",
      label: "RF Rating",
      placeholder: "RF Rating",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "arrayField",
        group: 1,
      },
      name: "addressDetails",
      label: "Address Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "select",
            group: 1,
          },
          name: "addressType",
          label: "Address Type",
          placeholder: "Address Type",

          defaultValue: "X",
          //@ts-ignore
          options: "businessAddType",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "textField",
            group: 0,
          },

          name: "addressLine1",
          label: "Address Line 1",
          placeholder: "Address Line 1",

          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "textField",
            group: 0,
          },

          name: "addressLine2",
          label: "Address Line 2",
          placeholder: "Address Line 2",
          dependentFields: ["addressLine1"],

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
          name: "landmark",
          label: "Landmark",
          placeholder: "Landmark",
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
            componentType: "pincode",
          },
          name: "pincode",
          label: "Residence Pincode",
          placeholder: "Residence pincode",
          required: true,
          defaultValue: "",
          validate: "getValidateValue",
          runPostValidationHookAlways: true,
          //@ts-ignore
          postValidationSetCrossFieldValues: "getPincodeDtl",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "select",
          },
          name: "location",
          label: "Location",
          placeholder: "Location",
          required: true,
          defaultValue: "0",
          runPostValidationHookAlways: true,
          validate: "getValidateValue",
          //@ts-ignore
          postValidationSetCrossFieldValues: "getLocationDtl",
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
          name: "city",
          label: "City",
          placeholder: "City",
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
          name: "district",
          label: "District",
          placeholder: "District",
          // isReadOnly: true,
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
          name: "state",
          label: "State",
          placeholder: "State",
          // isReadOnly: true,
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
          name: "country",
          label: "Country",
          placeholder: "Country",
          // isReadOnly: true,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
        group: 1,
      },
      name: "bankingArrangements",
      label: "Banking Arrangements",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "textField",
            group: 0,
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
            group: 0,
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
          name: "landaccNumbermark",
          label: "Current A/C No",
          placeholder: "Current A/C No",
          type: "text",
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
          name: "avgBankBalance",
          label: "Average Bank Balance",
          placeholder: "Average Bank Balance",
          type: "text",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
        group: 0,
      },
      name: "natureFacility",
      label: "Nature of Facility",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "select",
            group: 0,
          },
          name: "loanType",
          label: "Select Type of Loan",
          defaultValue: "01",
          //@ts-ignore
          options: getLoanType,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "textField",
            group: 0,
          },
          name: "proposedNatureFacility",
          label: "Nature of Facility",
          placeholder: "Nature of Facility",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["loanType"],
          shouldExclude: "shouldExcludeGeneralDetailProposed",
        },

        {
          render: {
            componentType: "textField",
            group: 0,
          },
          name: "newOrTakeover",
          label: "New / Takeover",
          placeholder: "New / Takeover",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["loanType"],
          shouldExclude: "shouldExcludeGeneralDetailProposed",
        },

        {
          render: {
            componentType: "textField",
            group: 0,
          },
          name: "requstedROI",
          label: "Requested ROI",
          placeholder: "Requested ROI",
          type: "text",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["loanType"],
          shouldExclude: "shouldExcludeGeneralDetailProposed",
        },

        {
          render: {
            componentType: "textField",
            group: 0,
          },
          name: "amount",
          label: "Amount",
          placeholder: "Amount",
          type: "text",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["loanType"],
          shouldExclude: "shouldExcludeGeneralDetailProposed",
        },

        {
          render: {
            componentType: "textField",
            group: 0,
          },
          name: "presentNatureFacility",
          label: "Nature of Facility",
          placeholder: "Nature of Facility",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["loanType"],
          shouldExclude: "shouldExcludeGeneralDetailPresent",
        },

        {
          render: {
            componentType: "select",
            group: 0,
          },
          name: "bankName",
          label: "Name of Bank",
          placeholder: "Name of Bank",
          defaultValue: "00",
          //@ts-ignore
          options: "getBankList",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["loanType"],
          shouldExclude: "shouldExcludeGeneralDetailPresent",
        },

        {
          render: {
            componentType: "textField",
            group: 0,
          },
          name: "outstandinAmount",
          label: "O/s Amount as on",
          placeholder: "O/s Amount as on",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["loanType"],
          shouldExclude: "shouldExcludeGeneralDetailPresent",
        },

        {
          render: {
            //@ts-ignore
            componentType: "rateOfInt",
            group: 0,
          },
          name: "interestRate",
          label: "Rate of Interest",
          placeholder: "Rate of Interest",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["loanType"],
          shouldExclude: "shouldExcludeGeneralDetailPresent",
        },
      ],
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "loanPurpose",
      label: "Purpose of loan",
      placeholder: "Purpose of loan",
      // validate: "getValidateValue",
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
        group: 1,
      },
      name: "currentFinancialYearTurnover",
      label: "Turnover in current financial year",
      placeholder: "Turnover in current financial year",

      defaultValue: "",
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
        group: 1,
      },
      name: "averageBankBalanceAndCapitalLimits",
      label: "Last 12 Months average Bank Balance",
      placeholder: "Last 12 Months average Bank Balance",
      defaultValue: "",
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
        group: 1,
      },
      name: "last12MonthsCreditSummation",
      label: "Credit Summation in Bank in Last 12 months",
      placeholder: "Credit Summation in Bank in Last 12 months",

      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
        group: 1,
      },
      name: "chequesBounceInward",
      label: "Inward cheque bounces(% of total Cheque bounce)",
      placeholder: "Inward cheque bounces(% of total Cheque bounce)",

      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};

export default GeneralDetailsMetaData;
