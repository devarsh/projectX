export const fields: any = [
  {
    componentType: "select",
    group: 0,
    name: "rera_no",
    label: "Product Type",
    placeholder: "Product Type",
    required: true,
    defaultValue: "X",

    //@ts-ignore
    options: "functionName",
    dependentFields: ["age", "rera_regi"],
    validate: 'fieldData.value === "X" ',
    isExcluded: 'dependentFields.rera_regi.value === "Y" ? true : false',
    isReadOnly: `true`,
  },
];
