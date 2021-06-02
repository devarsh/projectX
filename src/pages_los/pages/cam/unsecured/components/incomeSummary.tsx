import { printTDS, printTDSForAmount } from "pages_los/pages/cam/utils";

export const IncomeSummaryDetails = ({ income }) => {
  if (!Array.isArray(income) || income.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Income Summary
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Financial Years</th>
        {printTDS({ obj: income, key: "incomeYear" })}
      </tr>

      <tr>
        <th colSpan={2}>Income Amount</th>
        {printTDSForAmount({ obj: income, key: "incomeAmount" })}
      </tr>
    </>
  );
};
