import { MetaDataType } from "./types";

const metaData: MetaDataType = {
  form: {
    name: "dynamic",
    label: "Dynamic Form",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "sequence",
      renderType: "stepper",
      gridConfig: {
        item: {
          xs: 12,
          sm: 3,
          md: 3,
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
        variant: "outlined",
      },
      select: {
        variant: "outlined",
        autoWidth: true,
      },
      datePicker: {
        inputVariant: "outlined",
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
        group: "Personal Details",
        sequence: 0,
      },
      name: "country",
      label: "Country",
      required: true,
      options: (dependentValues) => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            res([
              { label: "India", value: 1 },
              { label: "Usa", value: 2 },
              { label: "Canada", value: 3 },
            ]);
          }, 5000);
        });
      },
    },
    {
      render: {
        componentType: "select",
        group: "Personal Details",
        sequence: 0,
      },
      name: "state",
      label: "State",
      required: true,
      dependentFields: ["country"],
      options: (dependentValues) => {
        console.log(dependentValues);
        return new Promise((res) => {
          setTimeout(() => {
            let value = dependentValues?.country?.value;
            value = Boolean(value) ? value : undefined;
            if (value == 1) {
              res([
                { label: "Gujarat", value: 1 },
                { label: "Maharashtra", value: 2 },
                { label: "Rajasthan", value: 3 },
              ]);
            } else if (value == 2) {
              res([
                { label: "California", value: 1 },
                { label: "Texas", value: 2 },
                { label: "Florida", value: 3 },
              ]);
            } else if (value == 3) {
              res([
                { label: "Ontario", value: 1 },
                { label: "Alberta", value: 2 },
                { label: "Ottawa", value: 3 },
              ]);
            } else {
              res([{ label: "unknown", value: undefined }]);
            }

            res([{ label: "unknown", value: undefined }]);
          }, 3000);
        });
      },
    },

    {
      render: {
        componentType: "textField",
        group: "Personal Details",
        sequence: 1,
      },
      name: "firstName",
      label: "First Name",
      type: "email",
      defaultValue: "",
      schemaValidation: {
        type: "string",
        rules: [
          { name: "required", params: ["First Name is required"] },
          { name: "email", params: ["Not a valid email"] },
        ],
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

//icicic bank technical person 9892351566
