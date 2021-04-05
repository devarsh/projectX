import { MetaDataType } from "components/dyanmicForm/types";
export const yearlyTargetFormMetaDataEdit: MetaDataType = {
  form: {
    name: "yearlyTargetForm",
    label: "Target Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "sequence",
      renderType: "tabs",
      groups: {
        0: "Business By Direct Team",
        1: "Lead Target",
      },
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
        componentType: "select",
        group: 0,
        sequence: 1,
      },
      name: "branchCode",
      label: "Branch",
      placeholder: "Branch",
      //@ts-ignore
      options: "getYearlyTargetUserBranchList",
      disableCaching: true,
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
        componentType: "select",
        group: 0,
        sequence: 2,
      },
      name: "targetYear",
      label: "Target Year",
      placeholder: "Target Year",
      //@ts-ignore
      options: "getTargetYears",
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
        sequence: 3,
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
        sequence: 4,
      },
      name: "partnerCount",
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
        sequence: 5,
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
        sequence: 6,
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
        sequence: 7,
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
        sequence: 8,
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
        sequence: 9,
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
        sequence: 10,
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
        sequence: 11,
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
        sequence: 12,
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
        sequence: 13,
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
        sequence: 14,
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
  ],
};
