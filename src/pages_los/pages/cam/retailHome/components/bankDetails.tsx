import { Default, Amount, Percentage } from "pages_los/pages/cam/components";

export const BankDetails = ({ bank }) => {
  if (!Array.isArray(bank) || bank.length <= 0) {
    return null;
  }

  let { savingOrCurrentAccountDetails, otherAccountDetails }: any = [];

  savingOrCurrentAccountDetails = bank.filter(
    (one) => one.accountType === "Saving" || one.accountType === "Current"
  );

  otherAccountDetails = bank.filter(
    (one) => one.accountType !== "Saving" && one.accountType !== "Current"
  );

  return (
    <>
      <tr>
        <Default
          colspan={9}
          value="Banking Details"
          className="form-sub-heading"
          element="th"
          align="center"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Name of Bank" element="th" />
        <Default colspan={2} value="Address" element="th" />
        <Default colspan={2} value="Current A/C No" element="th" />
        <Default
          colspan={2}
          value="Average Bank Balance"
          element="th"
          align="right"
        />
      </tr>
      {Array.isArray(savingOrCurrentAccountDetails) &&
        savingOrCurrentAccountDetails.map((bankDetail, index) => {
          return (
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={2} value={bankDetail?.bankName} />
              <Default colspan={2} value={bankDetail?.address} />
              <Default colspan={2} value={bankDetail?.accountNo} />
              <Amount colspan={2} value={bankDetail?.averageBalance} />
            </tr>
          );
        })}
      <OtherBankAccountTypeDetails otherAccountDetails={otherAccountDetails} />
    </>
  );
};

export const OtherBankAccountTypeDetails = ({ otherAccountDetails }) => {
  // if (!Array.isArray(otherAccountDetails) || otherAccountDetails.length <= 0) {
  //   return null;
  // }
  return (
    <>
      <br />
      <br />
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={1} value="Nature of Facility" element="th" />
        <Default colspan={1} value="Name of Bank" element="th" />
        <Default colspan={1} value="O/s Amount as on" element="th" />
        <Default colspan={2} value="O/s Amount" element="th" align="right" />
        <Default
          colspan={1}
          value="Rate of Interest"
          element="th"
          align="right"
        />
        <Default
          colspan={2}
          value="EMI of the Existing Loan"
          element="th"
          align="right"
        />
      </tr>
      {Array.isArray(otherAccountDetails) &&
        otherAccountDetails.map((bankDetail, index) => {
          return (
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={1} value={bankDetail?.accountType} />
              <Default colspan={1} value={bankDetail?.bankName} />
              <Default colspan={1} value={bankDetail?.outstandingAmountAsOn} />
              <Amount colspan={2} value={bankDetail?.outstandingAmount} />
              <Percentage colspan={1} value={bankDetail?.rateOfInterest} />
              <Amount colspan={2} value={bankDetail?.existingLoanEMI} />
            </tr>
          );
        })}
    </>
  );
};
