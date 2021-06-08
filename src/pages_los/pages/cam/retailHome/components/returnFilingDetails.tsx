import { Default, DateFormat, Amount } from "pages_los/pages/cam/components";

export const ReturnFilingDetails = ({ returnFiling }) => {
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
        <Default colspan={1} value="Depreciation" element="th" align="right" />
        <Default colspan={1} value="Filing Date" element="th" />
        <Default colspan={1} value="Filing Year" element="th" />
        <Default colspan={1} value="Net Profit" element="th" />
        <Default colspan={2} value="Other Income" element="th" align="right" />
        <Default colspan={2} value="Total Income" element="th" align="right" />
      </tr>
      {returnFiling.map((returnFilingDetails, index) => {
        return (
          <>
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Amount colspan={1} value={returnFilingDetails?.depreciation} />
              <DateFormat colspan={1} value={returnFilingDetails?.filingDate} />
              <Default colspan={1} value={returnFilingDetails.filingYear} />
              <Amount colspan={1} value={returnFilingDetails?.netProfit} />
              <Amount colspan={2} value={returnFilingDetails?.otherIncome} />
              <Amount colspan={2} value={returnFilingDetails?.totalIncome} />
            </tr>
          </>
        );
      })}
    </>
  );
};
