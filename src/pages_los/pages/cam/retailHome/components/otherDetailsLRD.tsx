import { Default, Amount, Percentage } from "pages_los/pages/cam/components";

export const OtherLRDDetails = ({ others }) => {
  if (typeof others !== "object") {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={2}>Rent</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.rent} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Rate of Interest</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={others.rate} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Increase in Rent</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={others.increaseRent} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Total Lease Period (In Months)</th>
        <td colSpan={7}>{<Default value={others.totalMonthLeasePeriod} />}</td>
      </tr>
      <tr>
        <th colSpan={2}>Lease Duration Completed (In Months)</th>
        <td colSpan={7}>{<Default value={others.momnthPassed} />}</td>
      </tr>
      <tr>
        <th colSpan={2}>Remaining Lease Period</th>
        <td colSpan={7}>{<Default value={others.balanceLeasePeriodRem} />}</td>
      </tr>
      <tr>
        <th colSpan={2}>Rent Revision Frequency</th>
        <td colSpan={7}>{others.rentReviFrequency}</td>
      </tr>
      <tr>
        <th colSpan={2}>Rent Revision Frequency (In Months)</th>
        <td colSpan={7}>{<Default value={others.rentReviMonth} />}</td>
      </tr>
      {/* <tr>
        <th colSpan={2}>TDS Percentage</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={others.newclfr} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Discount Percentage</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={others.newltv} />
          }
        </td>
      </tr> */}
      {others?.propertyType !== "" ? (
        <tr>
          <th colSpan={2}>Property Type</th>
          <td colSpan={7}>{<Default value={others.propertyType} />}</td>
        </tr>
      ) : null}

      <tr>
        <th colSpan={2}>Property Value</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.propertyValue} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>LTV</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.ltv} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on LTV</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.loanAmountBasedOnLTV} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible Amount Based on Rent</th>
        <td colSpan={7}>
          {
            //@ts-ignores
            <Amount value={others.eligibleAmountBasedOnRent} />
          }
        </td>
      </tr>

      <tr>
        <th colSpan={2}>Minimum of Loan Based on LTV and Rent</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.minimunLoanLTVRent} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible EMI</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.eligibleEMI} />
          }
        </td>
      </tr>

      <tr>
        <th colSpan={2}>Credit Score</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Default value={others.creditScore} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible Loan Amount</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.eligibleLoanAmount} />
          }
        </td>
      </tr>
    </>
  );
};
