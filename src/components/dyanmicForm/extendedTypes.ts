import { ExtendedFieldMetaDataTypeOptional } from "./types";

export const extendedMetaData: ExtendedFieldMetaDataTypeOptional = {
  currency: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      thousandSeparator: true,
      prefix: "₹",
      thousandsGroupStyle: "lakh",
      allowNegative: false,
      allowLeadingZeros: false,
      decimalScale: 0,
      maxLength: 13,
    },
    enableNumWords: true,
  },
  phoneNumber: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      format: "##########",
    },
  },
  panCard: {
    render: {
      componentType: "inputMask",
    },
    MaskProps: {
      mask: "aaaaa0000a",
      prepare: function (str) {
        return str.toUpperCase();
      },
      lazy: true,
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["Pan Number is required"] },
        {
          name: "pancard",
          params: ["Please enter valid Pan Card Number"],
        },
      ],
    },
  },
  aadharCard: {
    render: {
      componentType: "inputMask",
    },
    MaskProps: {
      mask: "0000` 0000` 0000",
      lazy: true,
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "required", params: ["Aadhar Number is required"] },
        {
          name: "aadhar",
          params: ["Please enter valid Aadhar Number"],
        },
      ],
    },
  },
  rateOfInt: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      suffix: "%",
      decimalScale: 2,
      format: "##.##%",
      fixedDecimalScale: true,
      allowNegative: false,
      allowLeadingZeros: false,
    },
    schemaValidation: {
      type: "string",
      rules: [
        { name: "typeError", params: ["Please enter existing loan interest"] },
        { name: "required", params: ["Please enter existing loan interest"] },
      ],
    },
  },
};
