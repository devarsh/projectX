import { MetaDataType } from "components/dyanmicForm/types";

const metaData: MetaDataType = {
  form: {
    name: "12300001",
    label: "Retail Home Loan",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: { 0: "Personal Details", 1: "Contact Details" },
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
      name: "product_type",
      label: "Product Type",
      placeholder: "Product Type",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getProductType",
      runPostValidationHookAlways: true,
      validate: {
        conditions: {
          all: [
            {
              fact: "currentField",
              path: "$.value",
              operator: "equal",
              value: "X",
            },
          ],
        },
        success: "is required salutation",
        failure: "",
      },
    },

    {
      render: {
        componentType: "spacer",
        group: 0,
      },
      name: "spacer",
      label: "spacer",
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
        componentType: "autocomplete",
        group: 0,
      },
      name: "city",
      label: "City",
      placeholder: "City",
      required: true,
      defaultValue: "X",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      //@ts-ignore
      options: "getPropertyCity",
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "firstName",
      type: "text",
      label: "First Name[As Per PAN Card]",
      required: true,
      placeholder: "First Name[As Per PAN Card]",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["First Name is required"] }],
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
      name: "middleName",
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
        group: 0,
      },
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Last Name is required."] }],
      },
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
      placeholder: "Gender",
      required: true,
      type: "text",
      defaultValue: "X",
      isReadOnly: () => true,
      //@ts-ignore
      options: "getGenderList",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "datePicker",
        group: 0,
      },
      name: "dob",
      label: "Date Of Birth",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",
      schemaValidation: {
        type: "date",
        rules: [
          { name: "required", params: ["Date of Birth is required."] },
          { name: "typeError", params: ["Please enter valid Date of Birth."] },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      validationRun: "onChange",
    },
    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "loanAmount",
      type: "text",
      label: "Your Desired Loan Amount",
      placeholder: "Your Desired Loan Amount",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          {
            name: "required",
            params: ["Your Desired Loan Amount is required."],
          },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
        decimalScale: 0,
        maxLength: 13,
      },
      validationRun: "onChange",
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
          {
            name: "matches",
            params: [/^\d{10}/, "Please enter valid Mobile No."],
          },
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
        componentType: "textField",
        group: 1,
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
        componentType: "select",
        group: 1,
      },
      name: "employementStatus",
      label: "How Are You Currently Employed",
      placeholder: "How Are You Currently Employed",
      required: true,
      defaultValue: "X",
      //@ts-ignore
      options: "getRetailEmployee",
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
      name: "pincode",
      label: "Residence Pincode",
      placeholder: "Residence Pincode",
      required: true,
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Residence Pincode is required."] },
          { name: "min", params: [6, "Residence Pincode should be 6 digit."] },
          { name: "max", params: [6, "Residence Pincode should be 6 digit."] },
          {
            name: "matches",
            params: [
              /^\d{6}/,
              "Please enter valid Pincode. ldskjfdgkljgdfkl dslfjdsfkljfdgkl ldsfjdklsjdfgkl",
            ],
          },
        ],
      },
      FormatProps: {
        format: "######",
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      maxLength: 6,
    },
    {
      render: {
        componentType: "select",
        group: 1,
      },
      name: "location",
      label: "Location",
      placeholder: "Location",
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
        group: 1,
      },
      name: "city",
      label: "City",
      placeholder: "City",
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
        group: 1,
      },
      name: "district",
      label: "District",
      placeholder: "District",
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
      name: "state",
      label: "State",
      placeholder: "State",
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
      name: "country",
      label: "Country",
      placeholder: "Country",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
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
    {
      render: {
        componentType: "textField",
        group: 1,
      },
      name: "agreed",
      required: true,
      label: "Wow",
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
      name: "contactDetails2",
      label: "Other details",
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
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type",
          label: "Other Type",
          placeholder: "Other Type",
          required: true,
          defaultValue: "X",
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
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type3",
          label: "Product Name",
          placeholder: "Product Name",
          required: true,
          defaultValue: "X",
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
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type4",
          label: "Product Name",
          placeholder: "Product Name",
          required: true,
          defaultValue: "X",
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
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type5",
          label: "Product Name",
          placeholder: "Product Name",
          required: true,
          defaultValue: "X",
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
      name: "contactDetails",
      label: "Contact Details",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      _fields: [
        {
          render: {
            componentType: "textField",
            group: 0,
          },
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type",
          label: "Product Type",
          placeholder: "Product Type",
          required: true,
          defaultValue: "X",
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
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type2",
          label: "Product Name",
          placeholder: "Product Name",
          required: true,
          defaultValue: "X",
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
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type3",
          label: "Product Name",
          placeholder: "Product Name",
          required: true,
          defaultValue: "X",
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
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type4",
          label: "Product Name",
          placeholder: "Product Name",
          required: true,
          defaultValue: "X",
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
          schemaValidation: {
            type: "string",
            rules: [
              { name: "required", params: ["Residence Pincode is required."] },
              {
                name: "min",
                params: [6, "Residence Pincode should be 6 digit."],
              },
              {
                name: "max",
                params: [6, "Residence Pincode should be 6 digit."],
              },
            ],
          },
          name: "product_type5",
          label: "Product Name",
          placeholder: "Product Name",
          required: true,
          defaultValue: "X",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },
  ],
};

export default metaData;

/*
{
      render: {
        componentType: "arrayField2",
        group: 1,
      },
      name: "address",
      template: { street1: "1", street2: "2", stree3: "3" },
      fieldMeta: {
        street1: {
          render: {
            componentType: "checkbox",
            group: 1,
          },
          name: "agreed",
          required: true,
          label:
            "I have read and agreed to the Terms of Use and hereby appoint Ratnaafin as my authorised representative to receive my credit information from Cibil/ Equifax/ Experian/ Highmark (bureau).",
          GridProps: {
            xs: 12,
            md: 12,
            sm: 12,
          },
        },
      },
    },
*/
/*
{
          render: {
            componentType: "arrayField",
            group: 0,
          },
          name: "nested",
          label: "Demo God",
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
              schemaValidation: {
                type: "string",
                rules: [
                  {
                    name: "required",
                    params: ["Residence Pincode is required."],
                  },
                  {
                    name: "min",
                    params: [6, "Residence Pincode should be 6 digit."],
                  },
                  {
                    name: "max",
                    params: [6, "Residence Pincode should be 6 digit."],
                  },
                ],
              },
              name: "demo",
              label: "Demo Inner",
              placeholder: "Demo Inner",
              required: true,
              defaultValue: "X",
              GridProps: {
                xs: 12,
                md: 3,
                sm: 3,
              },
            },
          ],
        },
*/
