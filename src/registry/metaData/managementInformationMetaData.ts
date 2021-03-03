import { MetaDataType } from "components/dyanmicForm/types";

export const ManagementInformationMetaData: MetaDataType = {
  form: {
    refID: 1667,
    name: "12300001",
    label: "Management Information",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "Management Basic Details",
        1: "Contact Details",
        2: "Income Details",
        3: "Bank Details",
      },
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
        componentType: "select",
        group: 0,
      },
      name: "salutation",
      label: "Salutation",
      placeholder: "Select Salutation",
      required: true,
      defaultValue: "00",
      //@ts-ignore
      options: "getSalutation",
      //@ts-ignore
      postValidationSetCrossFieldValues: "getGenderValue",
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "gender",
      label: "Gender",
      placeholder: "placeholder",
      defaultValue: "00",
      isReadOnly: true,
      //@ts-ignore
      options: "getGenderList",
      required: true,
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
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "First Name",
      required: true,
      validate: "getValidateValue",
      maxLength: 50,
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
      name: "middleName",
      type: "text",
      label: "Middle Name",
      placeholder: "Middle Name",
      required: false,
      maxLength: 50,
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
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Last Name",
      required: true,
      maxLength: 50,
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "dob",
        group: 0,
      },
      name: "dob",
      label: "Birth Date",
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "phoneNumber",
        group: 0,
      },
      name: "mobileNo",
      type: "text",
      label: "Mobile No",
      placeholder: "Mobile No",
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
        componentType: "phoneNumber",
        group: 0,
      },
      name: "alternateMobileNo",
      type: "text",
      label: "Alternate Mobile No",
      placeholder: "Alternate Mobile No",
      required: false,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "officeContactNo",
      type: "text",
      label: "Office Contact No",
      placeholder: "Office Contact No",
      required: false,
      FormatProps: {
        format: "##########",
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
        group: 0,
      },
      name: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
      maxLength: 50,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Email is required."] },
          { name: "email", params: ["Please enter Email ID."] },
        ],
      },
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
        group: 0,
      },
      name: "panNumber",
      type: "text",
      label: "Pan Card Number",
      placeholder: "PAN Card number",
      required: true,
      //validate: "validatePanNumber",
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
        group: 0,
      },
      name: "passportNumber",
      type: "text",
      label: "Passport Number",
      placeholder: "Passport Number",
      maxLength: 20,
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
        group: 0,
      },
      name: "drivingLicenceNo",
      type: "text",
      label: "Driving License Number",
      maxLength: 20,
      placeholder: "Driving License Number",
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
        group: 0,
      },
      name: "dinLlPinNo",
      type: "text",
      label: "Din LLPIN Number",
      maxLength: 20,
      placeholder: "Din LLPIN Number",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "educationQalification",
      label: "Education Qualification",
      placeholder: "Education Qualification",
      required: true,
      defaultValue: "X",
      //@ts-ignore
      options: "getEducationDtl",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "experience",
      label: "Experience",
      placeholder: "How many years of Experience you have ?",
      required: true,
      defaultValue: "X",
      //@ts-ignore
      options: "getExperianceyears",
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
        group: 0,
      },
      name: "associatedCompany",
      type: "text",
      label: "Associate Company",
      placeholder: "Associate Company",
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
        componentType: "rateOfInt",
        group: 0,
      },
      name: "profitSharing",
      label: "Profit Sharing",
      placeholder: "Profit Sharing",
      required: true,
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
        componentType: "currency",
        group: 0,
      },
      name: "netWorth",
      label: "Net Worth",
      placeholder: "Net Worth",
      required: false,
      defaultValue: "",

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
      name: "responsibility",
      required: true,
      label: "Responsibility",
      maxLength: 500,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      multiline: true,
      rowsMax: 4,
      rows: 4,
    },

    {
      render: {
        componentType: "arrayField",
        group: 1,
      },
      name: "contactDetails",
      label: "Contact Details",
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
            group: 1,
          },
          name: "lineNo",
        },

        {
          render: {
            componentType: "select",
            group: 1,
          },
          name: "addressType",
          label: "Address Type",
          placeholder: "Address Type",
          required: true,
          defaultValue: "X",
          //@ts-ignore
          options: "getIndividualAddressType",
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
          required: true,
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
          required: true,
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
          isReadOnly: true,
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
          isReadOnly: true,
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
          isReadOnly: true,
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
        group: 2,
      },
      name: "incomeDetails",
      label: "Income Details",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      removeRowFn: "deleteArrayFieldData",
      arrayFieldIDName: "lineNo",
      _fields: [
        {
          render: {
            //@ts-ignore
            componentType: "hidden",
            group: 1,
          },
          name: "lineNo",
        },
        {
          render: {
            componentType: "textField",
            group: 0,
          },

          name: "incomeYear",
          label: "Year of Income",
          placeholder: "Year of Income",
          required: true,
          GridProps: {
            xs: 12,
            md: 6,
            sm: 6,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "currency",
            group: 1,
          },
          name: "incomeAmount",
          label: "Income Amount",
          placeholder: "Income Amount",
          required: true,
          defaultValue: "",
          GridProps: {
            xs: 12,
            md: 6,
            sm: 6,
          },
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
        group: 3,
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
