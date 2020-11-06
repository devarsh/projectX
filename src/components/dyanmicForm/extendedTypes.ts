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
};
