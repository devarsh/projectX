import { printTDS } from "./utils";
export const FinancialRatios = ({ finance }) => {
  return (
    <>
      <tr>
        <th colSpan={9} className="form-heading">
          Financial Ratios
        </th>
      </tr>

      <tr>
        <th colSpan={2}>Particulars</th>
        {printTDS({ obj: finance, key: "financialYear" })}
      </tr>
      <tr>
        <th colSpan={9}>
          <h5>PROFIT & LOSS DETAILS</h5>
        </th>
      </tr>

      <tr>
        <th colSpan={2}>Revenue</th>
        {printTDS({ obj: finance, key: "revenue" })}
      </tr>

      <tr>
        <th colSpan={2}>EBITDA</th>
        {printTDS({ obj: finance, key: "ebitDa" })}
      </tr>
      <tr>
        <th colSpan={2}>Depreciation</th>
        {printTDS({ obj: finance, key: "depreciation" })}
      </tr>
      <tr>
        <th colSpan={2}>EBIT</th>
        {printTDS({ obj: finance, key: "ebit" })}
      </tr>
      <tr>
        <th colSpan={2}>Interest Expenses</th>
        {printTDS({ obj: finance, key: "interestExpenses" })}
      </tr>
      <tr>
        <th colSpan={2}>EBT</th>
        {printTDS({ obj: finance, key: "ebt" })}
      </tr>
      <tr>
        <th colSpan={2}>Tax</th>
        {printTDS({ obj: finance, key: "tax" })}
      </tr>
      <tr>
        <th colSpan={2}>PAT</th>
        {printTDS({ obj: finance, key: "pat" })}
      </tr>
      <tr>
        <th colSpan={2}>Cash Profit</th>
        {printTDS({ obj: finance, key: "cashProfit" })}
      </tr>
      <tr>
        <th colSpan={2}>EBITDA (%)</th>
        {printTDS({ obj: finance, key: "ebitDaPercentage" })}
      </tr>
      <tr>
        <th colSpan={2}>EBT (%)</th>
        {printTDS({ obj: finance, key: "ebtPercentage" })}
      </tr>
      <tr>
        <th colSpan={2}>PAT (%)</th>
        {printTDS({ obj: finance, key: "patPercentage" })}
      </tr>
      <tr>
        <th colSpan={2}>Cash Profit (%)</th>
        {printTDS({ obj: finance, key: "cashProfitPercentage" })}
      </tr>
      <tr>
        <th colSpan={2}>Directors / Partners Remuneration</th>
        {printTDS({ obj: finance, key: "directorsOrPartnersRemuneration" })}
      </tr>
      <tr>
        <th colSpan={2}>Interest on Capital</th>
        {printTDS({ obj: finance, key: "interestOnCapital" })}
      </tr>
      <tr>
        <th colSpan={2}>Adjusted PAT</th>
        {printTDS({ obj: finance, key: "adjustedPat" })}
      </tr>
      <tr>
        <th colSpan={2}>Adjusted Cash Profit</th>
        {printTDS({ obj: finance, key: "adjustedCashProfit" })}
      </tr>
      <tr>
        <th colSpan={2}>Adjusted PAT (%)</th>
        {printTDS({ obj: finance, key: "adjustedPatPercentage" })}
      </tr>
      <tr>
        <th colSpan={2}>Adjusted Cash Profit (%)</th>
        {printTDS({ obj: finance, key: "adjustedCashProfitPercentage" })}
      </tr>
      <tr>
        <th colSpan={2}>DSCR</th>
        {printTDS({ obj: finance, key: "dscr" })}
      </tr>
      <tr>
        <th colSpan={9}>
          <h5>BALANCE SHEET DETAILS</h5>
        </th>
      </tr>

      <tr>
        <th colSpan={2}>Share Capital</th>
        {printTDS({ obj: finance, key: "shareCapital" })}
      </tr>
      <tr>
        <th colSpan={2}>Net Worth (Quasi)</th>
        {printTDS({ obj: finance, key: "netWorth" })}
      </tr>
      <tr>
        <th colSpan={2}>Long Term Debt Fund</th>
        {printTDS({ obj: finance, key: "longTermDebtFund" })}
      </tr>
      <tr>
        <th colSpan={2}>Short Term Debt Fund</th>
        {printTDS({ obj: finance, key: "shortTermDebtFund" })}
      </tr>
      <tr>
        <th colSpan={2}>Long Term Debt / Equity</th>
        {printTDS({ obj: finance, key: "longTermDebtEquity" })}
      </tr>
      <tr>
        <th colSpan={2}>TOL / TNW</th>
        {printTDS({ obj: finance, key: "tolTnw" })}
      </tr>
      <tr>
        <th colSpan={2}>Current Assets</th>
        {printTDS({ obj: finance, key: "currentAssets" })}
      </tr>
      <tr>
        <th colSpan={2}>Current Liabilities</th>
        {printTDS({ obj: finance, key: "currentLiabilities" })}
      </tr>
      <tr>
        <th colSpan={2}>Current Ratio</th>
        {printTDS({ obj: finance, key: "currentRatio" })}
      </tr>
      <tr>
        <th colSpan={2}>Operating cycle days</th>
        {printTDS({ obj: finance, key: "operatingCycleDays" })}
      </tr>
      <tr>
        <td colSpan={9}>
          *Estimated and Projected turnover for the next two years is Rs.20,000
          in 2019 and Rs.25,000 in 2020.
        </td>
      </tr>
    </>
  );
};
