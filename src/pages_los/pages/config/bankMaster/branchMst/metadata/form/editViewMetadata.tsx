export const bankBranchMasterMetadataEditView = {
  form: {
    name: "bankBranchMasterEditView",
    label: "Branch Master",
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
      select: { fullWidth: true },
    },
  },
  fields: [
    {
      render: { componentType: "textField" },
      name: "branchName",
      label: "Branch Name",
      placeholder: "Branch Name",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "ifsc",
      label: "IFSC Code",
      placeholder: "IFSC Code",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "textField" },
      name: "city",
      label: "City",
      placeholder: "City",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
  ],
};
