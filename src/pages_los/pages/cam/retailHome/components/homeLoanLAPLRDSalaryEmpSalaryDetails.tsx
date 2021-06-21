import { Default, Amount, DateFormat } from "pages_los/pages/cam/components";

export const HomeLoanLAPLRDSalaryEmpSalaryDetails = ({ salary }) => {
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
              <Default colspan={2} value="Salary Month" element="th" />
              <DateFormat colspan={7} value={salaryDetails?.salaryMonth} />
            </tr>
            <tr>
              <Default colspan={2} value="Net Monthly Salary" element="th" />
              <Amount
                colspan={7}
                value={salaryDetails?.netSalary}
                align="left"
              />
            </tr>
            <tr>
              <Default colspan={2} value="Variable Pay - 50%" element="th" />
              <Amount
                colspan={7}
                value={salaryDetails?.variablePay}
                align="left"
              />
            </tr>
            <tr>
              <Default colspan={2} value="Bonus - 50% Of CY" element="th" />
              <Amount colspan={7} value={salaryDetails?.bonus} align="left" />
            </tr>
            <tr>
              <Default colspan={2} value="Incentive" element="th" />
              <Amount
                colspan={7}
                value={salaryDetails?.incentive}
                align="left"
              />
            </tr>
            <tr>
              <Default colspan={2} value="Other Allowances" element="th" />
              <Default colspan={7} value={salaryDetails?.otherAllowances} />
            </tr>
            <tr>
              <Default colspan={2} value="Other Income" element="th" />
              {Array.isArray(salaryDetails?.otherIncome) ? (
                <Default
                  colspan={7}
                  value={(salaryDetails?.otherIncome).join(", ")}
                />
              ) : (
                <Default colspan={7} value={salaryDetails?.otherIncome} />
              )}
            </tr>
            {salaryDetails?.otherIncome.indexOf("No") >= 0 ? null : (
              <>
                <tr>
                  <Default
                    colspan={2}
                    value="Other Income Source"
                    element="th"
                  />
                  <Amount
                    colspan={7}
                    value={salaryDetails?.otherIncomeType}
                    align="left"
                  />
                </tr>
                <tr>
                  <Default
                    colspan={2}
                    value="Monthly Other Income Amount"
                    element="th"
                  />
                  <Amount
                    colspan={7}
                    value={salaryDetails?.otherIncomeAmount}
                    align="left"
                  />
                </tr>
              </>
            )}
            <tr>
              <Default colspan={2} value="Monthly Total Income" element="th" />
              <Amount
                colspan={7}
                value={salaryDetails?.totalIncome}
                align="left"
              />
            </tr>
          </>
        );
      })}
    </>
  );
};
