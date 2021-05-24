export const PasswordChangeMetaData = {
  form: {
    name: "passwordChange",
    label: "Change Password",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
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
    },
  },
  fields: [
    {
      render: { componentType: "passwordField", group: 0 },
      name: "currentPassword",
      sequence: 1,
      type: "text",
      label: "Current Password",
      placeholder: "Current Password",
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
    },
    {
      render: { componentType: "passwordField", group: 0 },
      name: "password",
      sequence: 2,
      type: "password",
      label: "New Password",
      placeholder: "New Password",
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
      validate: (currentField) => {
        if (currentField?.value?.length < 8) {
          return "Password should be of minimum 8 characters long";
        } else {
          return "";
        }
      },
    },
    {
      render: { componentType: "passwordField", group: 0 },
      name: "confirmPassword",
      sequence: 3,
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      GridProps: { xs: 12, md: 12, sm: 12 },
      fullWidth: true,
      required: true,
      schemaValidation: {
        type: "string",
        rules: [{ name: "required", params: ["This is a required field"] }],
      },
      dependentFields: ["password"],
      runValidationOnDependentFieldsChange: true,
      validate: (currentField, dependentFields) => {
        if (currentField?.value !== dependentFields?.password?.value) {
          return "New Password and Confirm Password did not matched";
        } else {
          return "";
        }
      },
    },
  ],
};
