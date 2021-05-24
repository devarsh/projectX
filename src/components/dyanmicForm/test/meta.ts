const GeneralDetailsMetaData = {
  form: {
    name: "123456",
    label: "Target Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        "0": "Business By Direct Team",
        "1": "Lead Target",
        "2": "Cross",
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
      searchField: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: { componentType: "searchField", group: 0 },
      name: "lead",
      type: "text",
      label: "Search Lead",
      placeholder: "Lead",
      GridProps: { xs: 12, md: 3, sm: 3 },
      setColor: "red",
      searchComponent: "searchComponent",
    },
    {
      render: {
        componentType: "arrayField",
        group: 0,
      },
      name: "Wowsa",
      label: "",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "transferList",
            group: 0,
          },
          name: "dummy",
          label: "dummy",
          //@ts-ignore
          leftOptions: "getBankDocType",
          //@ts-ignore
          rightOptions: "getITRDocType",
          leftOptionsLabel: "From",
          rightOptionsLabel: "To",
          valueSide: "right",
          GridProps: {
            xs: 12,
            md: 6,
            sm: 6,
          },
        },
        {
          render: { componentType: "textField", group: 0 },
          name: "condition",
          type: "text",
          label: "Condition",
          placeholder: "Condition",
          GridProps: { xs: 12, md: 3, sm: 3 },
          setColor: (value) => (value === "44" ? "blue" : "green"),
        },
        {
          render: { componentType: "inputMask", group: 0 },
          name: "yaer",
          label: "yearMasked",
          placeholder: "yyyy-yyyy",
          formattedValue: true,
          MaskProps: {
            mask: "0000`-0000`",
            lazy: true,
          },
          GridProps: { xs: 12, md: 3, sm: 3 },
        },
        {
          render: { componentType: "inputMask", group: 0 },
          name: "clfr2",
          label: "CLFR",
          placeholder: "CLFR",
          formattedValue: false,
          MaskProps: {
            mask: "0000` 0000` 0000",
            lazy: true,
          },
          GridProps: { xs: 12, md: 3, sm: 3 },
        },
      ],
    },
  ],
};
export default GeneralDetailsMetaData;
