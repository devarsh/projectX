import { MetaDataType } from "components/dyanmicForm/types";
export const branchAssignMetadata: MetaDataType = {
  form: {
    name: "assignBranchToInquiry",
    label: "Assign Branch",
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
      name: "branchCode",
      label: "Branch To Assign",
      required: true,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      //@ts-ignore
      options: "getBranchList",
      validate: "getValidateValue",
    },
  ],
};
