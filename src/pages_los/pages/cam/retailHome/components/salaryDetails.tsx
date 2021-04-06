export const SalaryDetails = ({ salary }) => {
  if (!Array.isArray(salary) || salary.length <= 0) {
    return null;
  }

  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Salary Details
        </th>
      </tr>
      {salary.map((salaryDetails) => {
        return (
          <>
            <tr>
              <th colSpan={2}>Salary (Monthly)</th>
              <td colSpan={7}>{salaryDetails.salaryMonth}</td>
            </tr>
            <tr>
              <th colSpan={2}>Net Salary</th>
              <td colSpan={7}>{salaryDetails.netSalary}</td>
            </tr>
            <tr>
              <th colSpan={2}>Variable Pay</th>
              <td colSpan={7}>{salaryDetails.variablePay}</td>
            </tr>
            <tr>
              <th colSpan={2}>Bonus</th>
              <td colSpan={7}>{salaryDetails.bonus}</td>
            </tr>
            <tr>
              <th colSpan={2}>Incentive</th>
              <td colSpan={7}>{salaryDetails.incentive}</td>
            </tr>
            <tr>
              <th colSpan={2}>Agriculture Income</th>
              <td colSpan={7}>{salaryDetails.agricultureIncome}</td>
            </tr>
            <tr>
              <th colSpan={2}>Other Allowances</th>
              <td colSpan={7}>{salaryDetails.otherAllowances}</td>
            </tr>
            <tr>
              <th colSpan={2}>Other Income</th>
              <td colSpan={7}>{salaryDetails.otherIncome}</td>
            </tr>
            <tr>
              <th colSpan={2}>Total Income</th>
              <td colSpan={7}>{salaryDetails.totalIncome}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};
