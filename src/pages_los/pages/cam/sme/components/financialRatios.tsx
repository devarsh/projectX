import {
  printTDS,
  printTDSForAmount,
  printTDSForPercentage,
  convertIntoCurrency,
} from "pages_los/pages/cam/utils";
import { Default, NotAvailable } from "pages_los/pages/cam/components";

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
          <NotAvailable />
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
        <Default
          colspan={9}
          value="PROFIT & LOSS DETAILS"
          element="th"
          className="largeLabel"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Source" element="th" />
        {printTDS({ obj: finance, key: "source" })}
      </tr>
      <tr>
        <Default colspan={1} value="Particulars" element="th" />
        {printTDS({ obj: finance, key: "financialYear" })}
      </tr>
      <tr>
        <Default colspan={1} value="Revenue" element="th" />
        {printTDSForAmount({ obj: finance, key: "revenue" })}
      </tr>

      <tr>
        <Default colspan={1} value="EBITDA" element="th" />
        {printTDSForAmount({ obj: finance, key: "ebitDa" })}
      </tr>
      <tr>
        <Default colspan={1} value="Depreciation" element="th" />
        {printTDSForAmount({ obj: finance, key: "depreciation" })}
      </tr>
      <tr>
        <Default colspan={1} value="EBIT" element="th" />
        {printTDSForAmount({ obj: finance, key: "ebit" })}
      </tr>
      <tr>
        <Default colspan={1} value="Interest Expenses" element="th" />
        {printTDSForAmount({ obj: finance, key: "interestExpenses" })}
      </tr>
      <tr>
        <Default colspan={1} value="EBT" element="th" />
        {printTDSForAmount({ obj: finance, key: "ebt" })}
      </tr>
      <tr>
        <Default colspan={1} value="Tax" element="th" />
        {printTDSForPercentage({ obj: finance, key: "tax" })}
      </tr>
      <tr>
        <Default colspan={1} value="PAT" element="th" />
        {printTDSForAmount({ obj: finance, key: "pat" })}
      </tr>
      <tr>
        <Default colspan={1} value="Cash Profit" element="th" />
        {printTDSForAmount({ obj: finance, key: "cashProfit" })}
      </tr>
      <tr>
        <Default colspan={1} value="EBITDA (%)" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "ebitDaPercentage",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="EBT (%)" element="th" />
        {printTDSForPercentage({ obj: finance, key: "ebtPercentage" })}
      </tr>
      <tr>
        <Default colspan={1} value="PAT (%)" element="th" />
        {printTDSForPercentage({ obj: finance, key: "patPercentage" })}
      </tr>
      <tr>
        <Default colspan={1} value="Cash Profit (%)" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "cashProfitPercentage",
        })}
      </tr>
      <tr>
        <Default
          colspan={1}
          value="Directors / Partners Remuneration"
          element="th"
        />
        {printTDSForAmount({
          obj: finance,
          key: "directorsOrPartnersRemuneration",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="Interest on Capital" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "interestOnCapital",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="Adjusted PAT" element="th" />
        {printTDSForAmount({ obj: finance, key: "adjustedPat" })}
      </tr>
      <tr>
        <Default colspan={1} value="Adjusted Cash Profit" element="th" />
        {printTDSForAmount({
          obj: finance,
          key: "adjustedCashProfit",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="Adjusted PAT (%)" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "adjustedPatPercentage",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="Adjusted Cash Profit (%)" element="th" />
        {printTDSForPercentage({
          obj: finance,
          key: "adjustedCashProfitPercentage",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="DSCR" element="th" />
        {printTDSForAmount({ obj: finance, key: "dscr" })}
      </tr>
      <tr>
        <Default
          colspan={9}
          value="BALANCE SHEET DETAILS"
          element="th"
          className="largeLabel"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Source" element="th" />
        {printTDS({ obj: finance, key: "source" })}
      </tr>
      <tr>
        <Default colspan={1} value="Particulars" element="th" />
        {printTDS({ obj: finance, key: "financialYear" })}
      </tr>

      <tr>
        <Default colspan={1} value="Share Capital" element="th" />
        {printTDSForAmount({ obj: finance, key: "shareCapital" })}
      </tr>
      <tr>
        <Default colspan={1} value="Net Worth (Quasi)" element="th" />
        {printTDSForAmount({ obj: finance, key: "netWorth" })}
      </tr>
      <tr>
        <Default colspan={1} value="Long Term Debt Fund" element="th" />
        {printTDSForAmount({ obj: finance, key: "longTermDebtFund" })}
      </tr>
      <tr>
        <Default colspan={1} value="Short Term Debt Fund" element="th" />
        {printTDSForAmount({
          obj: finance,
          key: "shortTermDebtFund",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="Long Term Debt / Equity" element="th" />
        {printTDSForAmount({
          obj: finance,
          key: "longTermDebtEquity",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="TOL / TNW" element="th" />
        {printTDSForAmount({ obj: finance, key: "tolTnw" })}
      </tr>
      <tr>
        <Default colspan={1} value="Current Assets" element="th" />
        {printTDSForAmount({ obj: finance, key: "currentAssets" })}
      </tr>
      <tr>
        <Default colspan={1} value="Current Liabilities" element="th" />
        {printTDSForAmount({
          obj: finance,
          key: "currentLiabilities",
        })}
      </tr>
      <tr>
        <Default colspan={1} value="Current Ratio" element="th" />
        {printTDS({ obj: finance, key: "currentRatio" })}
      </tr>
      <tr>
        <Default colspan={1} value="Operating cycle days" element="th" />
        {printTDS({ obj: finance, key: "operatingCycleDays" })}
      </tr>
      <tr>
        <Default
          colspan={9}
          value={`*Estimated and Projected turnover for the next two years is 
          ${convertIntoCurrency({
            amount: finance[0]?.firstEstimatedProjectTurnover ?? "",
          })} 
          in ${finance[0]?.financialYear ?? ""} and 
          ${convertIntoCurrency({
            amount: finance[1]?.secondEstimatedProjectTurnover ?? "",
          })} 
          in ${finance[1]?.financialYear ?? ""}...`}
        />
      </tr>
    </>
  );
};
