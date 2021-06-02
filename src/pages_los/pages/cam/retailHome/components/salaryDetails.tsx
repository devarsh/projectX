import { Default, Amount, DateFormat } from "pages_los/pages/cam/components";

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
              <td colSpan={7}>
                {<DateFormat value={salaryDetails.salaryMonth} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Net Salary (Fixed) - 100%</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.netSalary} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Variable Pay - 50%</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.variablePay} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Bonus - 50% Of CY</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.bonus} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Incentive</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.incentive} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Agriculture Income - 20%</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.agricultureIncome} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Other Allowances</th>
              <td colSpan={7}>
                {<Default value={salaryDetails.otherAllowances} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Other Income</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={salaryDetails.otherIncome} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Total Income</th>
              <td colSpan={7}>
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
