import { Amount, Default } from "pages_los/pages/cam/components";
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
        <th>Net Salary (Fixed) - 100%</th>
        <th>Other Income (Monthly)</th>
        <th>Total Income</th>
      </tr>
      {salary.map((salaryDetails) => {
        return (
          <>
            <tr>
              <th colSpan={2}></th>
              <td>{<Default value={salaryDetails.salaryMonth} />}</td>
              <td>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.netSalary} />
                }
              </td>
              <td>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.otherIncome} />
                }
              </td>
              <td>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.totalIncome} />
                }
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
