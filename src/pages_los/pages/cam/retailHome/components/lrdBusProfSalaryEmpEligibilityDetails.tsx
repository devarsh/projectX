import { Default, Amount, Percentage } from "pages_los/pages/cam/components";

export const LRDBusProfSalaryEmpEligibilityDetails = ({ others }) => {
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
        <Default colspan={2} value="Property Type" element="th" />
        <Default colspan={7} value={others?.propertyType} />
      </tr>

      <tr>
        <Default colspan={2} value="Property Value" element="th" />
        <Amount colspan={7} value={others?.propertyValue} align="left" />
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
