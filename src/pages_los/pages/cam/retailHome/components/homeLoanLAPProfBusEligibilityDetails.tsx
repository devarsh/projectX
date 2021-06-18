import { Default, Amount, Percentage } from "pages_los/pages/cam/components";
export const HomeLoanLAPProfBusEligibilityDetails = ({ other }) => {
  if (typeof other !== "object") {
    return null;
  }
  return (
    <>
      <br />
      <br />
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
        <Default colspan={2} value="Tenure" element="th" />
        <Default colspan={7} value={other?.tenur} />
      </tr>
      <tr>
        <Default colspan={2} value="Rate of Interest" element="th" />
        <Percentage colspan={7} value={other?.rate} />
      </tr>
      <tr>
        <Default colspan={2} value="Property Type" element="th" />
        <Default colspan={7} value={other?.propertyType} />
      </tr>
      <tr>
        <Default colspan={2} value="Market Value of Property" element="th" />
        <Amount colspan={7} value={other?.propertyMarketValue} align="left" />
      </tr>
      <tr>
        <Default colspan={2} value="Credit Score" element="th" />
        <Default colspan={7} value={other?.creditScore} />
      </tr>
      <tr>
        <Default colspan={2} value="Eligible Loan Amount" element="th" />
        <Amount colspan={7} value={other?.eligibleLoanAmount} align="left" />
      </tr>
      <br />
      <br />
    </>
  );
};
