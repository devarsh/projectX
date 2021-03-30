export const metaData = {
  form: {
    name: "123456",
    label: "Yearly Target Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "Business By Direct Team",
        1: "Lead Target",
      },
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
        group: 0,
      },
      name: "targetYear",
      label: "Target Year",
      placeholder: "Target Year",
      options: "getTargetYears",
      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "partnersVolume",
      label: "Partner Volume",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "partnerCount",
      label: "Partner Count",
      GridProps: {
        xs: 12,
        md: 4,
        sm: 4,
      },
    },
    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "retailVolume",
      label: "Retail Volume",
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
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};

let myMetaDataTransformer = (myProducts) => {
  const productTypes = [
    "retailVolume",
    "smeVolume",
    "infraVolume",
    "unsecuredVolume",
    "insuranceVolume",
  ];
  let inititalValue: any = {
    my: [],
    cross: [],
  };
  const splitProductTypes = productTypes.reduce((accum, one) => {
    if (
      myProducts.findIndex((current) => {
        console.log(current, one, current.indexOf(one));
        return current.indexOf(one) >= 0;
      })
    ) {
      accum.my.push(one);
    } else {
      accum.cross.push(one);
    }
    return accum;
  }, inititalValue);
  console.log(splitProductTypes);
};
