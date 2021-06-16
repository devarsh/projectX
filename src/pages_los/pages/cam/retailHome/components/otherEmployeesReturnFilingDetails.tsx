import { Default, Amount, DateFormat } from "pages_los/pages/cam/components";

export const OtherEmployeesReturnFilingDetails = ({ returnFiling }) => {
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
        <Default colspan={1} value="Date of Filing Return" element="th" />
        <Default
          colspan={1}
          value="Net Profit Before Tax (PBT)"
          element="th"
          align="right"
        />
        <Default colspan={2} value="Depreciation" element="th" align="right" />
        <Default colspan={2} value="Other Income" element="th" align="right" />
        <Default colspan={2} value="Total Income" element="th" align="right" />
      </tr>
      {returnFiling.map((returnFilingDetails, index) => {
        return (
          <>
            <tr>
              <Default colspan={1} value={index + 1} />
              <DateFormat colspan={1} value={returnFilingDetails?.filingDate} />
              <Amount colspan={1} value={returnFilingDetails?.netProfit} />
              <Amount colspan={2} value={returnFilingDetails?.depreciation} />
              <Amount
                colspan={2}
                value={returnFilingDetails?.otherIncomeAmount}
              />
              <Amount colspan={2} value={returnFilingDetails?.totalIncome} />
            </tr>
          </>
        );
      })}
    </>
  );
};
