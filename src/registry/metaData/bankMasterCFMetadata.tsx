import { MetaDataType } from "components/dyanmicForm/types";
export const BankMasterCFDetailsMetaData: MetaDataType = {
  form: {
    name: "bankMasterInfra",
    label: "Bank Master for Infra",
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
        //@ts-ignore
        componentType: "autocomplete",
      },
      name: "bankTranCode",
      label: "Name of Bank",
      placeholder: "Select Name of Bank",
      required: true,
      defaultValue: "00",
      //@ts-ignore
      options: "getPerfiosBankList",
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
      },
      name: "branchName",
      label: "Branch Name",
      placeholder: "Branch Name",
      maxLength: 250,
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
      },
      name: "departmentName",
      label: "Department of the Bank",
      placeholder: "Department of the Bank",
      maxLength: 150,
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
      },
      name: "schemaLocation",
      label: "Location of Scheme",
      placeholder: "Location of Scheme",
      maxLength: 250,
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
      },
      name: "schemaType",
      label: "Type of Scheme",
      placeholder: "Type of Scheme",
      maxLength: 50,
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
      },
      name: "facilityType",
      label: "Type of Facility",
      placeholder: "Type of Facility",
      maxLength: 50,
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
      },
      name: "consTillDateSanction",
      label:
        "Experience in terms of Total Sq.Ft. Constructed till date of Sanction",
      placeholder:
        "Experience in terms of Total Sq.Ft. Constructed till date of Sanction",
      maxLength: 50,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "booksLandValue",
      label: "Land Value(As per Books)(Lacs)",
      placeholder: "Land Value(As per Books)(Lacs)",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "marketLandValue",
      label: "Land Value(Market Value Lacs)",
      placeholder: "Land Value(Market Value Lacs)",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "constructionCost",
      label: "Construction Cost (Lacs)",
      placeholder: "Construction Cost (Lacs)",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
      },
      name: "totalUnit",
      label: "Total no. of Units",
      placeholder: "Total no. of Units",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "totalSaleableArea",
      label: "Total Saleable Area",
      placeholder: "Total Saleable Area",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "totalSalesValue",
      label: "Total Sales Value",
      placeholder: "Total Sales Value",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "otherCollateralValue",
      label: "Additional Collateral Value (Lacs)",
      placeholder: "Additional Collateral Value (Lacs)",
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
      },
      name: "collateralType",
      label: "Type of Collateral",
      placeholder: "Type of Collateral",
      maxLength: 100,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
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
        //@ts-ignore
        componentType: "rateOfInt",
      },
      name: "advanceBookingPer",
      label: "% of Cutback from the Booking Advance",
      placeholder: "% of Cutback from the Booking Advance",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "roiLB",
      label: "ROI LB",
      placeholder: "ROI LB",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "roiUB",
      label: "ROI UB",
      placeholder: "ROI UB",
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
      },
      name: "pf",
      label: "PF",
      placeholder: "PF",
      maxLength: 100,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
