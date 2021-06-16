import {
  Default,
  Amount,
  Percentage,
  NotAvailable,
} from "pages_los/pages/cam/components";

export const BankDetails = ({ bank }) => {
  const savingOrCurrentAccountDetails = bank.filter(
    (one) => one.accountType === "Saving" || one.accountType === "Current"
  );

  const otherAccountDetails = bank.filter(
    (one) => one.accountType !== "Saving" && one.accountType !== "Current"
  );

  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          value="Banking Arrangements"
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
      {Array.isArray(savingOrCurrentAccountDetails) ? (
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
        })
      ) : (
        <NotAvailable />
      )}
      <OtherBankAccountTypeDetails otherAccountDetails={otherAccountDetails} />
    </>
  );
};

export const OtherBankAccountTypeDetails = ({ otherAccountDetails }) => {
  return (
    <>
      <br />
      <br />
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={1} value="Nature of Facility" element="th" />
        <Default colspan={2} value="Name of Bank" element="th" />
        <Default
          colspan={2}
          value="O/s Amount as on"
          element="th"
          align="right"
        />
        <Default colspan={2} value="O/s Amount" element="th" />
        <Default
          colspan={1}
          value="Rate of Interest"
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
              <Default colspan={2} value={bankDetail?.bankName} />
              <Default colspan={2} value={bankDetail?.outstandingAmountAsOn} />
              <Amount colspan={2} value={bankDetail?.outstandingAmount} />
              <Percentage colspan={1} value={bankDetail?.rateOfInterest} />
            </tr>
          );
        })}
    </>
  );
};
