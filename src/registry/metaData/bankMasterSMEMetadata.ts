import { MetaDataType } from "components/dyanmicForm/types";
export const BankMasterSMEDetailsMetaData: MetaDataType = {
  form: {
    name: "bankMasterSME",
    label: "Bank Master for SME",
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
      label: "Name of Department",
      placeholder: "Name of Department",
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
      name: "productName",
      label: "Product Name",
      placeholder: "Product Name",
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
        componentType: "textField",
      },
      name: "businessVintage",
      label: "Vintage of Business",
      placeholder: "Vintage of Business",
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
        componentType: "textField",
      },
      name: "promotorAge",
      type: "number",
      label: "Age of main Promoters",
      placeholder: "Age of main Promoters",
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
      name: "toLB",
      label: "T/O LB",
      placeholder: "T/O LB",
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
      name: "toUB",
      label: "T/O UB",
      placeholder: "T/O UB",
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
      name: "loanLB",
      label: "Loan LB",
      placeholder: "Loan LB",
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
      name: "loanUB",
      label: "Loan UB",
      placeholder: "Loan UB",
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
      name: "collateralCoverage",
      label: "Collateral Coverage",
      placeholder: "Collateral Coverage",
      type: "number",
      maxLength: 14,
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
      name: "promotorMinScore",
      label: "Minimum CIBIL Score of Promoters",
      placeholder: "Minimum CIBIL Score of Promoters",
      maxLength: 10,
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
      name: "companyCMR",
      label: "CMR of the Company",
      placeholder: "CMR of the Company",
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
      name: "ebidtaAmount",
      label: "EBIDTA Amount As per Audited Financials",
      placeholder: "EBIDTA Amount As per Audited Financials",
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
      name: "currentRatio",
      label: "Current Ratio",
      placeholder: "Current Ratio",
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
      name: "dscr",
      label: "DSCR As per Audited Financials",
      placeholder: "DSCR As per Audited Financials",
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
        componentType: "rateOfInt",
      },
      name: "chequeBouncesPer",
      label: "% Of Cheque Bounces allowed",
      placeholder: "% Of Cheque Bounces allowed",
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
      name: "processingFees",
      label: "Processing Fees",
      placeholder: "Processing Fees",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "select",
      },
      name: "externalRating",
      label: "External Rating Required & Support",
      placeholder: "External Rating Required & Support",
      defaultValue: "N",
      //@ts-ignore
      options: "getYesOrNoOptions",
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
      name: "industryFocus",
      label: "Industry Focus",
      placeholder: "Industry Focus",
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
        componentType: "select",
      },
      name: "weHavePayout",
      label: "whether We have Payout?",
      placeholder: "whether We have Payout?",
      defaultValue: "N",
      //@ts-ignore
      options: "getYesOrNoOptions",
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
      name: "payoutRate",
      label: "Rate of Payout",
      placeholder: "Rate of Payout",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "hidden",
      },
      name: "bankRefCode",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
  ],
};
