import { MetaDataType } from "components/dyanmicForm/types";
const BussinessDetailsMetadata: MetaDataType = {
  form: {
    name: "leadBusinessDetails",
    label: "Lead Business Details",
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
        componentType: "arrayField",
        group: 1,
      },
      name: "incomeDetails",
      label: "Income Details",
      GridProps: {
        xs: 12,
        md: 6,
        sm: 6,
      },
      removeRowFn: "demp",
      _fields: [
        {
          render: {
            componentType: "textField",
            group: 0,
          },

          name: "incomeYear",
          label: "Year of Income",
          placeholder: "Year of Income",
          required: true,
          GridProps: {
            xs: 12,
            md: 6,
            sm: 6,
          },
        },
        {
          render: {
            componentType: "numberFormat",
            group: 1,
          },
          name: "income",
          label: "Income Amount",
          placeholder: "Income Amount",
          required: true,
          defaultValue: "",

          FormatProps: {
            format: "################",
          },
          GridProps: {
            xs: 12,
            md: 6,
            sm: 6,
          },
        },
      ],
    },
    {
      render: {
        componentType: "checkbox",
        group: 1,
      },
      name: "dutyrgf",
      required: true,
      label:
        "I have read and agreed to the Terms of Use and hereby appoint Ratnaafin as my authorised representative to receive my credit information from Cibil/ Equifax/ Experian/ Highmark (bureau).",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
};

export default BussinessDetailsMetadata;
