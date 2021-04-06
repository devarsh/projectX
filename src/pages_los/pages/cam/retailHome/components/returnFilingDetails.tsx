import { convertIntoCurrency } from "pages_los/pages/cam/utils";

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
                {convertIntoCurrency({
                  amount: returnFilingDetails.depreciation,
                })}
              </td>
              <td>{returnFilingDetails.filingDate}</td>
              <td>{returnFilingDetails.filingYear}</td>
              <td>{returnFilingDetails.netProfit}</td>
              <td>
                {convertIntoCurrency({
                  amount: returnFilingDetails.otherIncome,
                })}
              </td>
              <td>
                {convertIntoCurrency({
                  amount: returnFilingDetails.totalIncome,
                })}
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
