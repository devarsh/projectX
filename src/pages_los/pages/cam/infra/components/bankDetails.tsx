import { convertIntoCurrency } from "pages_los/pages/cam/utils";

export const BankDetails = ({ bank }) => {
  if (!Array.isArray(bank) || bank.length <= 0) {
    return null;
  }

  let { savingOrCurrentAccountDetails, otherAccountDetails }: any = [];

  const bankDetails = bank.map((expandBank) => {
    savingOrCurrentAccountDetails = expandBank.bankDetails.filter(
      (one) => one.accountType === "Saving" || one.accountType === "Current"
    );

    otherAccountDetails = expandBank.bankDetails.filter(
      (one) => one.accountType !== "Saving" && one.accountType !== "Current"
    );
  });

  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Banking Arrangements
        </th>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <th colSpan={2}>Name of Bank</th>
        <th colSpan={2}>Address</th>
        <th colSpan={2}>Current A/C No</th>
        <th colSpan={1}>Average Bank Balance</th>
      </tr>
      {savingOrCurrentAccountDetails.map((bankDetail, index) => {
        return (
          <tr key={index}>
            <td colSpan={2}></td>
            <td colSpan={2}>{bankDetail.bankName}</td>
            <td colSpan={2}>{bankDetail.address}</td>
            <td colSpan={2}>{bankDetail.accountNo}</td>
            <td>
              {convertIntoCurrency({
                amount: bankDetail.averageBalance,
              })}
            </td>
          </tr>
        );
      })}
      <OtherBankAccountTypeDetails otherAccountDetails={otherAccountDetails} />
    </>
  );
};

export const OtherBankAccountTypeDetails = ({ otherAccountDetails }) => {
  if (!Array.isArray(otherAccountDetails) || otherAccountDetails.length < 0) {
    return null;
  }
  return (
    <>
      <br />
      <br />
      <tr>
        <th colSpan={2}></th>
        <th colSpan={1}>Nature of Facility</th>
        <th colSpan={2}>Name of Bank</th>
        <th colSpan={1}>O/s Amount as on</th>
        <th colSpan={1}>O/s Amount</th>
        <th colSpan={1}>Rate of Interest</th>
        <th colSpan={1}>EMI of the Existing Loan</th>
      </tr>
      {otherAccountDetails.map((bankDetail, index) => {
        return (
          <tr key={index}>
            <td colSpan={2}></td>
            <td colSpan={1}>{bankDetail.accountType}</td>
            <td colSpan={2}>{bankDetail.bankName}</td>
            <td colSpan={1}>{bankDetail.outstandingAmountAsOn}</td>
            <td>
              {convertIntoCurrency({
                amount: bankDetail.outstandingAmount,
              })}
            </td>
            <td>
              {convertIntoCurrency({
                amount: bankDetail.existingLoanEMI,
              })}
            </td>
            <td colSpan={1}>{bankDetail.rateOfInterest}</td>
          </tr>
        );
      })}
    </>
  );
};
