import { Default, Amount, DateFormat } from "pages_los/pages/cam/components";

export const SalaryDetails = ({ salary }) => {
  if (!Array.isArray(salary) || salary.length <= 0) {
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
          value="Salary Details"
        />
      </tr>
      {salary.map((salaryDetails) => {
        return (
          <>
            <tr>
              <Default colspan={2} value="Salary (Monthly)" element="th" />
              <DateFormat colspan={7} value={salaryDetails?.salaryMonth} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Net Salary (Fixed) - 100%"
                element="th"
              />
              <Amount colspan={7} value={salaryDetails?.netSalary} />
            </tr>
            <tr>
              <Default colspan={2} value="Variable Pay - 50%" element="th" />
              <Amount colspan={7} value={salaryDetails?.variablePay} />
            </tr>
            <tr>
              <Default colspan={2} value="Bonus - 50% Of CY" element="th" />
              <Amount colspan={7} value={salaryDetails?.bonus} />
            </tr>
            <tr>
              <Default colspan={2} value="Incentive" element="th" />
              <Amount colspan={7} value={salaryDetails?.incentive} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Agriculture Income - 20%"
                element="th"
              />
              <Amount colspan={7} value={salaryDetails?.agricultureIncome} />
            </tr>
            <tr>
              <Default colspan={2} value="Other Allowances" element="th" />
              <Default colspan={7} value={salaryDetails?.otherAllowances} />
            </tr>
            <tr>
              <Default colspan={2} value="Other Income" element="th" />
              <Amount colspan={7} value={salaryDetails?.otherIncome} />
            </tr>
            <tr>
              <Default colspan={2} value="Total Income" element="th" />
              <Amount colspan={7} value={salaryDetails?.totalIncome} />
            </tr>
          </>
        );
      })}
    </>
  );
};
