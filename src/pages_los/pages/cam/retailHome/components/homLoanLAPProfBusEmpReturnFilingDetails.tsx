import { Default, Amount, DateFormat } from "pages_los/pages/cam/components";

export const HomLoanLAPProfBusEmplReturnFilingDetails = ({ returnFiling }) => {
  if (!Array.isArray(returnFiling) || returnFiling.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <Default
          className="form-sub-heading"
          colspan={9}
          align="center"
          element="th"
          value="Return Filing Details"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={1} value="Filing Year" element="th" />
        <Default colspan={1} value="Filing Date" element="th" />
        <Default colspan={1} value="Annual Net Profit" element="th" />
        <Default
          colspan={1}
          value="Annual Depreciation"
          element="th"
          align="right"
        />
        <Default colspan={1} value="Other Income" element="th" />
        <Default colspan={1} value="Other Income Source" element="th" />
        <Default
          colspan={1}
          value="Total Other Income"
          element="th"
          align="right"
        />
        <Default colspan={1} value="Total Income" element="th" align="right" />
      </tr>
      {Array.isArray(returnFiling) &&
        returnFiling.map((returnFilingDetails, index) => {
          return (
            <>
              <tr key={index}>
                <Default colspan={1} value={index + 1} />
                <Default colspan={1} value={returnFilingDetails.filingYear} />
                <DateFormat
                  colspan={1}
                  value={returnFilingDetails?.filingDate}
                />
                <Amount colspan={1} value={returnFilingDetails?.netProfit} />
                <Amount colspan={1} value={returnFilingDetails?.depreciation} />
                {Array.isArray(returnFilingDetails?.otherIncome) ? (
                  <Default
                    colspan={1}
                    value={(returnFilingDetails?.otherIncome).join(", ")}
                  />
                ) : (
                  <Default colspan={1} value="" />
                )}
                <Default
                  colspan={1}
                  value={returnFilingDetails.otherIncomeType}
                />
                <Amount
                  colspan={1}
                  value={returnFilingDetails?.otherIncomeAmount}
                />
                <Amount colspan={1} value={returnFilingDetails?.totalIncome} />
              </tr>
            </>
          );
        })}
    </>
  );
};
