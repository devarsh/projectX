import { ExtendedFieldMetaDataTypeOptional } from "./types";
import sub from "date-fns/sub";

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
      isAllowed: (values) => {
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
    },
    enableNumWords: true,
  },
  dob: {
    render: {
      componentType: "datePicker",
    },
    //@ts-ignore
    schemaValidation: {
      type: "date",
      rules: [
        { name: "typeError", params: ["Must be a valid date"] },
        {
          name: "max",
          params: [
            sub(new Date(), { years: 18 }),
            "minimum age must be 18 years",
          ],
        },
        {
          name: "min",
          params: [
            sub(new Date(), { years: 100 }),
            "maximum age must be 100 years",
          ],
        },
      ],
    },
  },
  phoneNumber: {
    render: {
      componentType: "numberFormat",
    },
    FormatProps: {
      format: "##########",
      isAllowed: (values) => {
        if (values.floatValue === 0) {
          return false;
        }
        return true;
      },
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
        { name: "required", params: ["This Field is required"] },
        {
          name: "pancard",
          params: ["Please enter valid Pan Card Number"],
        },
      ],
    },
  },
  panCardOptional: {
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
        { name: "required", params: ["This Field is required"] },
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
      fixedDecimalScale: true,
      allowNegative: false,
      allowLeadingZeros: false,
      isAllowed: (values) => {
        //@ts-ignore
        if (values.floatValue <= 99.99) {
          return true;
        }
        return false;
      },
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
