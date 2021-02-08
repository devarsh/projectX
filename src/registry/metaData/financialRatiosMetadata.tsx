import { MetaDataType } from "components/dyanmicForm/types";

export const FinancialRatiosMetaData: MetaDataType = {
  form: {
    name: "123456",
    label: "General Details",
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
        componentType: "textField",
      },
      name: "profitLossDetails",
      label: "PROFIT & LOSS DETAILS",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "revenue",
      label: "Revenue",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "ebitda",
      label: "EBITDA",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "depreciation",
      label: "Depreciation",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "ebit",
      label: "EBIT",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "interestExpenses",
      label: "Interest Expenses",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "ebt",
      label: "EBT",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "tax",
      label: "Tax",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "pat",
      label: "PAT",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "cashProfit",
      label: "Cash Profit",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
      },
      name: "cashProfitEBITDA",
      label: "EBITDA (%)",
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
      name: "cashProfitEBT",
      label: "EBT (%)",
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
      name: "cashProfitPAT",
      label: "PAT (%)",
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
      name: "cashProfitCashProfit",
      label: "Cash Profit (%)",
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
      name: "directorsOrPartnersRemuneration",
      label: "Directors / Partners Remuneration",
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
      name: "interestOnCapital",
      label: "Interest on Capital",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "adjustedPAT",
      label: "Adjusted PAT",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "textField",
      },
      name: "adjustedCashProfit",
      label: "Adjusted Cash Profit",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
      },
      name: "adjustedCashProfitPAT",
      label: "Adjusted PAT (%)",
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
      name: "adjustedCashProfit",
      label: "Adjusted Cash Profit (%)",
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
      label: "DSCR",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "balanceSheetDetails",
      label: "BALANCE SHEET DETAILS",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "textField",
      },
      name: "shareCapital",
      label: "Share Capital",
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
      name: "netWorth",
      label: "Net Worth (Quasi)",
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
      name: "longTermDebtFund",
      label: "Long Term Debt Fund",
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
      name: "shortTermDebtFund",
      label: "Short Term Debt Fund",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "longTermDebtOrEquity",
      label: "Long Term Debt / Equity",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "tolOrTnw",
      label: "TOL / TNW",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "textField",
      },
      name: "currentAssest",
      label: "Current Assets",
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
      name: "currentLiabilities",
      label: "Current Liabilities",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "currentRatio",
      label: "Current Ratio",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "textField",
      },
      name: "operatingCycleDays",
      label: "Operating cycle days",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
};
