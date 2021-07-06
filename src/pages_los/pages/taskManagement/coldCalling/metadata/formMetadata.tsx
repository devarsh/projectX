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
      datetimePicker: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "typography",
      },
      name: "personalDetails",
      label: "Personal Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "salutation",
      label: "Salutation",
      options: "getSalutation",
      defaultValue: "00",
      required: true,
      validate: "getValidatevalue",
      postValidationSetCrossFieldValues: "getGenderValue",
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
      required: true,
      validate: "getValidatevalue",
      maxLength: 150,
      showMaxLength: false,
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
      showMaxLength: false,
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
      required: true,
      validate: "getValidatevalue",
      maxLength: 150,
      showMaxLength: false,
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
        componentType: "phoneNumber",
      },
      name: "mobileNo",
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
      name: "email",
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
        componentType: "currency",
      },
      name: "loanAmount",
      label: "Desired Loan Amount",
      placeholder: "Desired Loan Amount",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "typography",
      },
      name: "productDetails",
      label: "Product Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "categoryID",
      label: "Product Category",
      placeholder: "Product Category",
      options: "getMainProductList",
      defaultValue: "00",
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
      name: "process",
      label: "Process Name",
      placeholder: "Process Name",
      options: "getProcessNameList",
      defaultValue: "00",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "datetimePicker",
      },
      name: "nextFollowupDate",
      label: "Next Followup Date",
      placeholder: "dd/mm/yyyy HH:MM",
      format: "dd/MM/yyyy HH:mm aa",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: {
        componentType: "select",
      },
      name: "status",
      label: "Status",
      placeholder: "Status",
      options: "getColdCallingStatus",
      defaultValue: "00",
      required: true,
      validate: "getValidateValue",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: {
        componentType: "select",
      },
      name: "leadPriority",
      label: "Priority",
      placeholder: "Priority",
      options: "getLeadPriority",
      defaultValue: "00",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: {
        componentType: "select",
      },
      name: "followupType",
      label: "Followup Type",
      placeholder: "Followup Type",
      options: "getFollowupType",
      defaultValue: "00",
      GridProps: { xs: 12, md: 3, sm: 3 },
    },
    {
      render: {
        componentType: "typography",
      },
      name: "addressDetails",
      label: "Address Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "address",
      label: "Address",
      placeholder: "Address",
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
        //@ts-ignore
        componentType: "pincode",
      },
      name: "pincode",
      label: "Postal Code",
      placeholder: "Postal Code",
      required: true,
      //@ts-ignore
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
      //@ts-ignore
      options: "getPincode",
      defaultValue: "00",
      //@ts-ignore
      runPostValidationHookAlways: true,
      //@ts-ignore
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
        group: 1,
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
        componentType: "checkbox",
      },
      name: "doNotCall",
      label: "Do not call",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "spacer",
      },
      name: "spacer",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        componentType: "textField",
      },
      name: "remarks",
      label: "Description",
      placeholder: "Description",
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
