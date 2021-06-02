import { Default, Amount, Percentage } from "pages_los/pages/cam/components";
export const OtherEmployeesOtherDetails = ({ other }) => {
  if (typeof other !== "object" || other.length <= 0) {
    return (
      <tr>
        <td>Invalid data</td>
      </tr>
    );
  }
  return (
    <>
      <br />
      <br />
      <tr>
        <th colSpan={2}>Tenure</th>
        <td colSpan={7}>{<Default value={other.tenur} />}</td>
      </tr>
      <tr>
        <th colSpan={2}>Rate of Interest</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={other.rate} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Property Type</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Default value={other.propertyType} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Market Value of Property</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={other.propertyMarketValue} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>FOIR</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={other.foir} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Condition</th>
        <td colSpan={7}>{<Default value={other.condition} />}</td>
      </tr>
      <tr>
        <th colSpan={2}>LTV Condition</th>
        <td colSpan={7}>{<Default value={other.ltvCondition} />}</td>
      </tr>
      <tr>
        <th colSpan={2}>New LTV</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={other.newltv} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>CLFR</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={other.clfr} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible EMI</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={other.eligibleEMI} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on FOIR</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={other.loanAmountBasedOnFOIR} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on FOIR Based on Condition</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={other.loanAmountBasedOnFOIRCondition} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={other.loanAmountBasedOnFOIRCondition} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>LTV</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={other.newltv} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Condition</th>
        <td colSpan={7}>{<Default value={other.ltvCondition} />}</td>
      </tr>
      <tr>
        <th colSpan={2}>CLFR</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={other.newclfr} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Amount</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={other.amount} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>FOIR</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Percentage value={other.newfoir} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on LTV</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={other.newfoir} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible Loan Amount</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={other.eligibleLoanAmount} />
          }
        </td>
      </tr>
      <br />
      <br />
    </>
  );
};
