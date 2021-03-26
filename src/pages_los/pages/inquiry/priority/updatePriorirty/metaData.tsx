import { MetaDataType } from "components/dyanmicForm/types";
export const priorityChangeMetaData: MetaDataType = {
  form: {
    name: "updatePriorityForInquiry",
    label: "Change Priority",
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
      name: "priority",
      label: "Priority",
      required: true,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
      //@ts-ignore
      options: "getLeadPriority",
      validate: "getValidateValue",
    },
    {
      render: {
        componentType: "spacer",
      },
      name: "priorityspacer",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      HiddenProps: {
        xsDown: true,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "enableHoldDays",
      label: "Change Priority Hold Days",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      defaultValue: "N",
      options: [
        { label: "Yes", value: "Y" },
        { label: "No", value: "N" },
      ],
    },
    {
      render: {
        componentType: "numberFormat",
      },
      name: "priorityDays",
      label: "Priority Hold Days",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      FormatProps: {
        format: "##",
        isAllowed: (values) => {
          if (values.floatValue === 0) {
            return false;
          }
          return true;
        },
      },
      dependentFields: ["enableHoldDays"],
      isReadOnly: "readOnlyPriorityHoldDays",
    },
    {
      render: {
        componentType: "textField",
      },
      name: "priorityRemarks",
      label: "Remarks",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
  ],
};
