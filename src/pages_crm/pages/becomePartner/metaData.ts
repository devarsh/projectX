import { MetaDataType } from "components/dyanmicForm/types";

export const becomePartnerMetaData: MetaDataType = {
  form: {
    name: "becomePartner",
    label: "Become a Partner",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "",
    refID: "3434",
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
      placeholder: "Select Salutation",
      required: true,
      defaultValue: "00",
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
      placeholder: "First Name[As Per PAN Card]",
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
      placeholder: "Middle Name",
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
      placeholder: "Last Name",
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
      name: "gstNo",
      type: "text",
      label: "GST No",
      placeholder: "Enter GST number",
      required: true,
      defaultValue: "",
      //@ts-ignore
      validate: "getValidateValue",
      runPostValidationHookAlways: true,
      //@ts-ignore
      postValidationSetCrossFieldValues: "getCompanyNameFromGST",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: "shouldExcludeBecomePartner",
    },

    {
      render: {
        componentType: "textField",
      },
      name: "companyName",
      type: "text",
      label: "Company Name",
      placeholder: "Company Name",
      required: true,
      //@ts-ignore
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: "shouldExcludeBecomePartner",
    },

    {
      render: {
        componentType: "textField",
      },
      name: "address",
      label: "Address",
      placeholder: "Enter address",
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
      defaultValue: "00",
      validate: "getValidateValue",
      runPostValidationHookAlways: true,
      //@ts-ignore
      postValidationSetCrossFieldValues: "postValidationSetPincodeDtl",
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
      dependentFields: ["pincode"],
      required: true,
      validate: "getValidateValue",
      //@ts-ignore
      options: "getPincode",
      defaultValue: "00",
      //@ts-ignore
      postValidationSetCrossFieldValues: "postValidationSetLocationDtl",
      disableCaching: true,
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

    {
      render: {
        componentType: "datePicker",
      },
      name: "inception_date",
      label: "Date of Incorporation",
      // required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",

      // schemaValidation: {
      //   type: "date",
      //   rules: [
      //     { name: "required", params: ["Date of Incorporation is required"] },
      //   ],
      // },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: "shouldExcludeBecomePartner",
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
      shouldExclude: "shouldExcludeBecomePartnerIndividual",
    },

    {
      render: {
        componentType: "datePicker",
      },
      name: "marraige_date",
      label: "Marriage Anniversary",
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
        //@ts-ignore
        componentType: "phoneNumber",
      },
      name: "mobile",
      type: "text",
      label: "Mobile No",
      placeholder: "Mobile number",
      required: true,
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
          { name: "required", params: ["Email is required"] },
          { name: "email", params: ["Not a valid email"] },
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
      validate: "validatePanNumber",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    // {
    //   render: {
    //     //@ts-ignore
    //     componentType: "aadharCard",
    //   },
    //   name: "aadharNumber",
    //   type: "text",
    //   label: "Aadhar Card Number",
    //   required: true,
    //   GridProps: {
    //     xs: 12,
    //     md: 3,
    //     sm: 3,
    //   },
    // },

    {
      render: {
        componentType: "textField",
      },
      name: "ifsc_code",
      type: "text",
      label: "IFSC Code",
      placeholder: "IFSC code",
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
      placeholder: "Bank name",
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
      placeholder: "A/C number",
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
      placeholder: "A/C type",
      required: true,
      defaultValue: "00",
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
      placeholder: "A/C holder name",
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
      placeholder: "Education qualification",
      required: true,
      defaultValue: "00",
      //@ts-ignore
      options: "getEducationDtl",
      validate: "getValidateValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["partner_type"],
      shouldExclude: "shouldExcludeBecomePartnerIndividual",
    },

    {
      render: {
        componentType: "select",
      },
      name: "channelType",
      label: "Select Channel Type",
      placeholder: "Select channel type",
      required: true,
      defaultValue: "00",
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
      placeholder: "Primary business interest",
      required: true,
      defaultValue: "00",
      multiple: true,
      showCheckbox: true,
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
      placeholder: "Add nominee",
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getYesOrNoOptions",
      dependentFields: ["partner_type"],
      shouldExclude: "shouldExcludeBecomePartnerIndividual",
      runPostValidationHookAlways: true,
    },

    {
      render: {
        componentType: "textField",
      },
      name: "nominee_name",
      type: "text",
      label: "Nominee Name",
      placeholder: "Nominee name",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validate: "getValidateValue",
      dependentFields: ["nominee_flag", "partner_type"],
      shouldExclude: "shouldExcludeBecomePartnerNominee",
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
      dependentFields: ["nominee_flag", "partner_type"],
      shouldExclude: "shouldExcludeBecomePartnerNominee",
    },

    {
      render: {
        componentType: "select",
      },
      name: "nomi_relation",
      label: "Relationship",
      placeholder: "relationship with nominee",
      required: true,
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getRelationship",
      validate: "getValidateValue",
      dependentFields: ["nominee_flag", "partner_type"],
      shouldExclude: "shouldExcludeBecomePartnerNominee",
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "nomineeMobile",
      type: "text",
      label: "Mobile No",
      placeholder: "Nomineee mobile number",

      FormatProps: {
        format: "##########",
        isAllowed: (values) => {
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },

      StartAdornment: "+91",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      dependentFields: ["nominee_flag", "partner_type"],
      shouldExclude: "shouldExcludeBecomePartnerNominee",
    },
  ],
};
