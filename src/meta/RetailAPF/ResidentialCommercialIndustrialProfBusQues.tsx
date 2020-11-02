import { MetaDataType } from "components/dyanmicForm/types";
import { getPropertyCity, getMiscVal } from "meta/fns";

export const ResidentialCommercialIndustrialProfBusQues: MetaDataType = {
  form: {
    name: "questions1-1",
    label: "Questionnaire",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    navigation: {
      nextPage: "/",
    },
    render: {
      ordering: "auto",
      renderType: "stepper",
      groups: ["Step 1"],
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
      //1.PAN_NUMBER [step:1]
      render: {
        componentType: "inputMask",
        group: 0,
      },
      name: "panNumber",
      type: "text",
      label: "Pan Card Number",
      placeholder: "Pan Card Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Pan Number is required"] },
          {
            name: "matches",
            params: [
              /([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/,
              "Please enter valid Pan Card Number",
            ],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      MaskProps: {
        mask: /^\w+$/,
        prepare: function (str) {
          return str.toUpperCase();
        },
        lazy: true,
      },
    },

    {
      //2.AADHAR_NUMBER [step:1]
      render: {
        componentType: "inputMask",
        group: 0,
      },
      name: "aadharNumber",
      type: "text",
      label: "Aadhar Card Number",
      placeholder: "Aadhar Card Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["Aadhar Number is required"] },
          {
            name: "matches",
            params: [/^\d{4}\d{4}\d{4}$/, "Please enter valid Aadhar Number"],
          },
        ],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      MaskProps: {
        mask: "0000` 0000` 0000",
        lazy: true,
      },
    },
    {
      //3.PROPERTY_CITY [step:1]
      render: {
        componentType: "select",
        group: 0,
      },
      name: "proprtyCity",
      label: "Property City",
      placeholder: "Property City",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getPropertyCity,
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Propert City is required";
        }
      },
    },
    {
      //4.TYPE_OF_PROPERTY [step:1]
      render: {
        componentType: "select",
        group: 0,
      },
      name: "proprtyType",
      label: "Type of Property",
      placeholder: "Type of Property",
      required: true,
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("PROPERTY_TYPE"),
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Select Valid Option";
        }
      },
    },
    //5.PRESENT_RESIDENTIAL_STATUS [step:1]
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "presentResidentialStatus",
      label: "Present Residential Status",
      defaultValue: "0",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      options: getMiscVal("RESI_STATUS"),
      runPostValidationHookAlways: true,
      // validate: (fieldData) => {
      //   if (fieldData.value === "0") {
      //     return "Select Valid Option";
      //   }
      // },
    },

    //6 Name of scheme [step:1]
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "schemeName",
      type: "text",
      label: "Name of scheme",
      placeholder: "Name of scheme",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    //7.Register with RERA [step:1]
    {
      render: {
        componentType: "select",
        group: 0,
      },
      name: "registerWithRera",
      label: "Register with RERA",
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
              { label: "Select option", value: "0" },
              { label: "Yes", value: "Y" },
              { label: "No", value: "N" },
            ]);
          }, 1000);
        });
      },
      runPostValidationHookAlways: true,
      validate: (fieldData) => {
        if (fieldData.value === "0") {
          return "Propert City is required";
        }
      },
    },

    //8.RERA Number [step:1]
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "reraNo",
      type: "text",
      label: "RERA Number",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      // dependentFields: ["registerWithRera"],
      // shouldExclude: (_, dependentValues) => {
      //   if (dependentValues?.registerWithRera?.value === "Y") {
      //     return false;
      //   }
      //   return true;
      // },
    },

    //9. BUSSINESS_ADDRESS [screen:1]
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "businessAddress",
      type: "text",
      label: "Address of Business",
      placeholder: "Address of Business",
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This field is required"] }],
      },
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    // //10.type of project [screen:1]
    // {
    //   render: {
    //     componentType: "select",
    //     group: 0,
    //   },
    //   name: "typeProject",
    //   label: "Type of Project",
    //   required: true,
    //   schemaValidation: {
    //     type: "string",
    //     rules: [{ name: "required", params: ["Type of Project is required"] }],
    //   },
    //   defaultValue: "xx",
    //   options: getMiscVal("PROJECT_TYPE"),
    //   GridProps: {
    //     xs: 12,
    //     md: 3,
    //     sm: 3,
    //   },
    // },
  ],
};

// developer file will remain same as New Home Loan
