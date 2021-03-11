import { convertIntoCurrency } from "pages_los/pages/cam/utils";

export const OtherDetails = ({ others }) => {
  if (typeof others !== "object") {
    return null;
  }
  return (
    <>
      <br />
      <br />
      <tr>
        <th colSpan={2}>Tenure</th>
        <td colSpan={7}>{others.tenur}</td>
      </tr>
      <tr>
        <th colSpan={2}>Rate</th>
        <td colSpan={7}>{others.rate}</td>
      </tr>
      {others?.propertyType !== "" ? (
        <tr>
          <th colSpan={2}>Property Type</th>
          <td colSpan={7}>{others.propertyType}</td>
        </tr>
      ) : null}

      <tr>
        <th colSpan={2}>Market Value of Property</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.propertyMarketValue })}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible EMI</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.eligibleEMI })}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on FOIR</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.loanAmountBasedOnFOIR })}
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
        <th colSpan={2}>Loan Amount Based on min of FOIR and LTV</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.loanAmountBasedOnFOIRLTV })}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Difference Between Applied and Eligible Loan Amount</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.difApplliedEligibleAmount })}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible Loan Amount</th>
        <td colSpan={7}>
          {convertIntoCurrency({ amount: others.eligibleLoanAmount })}
        </td>
      </tr>
    </>
  );
};
