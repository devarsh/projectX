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
      // groups: { 0: "Financial Details" },
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
        componentType: "typography",
      },
      name: "profitLossDetails",
      label: "PROFIT & LOSS DETAILS",
      TypographyProps: {
        style: { font: "bold" },
        variant: "h5",
      },
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
      name: "financialYear",
      label: "Financial Year",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "typography",
      },
      name: "ebitda",
      label: "EBITDA",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
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
        componentType: "typography",
      },
      name: "ebit",
      label: "EBIT",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
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
        componentType: "typography",
      },
      name: "ebt",
      label: "EBT",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
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
        componentType: "typography",
      },
      name: "pat",
      label: "PAT",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "typography",
      },
      name: "cashProfit",
      label: "Cash Profit",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
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
      name: "ebitDaPercentage",
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
      name: "ebtPercentage",
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
      name: "patPercentage",
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
      name: "cashProfitPercentage",
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
        componentType: "typography",
      },
      name: "adjustedPAT",
      label: "Adjusted PAT",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        //@ts-ignore
        componentType: "typography",
      },
      name: "adjustedCashProfit",
      label: "Adjusted Cash Profit",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
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
        componentType: "typography",
      },
      name: "balanceSheetDetails",
      label: "BALANCE SHEET DETAILS",
      TypographyProps: {
        style: { font: "bold" },
        variant: "h5",
      },
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
        componentType: "typography",
      },
      name: "longTermDebtOrEquity",
      label: "Long Term Debt / Equity",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "typography",
      },
      name: "tolOrTnw",
      label: "TOL / TNW",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
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
        componentType: "typography",
      },
      name: "currentRatio",
      label: "Current Ratio",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },

    {
      render: {
        componentType: "typography",
      },
      name: "operatingCycleDays",
      label: "Operating cycle days",
      TypographyProps: {
        style: { font: "initial" },
        variant: "body1",
      },
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
  ],
};
