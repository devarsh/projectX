import { MetaDataType } from "components/dyanmicForm/types";
export const monthlyTargetFormMetaDataEdit: MetaDataType = {
  form: {
    name: "monthlyTargetForm",
    label: "Monthly Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "simple",
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
        componentType: "hidden",
        group: 0,
      },
      name: "lineNo",
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
      name: "targetMonth",
      label: "Target Month",
      placeholder: "Target Month",
      //@ts-ignore
      options: "getTargetMonth",
      required: true,
      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      isReadOnly: true,
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "partnersVolume",
      label: "Partner Volume",
      type: "number",
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
      name: "partnersCount",
      label: "Partner Count",
      type: "number",
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
      name: "retailVolume",
      label: "Retail Volume",
      type: "number",
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
      name: "smeVolume",
      label: "SME Volume",
      type: "number",
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
      name: "infraVolume",
      label: "Infra Volume",
      type: "number",
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
      name: "unsecuredVolume",
      label: "Unsecured Volume",
      type: "number",
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
      name: "insuranceVolume",
      label: "Insurance Volume",
      type: "number",
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
      name: "retailLeadInfoCount",
      label: "Retail Lead Count",
      type: "number",
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
      name: "smeLeadInfoCount",
      label: "SME Lead Count",
      type: "number",
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
      name: "infraLeadInfoCount",
      label: "Infra Lead Count",
      type: "number",
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
      name: "unsecuredLeadInfoCount",
      label: "Unsecured Lead Count",
      type: "number",
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
      name: "insuranceLeadInfoCount",
      label: "Insurance Lead Count",
      type: "number",
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
      name: "remarks",
      label: "Remarks",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
