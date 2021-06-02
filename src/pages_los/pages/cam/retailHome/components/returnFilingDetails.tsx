import { Default, DateFormat, Amount } from "pages_los/pages/cam/components";

export const ReturnFilingDetails = ({ returnFiling }) => {
  if (!Array.isArray(returnFiling) || returnFiling.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Return Filing Details
        </th>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <th>Depreciation</th>
        <th>Filing Date</th>
        <th>Filing Year</th>
        <th>Net Profit</th>
        <th>Other Income</th>
        <th>Total Income</th>
      </tr>
      {returnFiling.map((returnFilingDetails) => {
        return (
          <>
            <tr>
              <td colSpan={2}></td>
              <td>
                {
                  //@ts-ignore
                  <Amount value={returnFilingDetails.depreciation} />
                }
              </td>
              <td>{<DateFormat value={returnFilingDetails.filingDate} />}</td>
              <td>{<Default value={returnFilingDetails.filingYear} />}</td>
              <td>
                {
                  //@ts-ignore
                  <Amount value={returnFilingDetails.netProfit} />
                }
              </td>
              <td>
                {
                  //@ts-ignore
                  <Amount value={returnFilingDetails.otherIncome} />
                }
              </td>
              <td>
                {
                  //@ts-ignore
                  <Amount value={returnFilingDetails.totalIncome} />
                }
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
