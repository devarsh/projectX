export const OtherEmployeesSalaryDetails = ({ salary }) => {
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
      <tr>
        <th colSpan={2}></th>
        <th>Salary (Monthly)</th>
        <th>Net Salary</th>
        <th>Other Income</th>
        <th>Total Income</th>
      </tr>
      {salary.map((salaryDetails) => {
        return (
          <>
            <tr>
              <th colSpan={2}></th>
              <td>{salaryDetails.salaryMonth}</td>
              <td>{salaryDetails.netSalary}</td>
              <td>{salaryDetails.otherIncome}</td>
              <td>{salaryDetails.totalIncome}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};
