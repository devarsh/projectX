export const SalaryDetails = ({ salary }) => {
  if (!Array.isArray(salary) || salary.length <= 0) {
    return (
      <>
        <tr>
          <th colSpan={9} className="form-sub-heading">
            Salary Details
          </th>
        </tr>
        <tr>
          <td>No data found</td>
        </tr>
      </>
    );
  }

  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Nominee Salary Details
        </th>
      </tr>
      {/* details not coming in API(pending ) */}
    </>
  );
};
