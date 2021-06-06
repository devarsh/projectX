import {
  printTDS,
  printTDSForAmount,
  printTDSForPercentage,
  convertIntoCurrency,
} from "pages_los/pages/cam/utils";
import { Default } from "pages_los/pages/cam/components";

export const FinancialRatios = ({ finance }) => {
  if (!Array.isArray(finance) || finance.length <= 0) {
    return (
      <>
        <tr>
          <Default
            colspan={9}
            className="form-heading"
            value="Financial Ratios"
            align="center"
            element="th"
          />
        </tr>
        <tr>
          <Default colspan={9} value="Not Available" align="center" />
        </tr>
      </>
    );
  }
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-heading"
          value="Financial Ratios"
          align="center"
          element="th"
        />
      </tr>
      <tr>
        <th colSpan={9}>
          <h6>PROFIT & LOSS DETAILS</h6>
        </th>
      </tr>
      <tr>
        <Default colspan={2} value="Particulars" element="th" />
        {printTDS({ obj: finance, key: "financialYear" })}
      </tr>
      <tr>
        <Default colspan={2} value="Revenue" element="th" />
        {printTDSForAmount({ obj: finance, key: "revenue" })}
      </tr>

      <tr>
        <Default colspan={2} value="EBITDA" element="th" />
        {printTDSForAmount({ obj: finance, key: "ebitDa" })}
      </tr>
      <tr>
        <Default colspan={2} value="Depreciation" element="th" />
        {printTDSForAmount({ obj: finance, key: "depreciation" })}
      </tr>
      <tr>
        <Default colspan={2} value="EBIT" element="th" />
        {printTDSForAmount({ obj: finance, key: "ebit" })}
      </tr>
      <tr>
        <Default colspan={2} value="Interest Expenses" element="th" />
        {printTDSForAmount({ obj: finance, key: "interestExpenses" })}
      </tr>
      <tr>
        <Default colspan={2} value="EBT" element="th" />
        {printTDSForAmount({ obj: finance, key: "ebt" })}
      </tr>
      <tr>
        <Default colspan={2} value="Tax" element="th" />
        {printTDSForPercentage({ obj: finance, key: "tax" })}
      </tr>
      <tr>
        <Default colspan={2} value="PAT" element="th" />
        {printTDSForAmount({ obj: finance, key: "pat" })}
      </tr>
      <tr>
        <Default colspan={2} value="Cash Profit" element="th" />
        {printTDSForAmount({ obj: finance, key: "cashProfit" })}
      </tr>
      <tr>
        <Default colspan={2} value="EBITDA (%)" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "ebitDaPercentage",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="EBT (%)" element="th" />
        {printTDSForPercentage({ obj: finance, key: "ebtPercentage" })}
      </tr>
      <tr>
        <Default colspan={2} value="PAT (%)" element="th" />
        {printTDSForPercentage({ obj: finance, key: "patPercentage" })}
      </tr>
      <tr>
        <Default colspan={2} value="Cash Profit (%)" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "cashProfitPercentage",
        })}
      </tr>
      <tr>
        <Default
          colspan={2}
          value="Directors / Partners Remuneration"
          element="th"
        />
        {printTDSForAmount({
          obj: finance,
          key: "directorsOrPartnersRemuneration",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="Interest on Capital" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "interestOnCapital",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="Adjusted PAT" element="th" />
        {printTDSForAmount({ obj: finance, key: "adjustedPat" })}
      </tr>
      <tr>
        <Default colspan={2} value="Adjusted Cash Profit" element="th" />
        {printTDSForAmount({
          obj: finance,
          key: "adjustedCashProfit",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="Adjusted PAT (%)" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "adjustedPatPercentage",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="Adjusted Cash Profit (%)" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "adjustedCashProfitPercentage",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="DSCR" element="th" />
        {printTDSForAmount({ obj: finance, key: "dscr" })}
      </tr>
      <tr>
        <th colSpan={9}>
          <h6>BALANCE SHEET DETAILS</h6>
        </th>
      </tr>
      <tr>
        <Default colspan={2} value="Particulars" element="th" />
        {printTDS({ obj: finance, key: "financialYear" })}
      </tr>

      <tr>
        <Default colspan={2} value="Share Capital" element="th" />
        {printTDSForAmount({ obj: finance, key: "shareCapital" })}
      </tr>
      <tr>
        <Default colspan={2} value="Net Worth (Quasi)" element="th" />
        {printTDSForAmount({ obj: finance, key: "netWorth" })}
      </tr>
      <tr>
        <Default colspan={2} value="Long Term Debt Fund" element="th" />
        {printTDSForAmount({ obj: finance, key: "longTermDebtFund" })}
      </tr>
      <tr>
        <Default colspan={2} value="Short Term Debt Fund" element="th" />
        {printTDSForAmount({
          obj: finance,
          key: "shortTermDebtFund",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="Long Term Debt / Equity" element="th" />
        {printTDSForAmount({
          obj: finance,
          key: "longTermDebtEquity",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="TOL / TNW" element="th" />
        {printTDSForAmount({ obj: finance, key: "tolTnw" })}
      </tr>
      <tr>
        <Default colspan={2} value="Current Assets" element="th" />
        {printTDSForAmount({ obj: finance, key: "currentAssets" })}
      </tr>
      <tr>
        <Default colspan={2} value="Current Liabilities" element="th" />
        {printTDSForAmount({
          obj: finance,
          key: "currentLiabilities",
        })}
      </tr>
      <tr>
        <Default colspan={2} value="Current Ratio" element="th" />
        {printTDS({ obj: finance, key: "currentRatio" })}
      </tr>
      <tr>
        <Default colspan={2} value="Operating cycle days" element="th" />
        {printTDS({ obj: finance, key: "operatingCycleDays" })}
      </tr>
      <tr>
        <td colSpan={9}>
          *Estimated and Projected turnover for the next two years is{" "}
          {convertIntoCurrency({ amount: finance[0]?.revenue ?? "" })} in{" "}
          {finance[0]?.financialYear ?? ""} and{" "}
          {convertIntoCurrency({ amount: finance[1]?.revenue ?? "" })} in{" "}
          {finance[1]?.financialYear ?? ""}...
        </td>
      </tr>
    </>
  );
};
