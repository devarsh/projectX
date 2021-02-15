import { MetaDataType } from "components/dyanmicForm/types";
export const BankMasterSMEDetailsMetaData: MetaDataType = {
  form: {
    name: "bankMaster",
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
        componentType: "textField",
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
        componentType: "textField",
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
        componentType: "textField",
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
        componentType: "textField",
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
        componentType: "textField",
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
        componentType: "currency",
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
        componentType: "currency",
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
        componentType: "textField",
      },
      name: "externalRating",
      label: "External Rating Required & Support",
      placeholder: "External Rating Required & Support",
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
      name: "weHavePayout",
      label: "whether We have Payout?",
      placeholder: "whether We have Payout?",
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
