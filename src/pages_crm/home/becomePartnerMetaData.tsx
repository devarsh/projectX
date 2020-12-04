import { MetaDataType } from "components/dyanmicForm/types";

const becomePartnerMetaData: MetaDataType = {
  form: {
    name: "becomePartner",
    label: "Become a Partner",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
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
        componentType: "toggleButtonGroup",
        group: 0,
      },
      name: "partner_type",
      label: "Partner Type",
      defaultValue: "I",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: [
        {
          label: "Individual",
          value: "I",
          iconName: "person",
        },
        { label: "Corporate", value: "C", iconName: "business" },
      ],
      exclusive: true,
    },

    {
      render: {
        componentType: "spacer",
      },
      name: "spacer",
      GridProps: {
        xs: 12,
        md: 9,
        sm: 9,
      },
      HiddenProps: {
        smDown: true,
      },
    },

    {
      render: {
        componentType: "select",
      },
      name: "salutation",
      label: "Salutation",
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
      name: "firstname",
      type: "text",
      label: "First Name[As Per PAN Card]",
      required: true,
      //@ts-ignore
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
      name: "middlename",
      label: "Middle Name",
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
      name: "lastname",
      label: "Last Name",
      required: true,
      type: "text",
      //@ts-ignore
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
      name: "companyName",
      type: "text",
      label: "Company Name",
      required: true,
      //@ts-ignore
      schemaValidation: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.partner_type?.value === "C") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "gstNo",
      type: "text",
      label: "GST No",
      required: true,
      //@ts-ignore
      schemaValidation: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.partner_type?.value === "C") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "address",
      label: "Address",
      required: true,
      type: "text",
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
      name: "landmark",
      label: "Landmark",
      required: true,
      type: "text",
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
      name: "pincode",
      label: "Residence Pincode",
      required: true,
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Residence Pincode is required"] },
          { name: "min", params: [6, "Residence Pincode should be 6 digit."] },
          { name: "max", params: [6, "Residence Pincode should be 6 digit."] },
          {
            name: "matches",
            params: [/^\d{6}/, "Please enter valid Pincode."],
          },
        ],
      },
      FormatProps: {
        format: "######",
      },
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
      required: true,
      defaultValue: "0",
      runPostValidationHookAlways: true,
      //@ts-ignore
      postValidationSetCrossFieldValues: "getLocationDtl",

      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validate: "getValidateValue",
    },

    {
      render: {
        componentType: "textField",
      },
      name: "city",
      label: "City",
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
      isReadOnly: true,
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
      name: "inception_date",
      label: "Date of Incorporation",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",

      schemaValidation: {
        type: "date",
        rules: [
          { name: "required", params: ["Date of Incorporation is required"] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.partner_type?.value === "C") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "dob",
      },
      name: "birthdate",
      label: "Date Of Birth",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",

      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.partner_type?.value === "I") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "datePicker",
      },
      name: "marraige_date",
      label: "Marriage Anniversary",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",

      schemaValidation: {
        type: "date",
        rules: [{ name: "required", params: ["Anniversary date is required"] }],
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
        componentType: "phoneNumber",
      },
      name: "mobile",
      type: "text",
      label: "Mobile No",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Mobile No is required"] },
          { name: "min", params: [10, "Mobile No should be 10 digit."] },
          { name: "max", params: [10, "Mobile No should be 10 digit."] },
          {
            name: "matches",
            params: [/^\d{10}/, "Please enter valid Mobile No."],
          },
        ],
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
        //@ts-ignore
        componentType: "email",
      },
      name: "email",
      type: "text",
      label: "Email",
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
        componentType: "panCard",
      },
      name: "pan_no",
      type: "text",
      label: "Pan Card Number",
      required: true,
      validate: "getValidatePanNumber",
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
      name: "aadharNumber",
      type: "text",
      label: "Aadhar Card Number",
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
      name: "ifsc_code",
      type: "text",
      label: "IFSC Code",
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
      name: "bank_name",
      type: "text",
      label: "Bank Name",
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
      name: "acct_no",
      type: "text",
      label: "Bank Account No",
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
        componentType: "select",
      },
      name: "bank_acct_type",
      label: "Bank Account Type",
      required: true,
      defaultValue: "0",
      //@ts-ignore
      options: "getAccountType",
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
      name: "acct_holdr_name",
      type: "text",
      label: "Account Holder Name",
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
        componentType: "select",
      },
      name: "education_qualifi",
      label: "Education Qualification",
      required: true,
      defaultValue: "0",
      //@ts-ignore
      options: "getEducationDtl",
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.partner_type?.value === "I") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "select",
      },
      name: "channelType",
      label: "Select Channel Type",
      required: true,
      defaultValue: "0",
      //@ts-ignore
      options: "getChannelType",
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
      },
      name: "primary_busi_intrest",
      label: "Primary Business Interest",
      required: true,
      defaultValue: "0",
      //@ts-ignore
      options: "getBusinessInterest",
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
      },
      name: "nominee_flag",
      label: "Do you want to add Nominee Details",
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getYesOrNoOptions",
      dependentFields: ["partner_type"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.partner_type?.value === "I") {
          return false;
        }
        return true;
      },
      runPostValidationHookAlways: true,
    },

    {
      render: {
        componentType: "textField",
      },
      name: "nominee_name",
      type: "text",
      label: "Nominee Name",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validate: "getValidateValue",
      dependentFields: ["nominee_flag"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.nominee_flag?.value === "Y") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "dob",
      },
      name: "nomi_birth_date",
      label: "Date of Birth",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["nominee_flag"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.nominee_flag?.value === "Y") {
          return false;
        }
        return true;
      },
    },

    {
      render: {
        componentType: "select",
      },
      name: "nomi_relation",
      label: "Relationship",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getRelationship",
      validate: "getValidateValue",
      dependentFields: ["nominee_flag"],
      shouldExclude: (_, dependentValues) => {
        if (dependentValues?.nominee_flag?.value === "Y") {
          return false;
        }
        return true;
      },
    },
  ],
};

export default becomePartnerMetaData;
