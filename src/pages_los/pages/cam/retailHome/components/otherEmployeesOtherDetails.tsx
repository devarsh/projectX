import { Default, Amount, Percentage } from "pages_los/pages/cam/components";
export const OtherEmployeesOtherDetails = ({ other }) => {
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
        <Default colspan={2} value="FOIR" element="th" />
        <Percentage colspan={7} value={other?.foir} />
      </tr>
      <tr>
        <Default colspan={2} value="Condition" element="th" />
        <Default colspan={7} value={other?.condition} />
      </tr>
      <tr>
        <Default colspan={2} value="LTV Condition" element="th" />
        <Default colspan={7} value={other?.ltvCondition} />
      </tr>
      <tr>
        <Default colspan={2} value="New LTV" element="th" />
        <Percentage colspan={7} value={other?.newltv} />
      </tr>
      <tr>
        <Default colspan={2} value="CLFR" element="th" />
        <Percentage colspan={7} value={other?.clfr} />
      </tr>
      <tr>
        <Default colspan={2} value="Eligible EMI" element="th" />
        <Amount colspan={7} value={other.eligibleEMI} align="left" />
      </tr>
      <tr>
        <Default colspan={2} value="Loan Amount Based on FOIR" element="th" />
        <Amount colspan={7} value={other?.loanAmountBasedOnFOIR} align="left" />
      </tr>
      <tr>
        <Default
          colspan={2}
          value="Loan Amount Based on FOIR Based on Condition"
          element="th"
        />
        <Amount
          colspan={7}
          value={other?.loanAmountBasedOnFOIRCondition}
          align="left"
        />
      </tr>
      <tr>
        <Default colspan={2} value="Loan Amount" element="th" />
        <Amount
          colspan={7}
          value={other?.loanAmountBasedOnFOIRCondition}
          align="left"
        />
      </tr>
      <tr>
        <Default colspan={2} value="LTV" element="th" />
        <Percentage colspan={7} value={other?.newltv} />
      </tr>
      <tr>
        <Default colspan={2} value="Condition" element="th" />
        <Default colspan={7} value={other?.ltvCondition} />
      </tr>
      <tr>
        <Default colspan={2} value="CLFR" element="th" />
        <Percentage colspan={7} value={other?.newclfr} />
      </tr>
      <tr>
        <Default colspan={2} value="Amount" element="th" />
        <Amount colspan={7} value={other?.amount} align="left" />
      </tr>
      <tr>
        <Default colspan={2} value="FOIR" element="th" />
        <Percentage colspan={7} value={other?.newfoir} />
      </tr>
      <tr>
        <Default colspan={2} value="Loan Amount Based on LTV" element="th" />
        <Amount colspan={7} value={other?.loanAmountBasedOnLTV} align="left" />
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
