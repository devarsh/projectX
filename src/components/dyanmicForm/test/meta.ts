import { MetaDataType } from "components/dyanmicForm/types";
const BussinessDetailsMetadata: MetaDataType = {
  form: {
    name: "leadBusinessDetails",
    label: "Lead Business Details",
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
      name: "companyHistory",
      label: "Company Brief History",
      placeholder: "Company Brief History",
      defaultValue: "",
      maxLength: 250,
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
      name: "companyService",
      label: "Company Services",
      placeholder: "Company Services",
      defaultValue: "",
      maxLength: 250,
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
      name: "companyService",
      label: "Company Services",
      placeholder: "Company Services",
      defaultValue: "",
      maxLength: 250,
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
      name: "companyService",
      label: "End Use of the Products",
      placeholder: "End Use of the Products",
      defaultValue: "",
      maxLength: 250,
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
      name: "constitutionOfBusiness",
      label: "Constitution of Business",
      placeholder: "Constitution of Business",
      //@ts-ignore
      option: "getFirmType",
      validate: "getValidateValue",
      required: true,
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
      placeholder: "Ownership of Factory / Business Premises",
      required: true,
      //@ts-ignore
      options: "getBusinessPremise",
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
      placeholder: "Existing Type of Industry",
      required: true,
      //@ts-ignore
      options: "getIndustryType",
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
      name: "typeOfSubIndustry",
      label: "Existing Type of Sub Industry",
      placeholder: "Existing Type of Sub Industry",
      required: true,
      //@ts-ignore
      options: "getIndustrySubType",
      dependentFields: "typeOfIndustry",
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
      name: "existingBusinessNature",
      label: "Nature of Existing Business",
      placeholder: "Nature of Existing Business",
      required: true,
      //@ts-ignore
      options: "getBusinessNature",
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
      name: "existingBusinessOtherNature",
      label: "Nature of Existing Other Business",
      placeholder: "Nature of Existing Other Business",
      required: true,
      //@ts-ignore
      options: "getBusinessNature",
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
      name: "proposedBusiness",
      label: "Proposed business",
      placeholder: "Proposed business",
      required: true,
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
      required: true,
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
      required: true,
      validate: "validatePanNumber",
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
        componentType: "textField",
      },
      name: "cmrRanking",
      type: "text",
      label: "CMR Ranking",
      placeholder: "CMR Ranking",
      required: true,
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
          options: "getAddressType",
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
            componentType: "numberFormat",
            group: 1,
          },
          name: "income",
          label: "Income Amount",
          placeholder: "Income Amount",
          required: true,
          defaultValue: "",

          FormatProps: {
            format: "################",
          },
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
        componentType: "checkbox",
        group: 1,
      },
      name: "dutyrgf",
      required: true,
      label:
        "I have read and agreed to the Terms of Use and hereby appoint Ratnaafin as my authorised representative to receive my credit information from Cibil/ Equifax/ Experian/ Highmark (bureau).",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
};

export default BussinessDetailsMetadata;
