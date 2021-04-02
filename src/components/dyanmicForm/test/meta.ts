import { MetaDataType } from "components/dyanmicForm";

const GeneralDetailsMetaData: MetaDataType = {
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
    },
  },
  fields: [
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
      ],
    },
  ],
};
export default GeneralDetailsMetaData;

/*

*/
