export const bankMasterMetadata = {
  form: {
    name: "bankMaster",
    label: "Bank Master",
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
    },
  },
  fields: [
    {
      render: { componentType: "textField" },
      name: "bankName",
      label: "Bank Name",
      placeholder: "Enter Bank Name",
      maxLength: 250,
      showMaxLength: false,
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: { componentType: "hidden" },
      name: "rbiCode",
      label: "RBI Code",
      placeholder: "RBI Code",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
  ],
};
