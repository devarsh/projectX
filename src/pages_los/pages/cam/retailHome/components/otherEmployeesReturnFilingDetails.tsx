import { Default, Amount, DateFormat } from "pages_los/pages/cam/components";

export const OtherEmployeesReturnFilingDetails = ({ returnFiling }) => {
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
        <Default colspan={1} value="Net Profit Before Tax (PBT)" element="th" />
        <Default colspan={2} value="Depreciation" element="th" />
        <Default colspan={2} value="Other Income" element="th" />
        <Default colspan={2} value="Total Income" element="th" />
      </tr>
      {Array.isArray(returnFiling) &&
        returnFiling.map((returnFilingDetails, index) => {
          return (
            <>
              <tr>
                <Default colspan={1} value={index + 1} />
                <DateFormat
                  colspan={1}
                  value={returnFilingDetails?.filingDate}
                />
                <Amount colspan={1} value={returnFilingDetails?.netProfit} />
                <Amount colspan={2} value={returnFilingDetails?.depreciation} />
                <Amount colspan={2} value={returnFilingDetails?.otherIncome} />
                <Amount colspan={2} value={returnFilingDetails?.totalIncome} />
              </tr>
            </>
          );
        })}
    </>
  );
};
