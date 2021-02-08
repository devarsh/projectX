import { MetaDataType } from "components/dyanmicForm/types";

export const ManagementInformationMetaData: MetaDataType = {
  form: {
    refID: 1667,
    name: "12300001",
    label: "Personally Identifiable Information",
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
        componentType: "select",
      },
      name: "salutation",
      label: "Salutation",
      placeholder: "Select Salutation",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getSalutation",
      runPostValidationHookAlways: true,
      validate: "getValidateValue",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "First Name",
      required: true,
      validate: "getValidateValue",
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
      name: "middleName",
      type: "text",
      label: "Middle Name",
      placeholder: "Middle Name",
      required: false,

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
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Last Name",
      required: true,
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "datePicker",
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
        componentType: "numberFormat",
      },
      name: "mobileNo",
      type: "text",
      label: "Mobile No",
      placeholder: "Mobile No",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Mobile No is required."] },
          { name: "min", params: [10, "Mobile No should be 10 digit."] },
          { name: "max", params: [10, "Mobile No should be 10 digit."] },
        ],
      },
      FormatProps: {
        format: "##########",
      },
      StartAdornment: "+91",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
      },
      name: "alternateMobileNo",
      type: "text",
      label: "Alternate Mobile No",
      placeholder: "Alternate Mobile No",
      required: false,
      FormatProps: {
        format: "##########",
      },
      StartAdornment: "+91",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "numberFormat",
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
      },
      name: "email",
      type: "text",
      label: "Email",
      placeholder: "Email",
      required: true,
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
      },
      name: "pan_no",
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
      },
      name: "passportNumber",
      type: "text",
      label: "Passport Number",
      placeholder: "Passport Number",
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
      name: "drivingLicence",
      type: "text",
      label: "Driving License Number",
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
      },
      name: "dinLlpinNo",
      type: "text",
      label: "Din LLPIN Number",
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
        group: 1,
      },
      name: "educationQualification",
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
        group: 1,
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
      },
      name: "associatedCompany",
      type: "text",
      label: "Associate Company",
      placeholder: "Associate Company",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "landmark",
      type: "text",
      label: "Landmark",
      placeholder: "Landmark",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Landmark is required."] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 1,
      },
      name: "profitSharing",
      label: "Profit Sharing",
      placeholder: "Profit Sharing",
      required: true,
      defaultValue: "",

      FormatProps: {
        format: "################",
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
        componentType: "currency",
        group: 1,
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
        group: 1,
      },
      name: "responsibility",
      required: true,
      label: "Responsibility",
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
        group: 1,
      },
      name: "incomeDetails",
      label: "Income Details",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      removeRowFn: "demp",
      _fields: [
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
          name: "income",
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
  ],
};
