import { MetaDataType } from "components/dyanmicForm/types";

export const CollateralDetailsMetaData: MetaDataType = {
  form: {
    name: "123456",
    label: "Collateral Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "PRIMARY SECURITY",
        1: "COLLATERAL SECURITY ",
        2: "PERSONAL GUARANTE",
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
        componentType: "arrayField",
        group: 0,
      },
      name: "primarySecurityDetails",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
        },
        {
          render: {
            componentType: "textField",
            sequence: 2,
          },

          name: "propertyAddress",
          label: "Address of the Property ",
          placeholder: "Address of the Property ",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "textField",
            sequence: 3,
          },
          name: "propertyArea",
          label: "Area of the Property ",
          placeholder: "Area of the Property ",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            //@ts-ignore
            componentType: "textField",
            sequence: 4,
          },
          name: "owner",
          label: "Owner",
          placeholder: "Owner",
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
            componentType: "currency",
            sequence: 5,
          },
          name: "marketValue",
          label: "Market Value (Rs. In Crore)",
          placeholder: "Market Value (Rs. In Crore)",
          type: "text",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
        group: 1,
      },
      name: "collateralSecurityDetails",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
        },
        {
          render: {
            componentType: "textField",
            sequence: 2,
          },

          name: "propertyAddress",
          label: "Address of the Property ",
          placeholder: "Address of the Property ",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            componentType: "textField",
            sequence: 3,
          },
          name: "propertyArea",
          label: "Area of the Property ",
          placeholder: "Area of the Property ",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            //@ts-ignore
            componentType: "textField",
            sequence: 4,
          },
          name: "owner",
          label: "Owner",
          placeholder: "Owner",
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
            componentType: "currency",
            sequence: 5,
          },
          name: "marketValue",
          label: "Market Value (Rs. In Crore)",
          placeholder: "Market Value (Rs. In Crore)",
          type: "text",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
            sequence: 6,
          },
          name: "collateralCoverage",
          label: "Collateral Coverage",
          placeholder: "Collateral Coverage",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
            sequence: 7,
          },
          name: "facr",
          label: "FACR",
          placeholder: "FACR",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
            sequence: 8,
          },
          name: "acr",
          label: "ACR",
          placeholder: "ACR",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
        group: 2,
      },
      name: "personalGuaranteDetails",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
        },
        {
          render: {
            componentType: "textField",
            sequence: 9,
          },
          name: "guarantorName",
          label: "Name of Guarantor",
          placeholder: "Name of Guarantor",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            //@ts-ignore
            componentType: "panCard",
            sequence: 10,
          },
          name: "panNumber",
          label: "PAN No.",
          placeholder: "PAN No.",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },

        {
          render: {
            //@ts-ignore
            componentType: "currency",
            sequence: 11,
          },
          name: "netWorth",
          label: "Net Worth",
          placeholder: "Net Worth",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },
  ],
};
