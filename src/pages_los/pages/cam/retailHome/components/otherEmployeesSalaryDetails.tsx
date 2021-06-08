import { Amount, Default } from "pages_los/pages/cam/components";
export const OtherEmployeesSalaryDetails = ({ salary }) => {
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
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Salary (Monthly)" element="th" />
        <Default colspan={2} value="Net Salary (Fixed) - 100%" element="th" />
        <Default colspan={2} value="Other Income (Monthly)" element="th" />
        <Default colspan={2} value="Total Income" element="th" />
      </tr>
      {Array.isArray(salary) &&
        salary.map((salaryDetails, index) => {
          return (
            <>
              <tr key={index}>
                <Default colspan={1} value={index + 1} />
                <Default colspan={2} value={salaryDetails?.salaryMonth} />
                <Amount colspan={2} value={salaryDetails?.netSalary} />
                <Amount colspan={2} value={salaryDetails?.otherIncome} />
                <Amount colspan={2} value={salaryDetails?.totalIncome} />
              </tr>
            </>
          );
        })}
    </>
  );
};
