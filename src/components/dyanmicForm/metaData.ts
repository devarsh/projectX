import { MetaDataType } from "./types";

const metaData: MetaDataType = {
  form: {
    name: "rhl-1",
    label: "Retail Home Loan",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "stepper",
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
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
        group: "Personal Details",
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
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Salutation", value: "0" },
              { label: "Mr", value: "1" },
              { label: "Mrs", value: "2" },
              { label: "Miss", value: "3" },
            ]);
          }, 1000);
        });
      },
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Salutation is Required";
        }
      },
      postValidationSetCrossFieldValues: (field) => {
        return new Promise((res) => {
          if (field.value === "1") {
            res({
              gender: {
                value: "1",
              },
              firstName: {
                value: "",
              },
            });
          } else if (field.value === "2" || field.value === "3") {
            res({
              gender: {
                value: "2",
              },
            });
          } else {
            res({
              gender: {
                value: "0",
              },
            });
          }
        });
      },
    },
    {
      render: {
        componentType: "textField",
        group: "Personal Details",
      },
      name: "firstName",
      type: "text",
      label: "First Name[As Per PAN Card]",
      required: true,
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
        group: "Personal Details",
      },
      name: "middleName",
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
        group: "Personal Details",
      },
      name: "lastName",
      label: "Last Name",
      required: true,
      type: "text",
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["Last Name is required"] }],
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
        group: "Personal Details",
      },
      name: "gender",
      label: "Gender",
      required: true,
      type: "text",
      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Gender", value: "0" },
              { label: "Male", value: "1" },
              { label: "Female", value: "2" },
            ]);
          }, 1000);
        });
      },
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Gender is Required";
        }
      },
    },
    {
      render: {
        componentType: "datePicker",
        group: "Personal Details",
      },
      name: "dob",
      label: "Date Of Birth",
      required: true,
      placeholder: "dd/mm/yyyy",
      format: "dd/MM/yyyy",

      schemaValidation: {
        type: "date",
        rules: [
          { name: "typeError", params: ["Date of Birth is required"] },
          { name: "required", params: ["Date of Birth is required"] },
        ],
      },
    },
    {
      render: {
        componentType: "numberFormat",
        group: "Personal Details",
      },
      name: "loanAmount",
      type: "text",
      label: "Your Desired Loan Amount",
      required: true,

      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Loan Amount is required"] },
          { name: "required", params: ["Loan Amount is required"] },
        ],
      },
      enableNumWords: true,
      FormatProps: {
        thousandSeparator: true,
        prefix: "₹",
        thousandsGroupStyle: "lakh",
        allowNegative: false,
        allowLeadingZeros: false,
      },
      validationRun: "onChange",
    },
    {
      render: {
        componentType: "textField",
        group: "Contact Details",
      },
      name: "mobileNo",
      type: "text",
      label: "Mobile No",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Mobile No is required"] },
          { name: "required", params: ["Mobile No is required"] },
        ],
      },
      StartAdornment: "+91",
    },
    {
      render: {
        componentType: "textField",
        group: "Contact Details",
      },
      name: "email",
      type: "text",
      label: "Email",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "typeError", params: ["Email is required"] },
          { name: "required", params: ["Email is required"] },
        ],
      },
    },
    {
      render: {
        componentType: "select",
        group: "Contact Details",
      },
      name: "employementStatus",
      label: "How Are You Currently Employed",
      required: true,
      defaultValue: "0",
      options: () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { label: "Select Employement", value: "0" },
              { label: "Self Employed Business", value: "1" },
              { label: "Salaried", value: "2" },
              { label: "Self Employed Professional", value: "3" },
              { label: "Self Employed Developer", value: "4" },
            ]);
          }, 1000);
        });
      },
    },
    {
      render: {
        componentType: "textField",
        group: "Contact Details",
      },
      name: "pincode",
      label: "Residence Pincode",
      required: true,
      defaultValue: "",
      postValidationSetCrossFieldValues: (field) => {
        let myOptions: any = [];
        return new Promise((res) => {
          const myObj = {
            city: {
              value: "Ahmedabad",
            },
            state: {
              value: "Gujarat",
            },
            district: {
              value: "Ahmedabad",
            },
            country: {
              value: "India",
            },
            location: {
              value: "1",
              options: [{ value: "0", label: "Select Area" }],
            },
          };
          if (field.value === "380015") {
            myOptions = [
              { value: "1", label: "Shyamal" },
              {
                value: "2",
                label: "Manekbaug",
              },
              { value: "3", label: "Vejalpur" },
            ];
          } else if (field.value === "380006") {
            myOptions = [
              { value: "1", label: "Gulbai Tekra" },
              {
                value: "2",
                label: "C.G Road",
              },
              { value: "3", label: "Vejalpur" },
            ];
          }
          const locationObj = myObj["location"];
          locationObj.options = [...locationObj.options, ...myOptions];
          res({
            ...myObj,
            locationObj,
          });
        });
      },
    },
    {
      render: {
        componentType: "select",
        group: "Contact Details",
      },
      name: "location",
      label: "Location",
      required: true,
    },
    {
      render: {
        componentType: "textField",
        group: "Contact Details",
      },
      name: "city",
      label: "City",
    },
    {
      render: {
        componentType: "textField",
        group: "Contact Details",
      },
      name: "district",
      label: "District",
    },
    {
      render: {
        componentType: "textField",
        group: "Contact Details",
      },
      name: "state",
      label: "State",
    },
    {
      render: {
        componentType: "textField",
        group: "Contact Details",
      },
      name: "country",
      label: "Country",
    },
    {
      render: {
        componentType: "checkbox",
        group: "Contact Details",
      },
      name: "agreed",
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

export default metaData;

/*
{
      render: {
        group: "groupB",
        componentType: "array",
        sequence: 0,
      },
      name: "contact",
      label: "Contact",
      schemaValidation: {
        type: "array",
      },
      template: [
        {
          render: {
            componentType: "text",
          },
          name: "contactNo",
          label: "Contact No",
        },
        {
          render: {
            componentType: "text",
          },
          name: "contactPerson",
          label: "Contact Person",
        },
      ],
    },
    */
