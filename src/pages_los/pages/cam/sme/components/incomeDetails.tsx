import { DefaultTDS, AmountTDS } from "pages_los/pages/cam/utils";
import { Default } from "pages_los/pages/cam/components";

export const IncomeDetails = ({ income }) => {
  if (!Array.isArray(income) || income.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          value=" Income Summary"
          align="center"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={2} value="Financial Years" element="th" />
        {DefaultTDS({ obj: income, key: "incomeYear" })}
      </tr>

      <tr>
        <Default colspan={2} value="Income Amount" element="th" />
        {AmountTDS({ obj: income, key: "incomeAmount" })}
      </tr>

      {/* <tr>
        <th colSpan={2}>Total Obligation</th>
        {printTDSForAmount({ obj: income, key: "actualObligations" })}
      </tr> */}
    </>
  );
};
