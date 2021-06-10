import { MetaDataType } from "components/dyanmicForm/types";
export const moveToLeadMetaData: MetaDataType = {
  form: {
    name: "moveToLead",
    label: "Move Inquiry To Lead",
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
        componentType: "select",
      },
      name: "productCategory",
      label: "Product Category",
      defaultValue: "00",
      //@ts-ignore
      options: "getProductCategoryList",
      required: true,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "remarks",
      label: "Remarks",
      required: true,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
    },
  ],
};
