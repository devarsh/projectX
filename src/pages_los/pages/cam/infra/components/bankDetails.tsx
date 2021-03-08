import { ProjectNatureOfFacilityDetails } from "./projectNatureOfFacility";
export const BankDetails = ({ bank }) => {
  if (!Array.isArray(bank) || bank.length < 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Banking Arrangements
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Name of Bank</th>
        <th colSpan={2}>Address</th>
        <th colSpan={2}>Current A/C No</th>
        <th colSpan={2}>Average Bank Balance</th>
      </tr>
      {bank.map((bankData, index) => {
        {
          return bankData?.bankDetails?.map((bankDetails, index) => {
            return bankDetails.accountType === "Saving" || "Current" ? (
              <tr key={index}>
                <td colSpan={2}>{bankDetails.bankName}</td>
                <td colSpan={2}>{bankDetails.address}</td>
                <td colSpan={2}>{bankDetails.accountNo}</td>
                <td colSpan={2}>{bankDetails.averageBalance}</td>
              </tr>
            ) : (
              <ProjectNatureOfFacilityDetails />
            );
          });
        }
      })}
      ;
    </>
  );
};
