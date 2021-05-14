import {
  printTDS,
  printTDSForAmount,
  printTDSForPercentage,
  convertIntoCurrency,
} from "pages_los/pages/cam/utils";

export const FinancialRatios = ({ finance }) => {
  return (
    <>
      <tr className="page-break">
        <th></th>
      </tr>
      <tr>
        <th colSpan={9} className="form-heading">
          Financial Ratios
        </th>
      </tr>
      <tr>
        <th colSpan={9}>
          <h6>PROFIT & LOSS DETAILS</h6>
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Particulars</th>
        {printTDS({ obj: finance, key: "financialYear" })}
      </tr>
      <tr>
        <th colSpan={2}>Revenue</th>
        {printTDSForAmount({ obj: finance, key: "revenue" })}
      </tr>

      <tr>
        <th colSpan={2}>EBITDA</th>
        {printTDSForAmount({ obj: finance, key: "ebitDa" })}
      </tr>
      <tr>
        <th colSpan={2}>Depreciation</th>
        {printTDSForAmount({ obj: finance, key: "depreciation" })}
      </tr>
      <tr>
        <th colSpan={2}>EBIT</th>
        {printTDSForAmount({ obj: finance, key: "ebit" })}
      </tr>
      <tr>
        <th colSpan={2}>Interest Expenses</th>
        {printTDSForAmount({ obj: finance, key: "interestExpenses" })}
      </tr>
      <tr>
        <th colSpan={2}>EBT</th>
        {printTDSForAmount({ obj: finance, key: "ebt" })}
      </tr>
      <tr>
        <th colSpan={2}>Tax</th>
        {printTDSForPercentage({ obj: finance, key: "tax" })}
      </tr>
      <tr>
        <th colSpan={2}>PAT</th>
        {printTDSForAmount({ obj: finance, key: "pat" })}
      </tr>
      <tr>
        <th colSpan={2}>Cash Profit</th>
        {printTDSForAmount({ obj: finance, key: "cashProfit" })}
      </tr>
      <tr>
        <th colSpan={2}>EBITDA (%)</th>
        {printTDSForPercentage({
          obj: finance,
          key: "ebitDaPercentage",
        })}
      </tr>
      <tr>
        <th colSpan={2}>EBT (%)</th>
        {printTDSForPercentage({ obj: finance, key: "ebtPercentage" })}
      </tr>
      <tr>
        <th colSpan={2}>PAT (%)</th>
        {printTDSForPercentage({ obj: finance, key: "patPercentage" })}
      </tr>
      <tr>
        <th colSpan={2}>Cash Profit (%)</th>
        {printTDSForPercentage({
          obj: finance,
          key: "cashProfitPercentage",
        })}
      </tr>
      <tr>
        <th colSpan={2}>Directors / Partners Remuneration</th>
        {printTDSForAmount({
          obj: finance,
          key: "directorsOrPartnersRemuneration",
        })}
      </tr>
      <tr>
        <th colSpan={2}>Interest on Capital</th>
        {printTDSForPercentage({
          obj: finance,
          key: "interestOnCapital",
        })}
      </tr>
      <tr>
        <th colSpan={2}>Adjusted PAT</th>
        {printTDSForAmount({ obj: finance, key: "adjustedPat" })}
      </tr>
      <tr>
        <th colSpan={2}>Adjusted Cash Profit</th>
        {printTDSForAmount({
          obj: finance,
          key: "adjustedCashProfit",
        })}
      </tr>
      <tr>
        <th colSpan={2}>Adjusted PAT (%)</th>
        {printTDSForPercentage({
          obj: finance,
          key: "adjustedPatPercentage",
        })}
      </tr>
      <tr>
        <th colSpan={2}>Adjusted Cash Profit (%)</th>
        {printTDSForPercentage({
          obj: finance,
          key: "adjustedCashProfitPercentage",
        })}
      </tr>
      <tr>
        <th colSpan={2}>DSCR</th>
        {printTDSForAmount({ obj: finance, key: "dscr" })}
      </tr>
      <tr>
        <th colSpan={9}>
          <h6>BALANCE SHEET DETAILS</h6>
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Particulars</th>
        {printTDS({ obj: finance, key: "financialYear" })}
      </tr>

      <tr>
        <th colSpan={2}>Share Capital</th>
        {printTDSForAmount({ obj: finance, key: "shareCapital" })}
      </tr>
      <tr>
        <th colSpan={2}>Net Worth (Quasi)</th>
        {printTDSForAmount({ obj: finance, key: "netWorth" })}
      </tr>
      <tr>
        <th colSpan={2}>Long Term Debt Fund</th>
        {printTDSForAmount({ obj: finance, key: "longTermDebtFund" })}
      </tr>
      <tr>
        <th colSpan={2}>Short Term Debt Fund</th>
        {printTDSForAmount({
          obj: finance,
          key: "shortTermDebtFund",
        })}
      </tr>
      <tr>
        <th colSpan={2}>Long Term Debt / Equity</th>
        {printTDSForAmount({
          obj: finance,
          key: "longTermDebtEquity",
        })}
      </tr>
      <tr>
        <th colSpan={2}>TOL / TNW</th>
        {printTDSForAmount({ obj: finance, key: "tolTnw" })}
      </tr>
      <tr>
        <th colSpan={2}>Current Assets</th>
        {printTDSForAmount({ obj: finance, key: "currentAssets" })}
      </tr>
      <tr>
        <th colSpan={2}>Current Liabilities</th>
        {printTDSForAmount({
          obj: finance,
          key: "currentLiabilities",
        })}
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
          *Estimated and Projected turnover for the next two years is{" "}
          {convertIntoCurrency({ amount: finance[0]?.revenue })} in{" "}
          {finance[0]?.financialYear} and{" "}
          {convertIntoCurrency({ amount: finance[1]?.revenue })} in{" "}
          {finance[1]?.financialYear}...
        </td>
      </tr>
    </>
  );
};
