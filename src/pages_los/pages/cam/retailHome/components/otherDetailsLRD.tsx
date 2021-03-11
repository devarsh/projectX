import { convertIntoCurrency } from "pages_los/pages/cam/utils";

export const OtherLRDDetails = ({ others }) => {
  if (typeof others !== "object") {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={2}>Rent</th>
        <td colSpan={7}>{others.rent}</td>
      </tr>
      <tr>
        <th colSpan={2}>Rate of Interest</th>
        <td colSpan={7}>{others.rate}</td>
      </tr>
      <tr>
        <th colSpan={2}>Increase in Rent</th>
        <td colSpan={7}>{others.increaseRent}</td>
      </tr>
      <tr>
        <th colSpan={2}>Total Month Lease Period In Months</th>
        <td colSpan={7}>{others.totalMonthLeasePeriod}</td>
      </tr>
      <tr>
        <th colSpan={2}>Months Passsed</th>
        <td colSpan={7}>{others.momnthPassed}</td>
      </tr>
      <tr>
        <th colSpan={2}>Balance Lease period remaining</th>
        <td colSpan={7}>{others.balanceLeasePeriodRem}</td>
      </tr>
      <tr>
        <th colSpan={2}>Rent Revision Frequency</th>
        <td colSpan={7}>{others.rentReviFrequency}</td>
      </tr>
      <tr>
        <th colSpan={2}>Rent Revision Month</th>
        <td colSpan={7}>{others.rentReviMonth}</td>
      </tr>
      {others?.propertyType !== "" ? (
        <tr>
          <th colSpan={2}>Property Type</th>
          <td colSpan={7}>{others.propertyType}</td>
        </tr>
      ) : null}

      <tr>
        <th colSpan={2}>Property Value</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.propertyValue })}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>LTV</th>
        <td colSpan={7}>{others.ltv}</td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on LTV</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.loanAmountBasedOnLTV })}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible Amount Based on Rent</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.eligibleAmountBasedOnRent })}
        </td>
      </tr>

      <tr>
        <th colSpan={2}>Minimum of Loan Based on LTV and Rent</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.minimunLoanLTVRent })}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible EMI</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.eligibleEMI })}
        </td>
      </tr>

      {/* <tr>
        <th colSpan={2}>Credit Score</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.loanAmountBasedOnFOIRLTV })}
        </td>
      </tr> */}
      {/* <tr>
        <th colSpan={2}>Final Amount</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.difApplliedEligibleAmount })}
        </td>
      </tr> */}
      <tr>
        <th colSpan={2}>Eligible Loan Amount</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.eligibleLoanAmount })}
        </td>
      </tr>
    </>
  );
};
