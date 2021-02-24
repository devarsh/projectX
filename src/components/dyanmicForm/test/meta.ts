import { MetaDataType } from "components/dyanmicForm";

const GeneralDetailsMetaData: any = {
  form: {
    name: "123456",
    label: "General Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        "0": "Address Details",
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
        componentType: "arrayField",
        group: 0,
      },
      name: "addressDetails",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "pincode",
          },
          name: "pincode",
          label: "Residence Pincode",
          placeholder: "Residence pincode",
          postValidationSetCrossFieldValues: "postValidationSetPincodeDtl",
          runPostValidationHookAlways: true,
          required: true,
          defaultValue: "",
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
          name: "location",
          label: "Location",
          placeholder: "Location",
          required: true,
          dependentFields: ["pincode"],
          options: "getPincode",
          validate: "getValidateValue",
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

export default GeneralDetailsMetaData;
