import { MetaDataType } from "components/dyanmicForm/types";

export const GeneralDetailsMetaData: MetaDataType = {
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
      name: "entityName",
      label: "Name of the Unit",
      placeholder: "Name of the Unit",
      defaultValue: "",
      maxLength: 250,
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
      name: "entityType",
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
      name: "ownershipType",
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
      name: "inceptionDate",
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
      name: "businessType",
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
      name: "businessSubType",
      label: "Existing Type of Sub Industry",
      defaultValue: "00",
      //@ts-ignore
      options: "getIndustrySubType",
      dependentFields: ["businessType"],
      disableCaching: true,
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
      name: "businessNature",
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
      name: "otherBusinessNature",
      label: "Nature of Existing Other Business",
      placeholder: "Nature of Existing Other Business",
      // validate: "getValidateValue",
      dependentFields: ["businessNature"],
      shouldExclude: "shouldExcludeGeneralDetailBusinessNature",
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
      name: "businessProposed",
      label: "Proposed business",
      placeholder: "Proposed business",
      maxLength: 200,
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
      name: "rankExternal",
      label: " External credit rating",
      placeholder: " External credit rating",
      maxLength: 2,

      //@ts-ignore
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
      name: "businessSize",
      label: " Micro, Small or Medium",
      placeholder: " Micro, Small or Medium",
      //@ts-ignore
      options: "businessSize",

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
      name: "panNumber",
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
        componentType: "textField",
      },
      name: "udhyogNumber",
      type: "text",
      label: "Udhyam No",
      placeholder: "Udhyam No",
      maxLength: 50,
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
      name: "crmRank",
      label: "CMR Ranking",
      placeholder: "CMR Ranking",
      maxLength: 10,
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
      name: "rfRank",
      label: "RF Rating",
      placeholder: "RF Rating",
      maxLength: 10,
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
          options: "businessAddressType",
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

          name: "address1",
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

          name: "address2",
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

        {
          render: {
            componentType: "select",
          },
          name: "primaryAddress",
          label: "Primary Address",
          placeholder: "Primary Address",
          defaultValue: "00",
          //@ts-ignore
          options: "getYesOrNoOptions",
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
      name: "bankingArrangement",
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
          name: "branchName",
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
            //@ts-ignore
            componentType: "currencyWithoutWords",
          },
          name: "balance",
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
      name: "natureOfFacilityDetails",
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
            sequence: 1,
          },
          name: "facilityType",
          label: "Select Nature of Facility Type",
          defaultValue: "00",
          //@ts-ignore
          options: "getNatureOfFacility",
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
            sequence: 2,
          },

          name: "facilityName",
          label: "Nature of Facility",
          placeholder: "Nature of Facility",
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
          name: "takeOverBalance",
          label: "New / Takeover",
          placeholder: "New / Takeover",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["facilityType"],
          shouldExclude: "shouldExcludeGeneralDetailProposed",
        },

        {
          render: {
            //@ts-ignore
            componentType: "rateOfInt",
            group: 0,
          },
          name: "requestedRateOfInterest",
          label: "Requested ROI",
          placeholder: "Requested ROI",
          type: "text",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["facilityType"],
          shouldExclude: "shouldExcludeGeneralDetailProposed",
        },

        {
          render: {
            //@ts-ignore
            componentType: "currency",
            group: 0,
            sequence: 5,
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
          dependentFields: ["facilityType"],
          shouldExclude: "shouldExcludeGeneralDetailProposed",
        },

        {
          render: {
            componentType: "select",
            group: 0,
            sequence: 6,
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
          dependentFields: ["facilityType"],
          shouldExclude: "shouldExcludeGeneralDetailPresent",
        },

        {
          render: {
            //@ts-ignore
            componentType: "currency",
            group: 0,
            sequence: 7,
          },
          name: "outstandingOn",
          label: "O/s Amount as on",
          placeholder: "O/s Amount as on",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["facilityType"],
          shouldExclude: "shouldExcludeGeneralDetailPresent",
        },

        {
          render: {
            //@ts-ignore
            componentType: "currency",
            group: 0,
          },
          name: "outstandingBalance",
          label: "O/s Amount as Balance",
          placeholder: "O/s Amount as Balance",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["facilityType"],
          shouldExclude: "shouldExcludeGeneralDetailPresent",
        },

        {
          render: {
            //@ts-ignore
            componentType: "rateOfInt",
            group: 0,
          },
          name: "rateOfInterest",
          label: "Rate of Interest",
          placeholder: "Rate of Interest",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
          dependentFields: ["facilityType"],
          shouldExclude: "shouldExcludeGeneralDetailPresent",
        },
      ],
    },

    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "purposeLoan",
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
      name: "turnOverAmount",
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
      name: "averageBankBal",
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
      name: "chequeBounces",
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
      name: "chequeBouncesPer",
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
