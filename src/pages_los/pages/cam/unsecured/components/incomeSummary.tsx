import { DefaultTDS, AmountTDS } from "pages_los/pages/cam/utils";
import { Default } from "pages_los/pages/cam/components";

export const IncomeSummaryDetails = ({ income }) => {
  if (!Array.isArray(income) || income.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <Default
          colspan={9}
          value="Income Summary"
          className="form-sub-heading"
          element="th"
          align="center"
        />
      </tr>
      <tr>
        <Default colspan={2} value="Financial Years" />
        {DefaultTDS({ obj: income, key: "incomeYear" })}
      </tr>

      <tr>
        <Default colspan={2} value="Income Amount" />
        {AmountTDS({ obj: income, key: "incomeAmount" })}
      </tr>
    </>
  );
};
