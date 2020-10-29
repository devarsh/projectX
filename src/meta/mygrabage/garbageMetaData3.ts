//@ts-nocheck
import { MetaDataType } from "components/dyanmicForm/types";

const metaData: MetaDataType = {
  form: {
    name: "rhl-1",
    label: "Retail Home Loan",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "stepper",
      labels: {
        next: "Next",
        complete: "Complete",
        prev: "Back",
      },
      groups: ["Personal Details", "Contact Details", "Conditional"],
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
    },
  },
  fields: [
    {
      render: {
        componentType: "textField",
        group: 0,
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
  ],
};

export default metaData;
