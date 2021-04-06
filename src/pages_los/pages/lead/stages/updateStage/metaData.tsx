import { MetaDataType } from "components/dyanmicForm/types";
export const stageChangeMetaData: MetaDataType = {
  form: {
    name: "updateLeadStage",
    label: "Change Lead Stage",
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
      name: "stageCode",
      label: "Lead Stage",
      required: true,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
      //@ts-ignore
      options: "getLeadStage",
      validate: "getValidateValue",
    },
    {
      render: {
        componentType: "select",
      },
      name: "subStageCode",
      label: "Lead Sub Stages",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      disableCaching: true,
      //@ts-ignore
      dependentFields: ["stageCode"],
      //@ts-ignore
      options: "getLeadSubStageCode",
      validate: "getValidateValue",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "remarks",
      label: "Remarks",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
  ],
};
