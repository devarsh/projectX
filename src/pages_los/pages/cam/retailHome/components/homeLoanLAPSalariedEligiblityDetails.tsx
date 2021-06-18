import { Default, Amount, Percentage } from "pages_los/pages/cam/components";

export const HomeLoanLAPSalariedEligiblityDetails = ({ others = {} }: any) => {
  if (typeof others !== "object") {
    return null;
  }
  return (
    <>
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
        <Default colspan={7} value={others?.tenur} />
      </tr>
      <tr>
        <Default colspan={2} value="Rate of Interest" element="th" />
        <Percentage colspan={7} value={others?.rate} />
      </tr>
      {others?.propertyType !== "" ? (
        <tr>
          <Default colspan={2} value="Property Type" element="th" />
          <Default colspan={7} value={others?.propertyType} />
        </tr>
      ) : null}

      <tr>
        <Default colspan={2} value="Market Value of Property" element="th" />
        <Amount colspan={7} value={others?.propertyMarketValue} align="left" />
      </tr>
      <tr>
        <Default colspan={2} value="Eligible Loan Amount" element="th" />
        <Amount colspan={7} value={others?.eligibleLoanAmount} align="left" />
      </tr>
    </>
  );
};
