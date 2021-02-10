import { MetaDataType } from "components/dyanmicForm/types";
export const BussinessDetailsMetadata: MetaDataType = {
  form: {
    name: "leadBusinessDetails",
    label: "Lead Business Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "Business Details",
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
        componentType: "textField",
        group: 0,
      },
      name: "companyHistory",
      label: "Company Brief History",
      placeholder: "Company Brief History",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyService",
      label: "Company Services",
      placeholder: "Company Services",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyEndUseProducts",
      label: "End Use of the Products",
      placeholder: "End Use of the Products",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyMaterialsName",
      label: "Name of Raw Materials",
      placeholder: "Name of Raw Materials",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companySuppliersName",
      label: "Name of Major Suppliers",
      placeholder: "Name of Major Suppliers",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyPaymentTermSuppliers",
      label: "Payment Terms with Suppliers",
      placeholder: "Payment Terms with Suppliers",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyCustomersName",
      label: "Name of Major Customers",
      placeholder: "Name of Major Customers",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyPaymentTerm",
      label: "Payment terms with Customers",
      placeholder: "Payment terms with Customers",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyOrderBookPosition",
      label: "Current Order Book Position",
      placeholder: "Current Order Book Position",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyPolicy",
      label: "Marketing & Distribution Policy/Strategy",
      placeholder: "Marketing & Distribution Policy/Strategy",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyCompetitors",
      label: "Name of Competitors",
      placeholder: "Name of Competitors",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyExportCountry",
      label: "Name of Major Countries where Exporting",
      placeholder: "Name of Major Countries where Exporting",
      defaultValue: "",
      maxLength: 6000,
      multiline: true,
      rows: 3,
      rowsMax: 3,
      GridProps: {
        xs: 6,
        md: 6,
        sm: 6,
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyExportRatio",
      label: "Domestic and export sales ratio",
      placeholder: "Domestic and export sales ratio",
      defaultValue: "",
      maxLength: 10,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "numberFormat",
        group: 0,
      },
      name: "companyEmployeeCount",
      label: "No. of Employees",
      placeholder: "No. of Employees",
      defaultValue: "",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
      FormatProps: {
        format: "##########",
      },
    },

    {
      render: {
        componentType: "textField",
        group: 0,
      },
      name: "companyLicence",
      label: "Other Industry specific approvals/license",
      placeholder: "Other Industry specific approvals/license",
      defaultValue: "",
      maxLength: 250,
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
      name: "companyAwards",
      label: "Any awards/Recognition received",
      placeholder: "Any awards/Recognition received",
      defaultValue: "",
      maxLength: 250,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
