import { Default, Amount, Percentage } from "pages_los/pages/cam/components";

export const OtherLRDDetails = ({ others }) => {
  if (typeof others !== "object") {
    return null;
  }
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          value="Eligibility Details"
          align="center"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={2} value="Rent" element="th" />
        <Amount colspan={7} value={others?.rent} align="left" />
      </tr>
      <tr>
        <Default colspan={2} value="Rate of Interest" element="th" />
        <Percentage colspan={7} value={others?.rate} />
      </tr>
      <tr>
        <Default colspan={2} value="Increase in Rent" element="th" />
        <Percentage colspan={7} value={others?.increaseRent} />
      </tr>
      <tr>
        <Default
          colspan={2}
          value="Total Lease Period (In Months)"
          element="th"
        />
        <Default colspan={7} value={others?.totalMonthLeasePeriod} />
      </tr>
      <tr>
        <Default
          colspan={2}
          value="Lease Duration Completed (In Months)"
          element="th"
        />
        <Default colspan={7} value={others?.momnthPassed} />
      </tr>
      <tr>
        <Default colspan={2} value="Remaining Lease Period" element="th" />
        <Default colspan={7} value={others?.balanceLeasePeriodRem} />
      </tr>
      <tr>
        <Default colspan={2} value="Rent Revision Frequency" element="th" />
        <Default colspan={7} value={others?.rentReviFrequency} />
      </tr>
      <tr>
        <Default
          colspan={2}
          value="Rent Revision Frequency (In Months)"
          element="th"
        />
        <Default colspan={7} value={others?.rentReviMonth} />
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
          <Default colspan={2} value="Property Type" element="th" />
          <Default colspan={7} value={others?.propertyType} />
        </tr>
      ) : null}

      <tr>
        <Default colspan={2} value="Property Value" element="th" />
        <Amount colspan={7} value={others?.propertyValue} align="left" />
      </tr>
      <tr>
        <Default colspan={2} value="LTV" element="th" />
        <Amount colspan={7} value={others?.ltv} align="left" />
      </tr>
      <tr>
        <Default colspan={2} value="Loan Amount Based on LTV" element="th" />
        <Amount colspan={7} value={others?.loanAmountBasedOnLTV} align="left" />
      </tr>
      <tr>
        <Default
          colspan={2}
          value="Eligible Amount Based on Rent"
          element="th"
        />
        <Amount
          colspan={7}
          value={others?.eligibleAmountBasedOnRent}
          align="left"
        />
      </tr>

      <tr>
        <Default
          colspan={2}
          value="Minimum of Loan Based on LTV and Rent"
          element="th"
        />
        <Amount colspan={7} value={others?.minimunLoanLTVRent} align="left" />
      </tr>
      <tr>
        <Default colspan={2} value="Eligible EMI" element="th" />
        <Amount colspan={7} value={others?.eligibleEMI} align="left" />
      </tr>

      <tr>
        <Default colspan={2} value="Credit Score" element="th" />
        <Default colspan={7} value={others?.creditScore} />
      </tr>
      <tr>
        <Default colspan={2} value="Eligible Loan Amount" element="th" />
        <Amount colspan={7} value={others?.eligibleLoanAmount} align="left" />
      </tr>
    </>
  );
};
