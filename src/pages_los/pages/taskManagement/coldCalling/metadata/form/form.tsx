export const coldCallingMetadata = {
  form: {
    name: "coldCalling",
    label: "Cold Calling",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
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
      name: "salutation",
      label: "Salutation",
      options: "getSalutation",
      defaultValue: "00",
      postValidationSetCrossFieldValues: "getGenderValue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "gender",
      label: "Gender",
      placeholder: "Gender",
      options: "getGenderList",
      isReadOnly: true,
      validate: "getValidateValue",
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      maxLength: 150,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "middleName",
      label: "Middle Name",
      placeholder: "Middle Name",
      maxLength: 150,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      maxLength: 150,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "phoneNumber",
      },
      name: "mobileNo",
      type: "text",
      label: "Mobile No",
      placeholder: "Mobile No",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "emailID",
      type: "email",
      label: "Email",
      placeholder: "Email",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "address1",
      label: "Address Line 1",
      placeholder: "Address Line 1",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "address2",
      label: "Address Line 2",
      placeholder: "Address Line 2",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "landmark",
      label: "Landmark",
      placeholder: "Landmark",
      type: "text",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "pincode",
      },
      name: "pincode",
      label: "Residence Pincode",
      placeholder: "Residence pincode",
      required: true,
      defaultValue: "",
      postValidationSetCrossFieldValues: "postValidationSetPincodeDtl",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "location",
      label: "Location",
      placeholder: "Location",
      dependentFields: ["pincode"],
      required: true,
      options: "getPincode",
      defaultValue: "0",
      runPostValidationHookAlways: true,
      postValidationSetCrossFieldValues: "postValidationSetLocationDtl",
      disableCaching: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "city",
      label: "City",
      placeholder: "City",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "district",
      label: "District",
      placeholder: "District",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "state",
      label: "State",
      placeholder: "State",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "country",
      label: "Country",
      placeholder: "Country",
      isReadOnly: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "remarks",
      label: "Remarks",
      placeholder: "Remarks",
      multiline: true,
      rows: 2,
      maxRows: 2,
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
    },
  ],
};
