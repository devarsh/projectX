import { Default, Amount, Percentage } from "pages_los/pages/cam/components";

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
        <td colSpan={7}>{<Default value={others.tenur} />}</td>
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
      {others?.propertyType !== "" ? (
        <tr>
          <th colSpan={2}>Property Type</th>
          <td colSpan={7}>{<Default value={others.propertyType} />}</td>
        </tr>
      ) : null}

      <tr>
        <th colSpan={2}>Market Value of Property</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.propertyMarketValue} />
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
        <th colSpan={2}>Loan Amount Based on FOIR</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.loanAmountBasedOnFOIR} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>LTV</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={others.ltv} />
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
        <th colSpan={2}>Loan Amount Based on min of FOIR and LTV</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={others.loanAmountBasedOnFOIRLTV} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Difference Between Applied and Eligible Loan Amount</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={others.difApplliedEligibleAmount} />
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
