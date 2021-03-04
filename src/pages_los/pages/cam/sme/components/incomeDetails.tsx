import { printTDS } from "./utils";
export const IncomeDetails = ({ income }) => {
  if (!Array.isArray(income) || income.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={2} className="form-sub-heading">
          Income Summary
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Financial Years</th>
        {printTDS({ obj: income, key: "incomeYear" })}
      </tr>

      <tr>
        <th colSpan={2}>Income Amount</th>
        {printTDS({ obj: income, key: "incomeAmount" })}
      </tr>
    </>
  );
};
