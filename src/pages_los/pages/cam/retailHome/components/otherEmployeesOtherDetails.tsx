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
        <td colSpan={7}>{other.tenur}</td>
      </tr>
      <tr>
        <th colSpan={2}>Rate</th>
        <td colSpan={7}>{other.rate}</td>
      </tr>
      <tr>
        <th colSpan={2}>Market Value of Property</th>
        <td colSpan={7}>{other.propertyMarketValue}</td>
      </tr>
      <tr>
        <th colSpan={2}>FOIR</th>
        <td colSpan={7}>{other.foir}</td>
      </tr>
      <tr>
        <th colSpan={2}>Condition</th>
        <td colSpan={7}>{other.condition}</td>
      </tr>
      <tr>
        <th colSpan={2}>LTV Condition</th>
        <td colSpan={7}>{other.condition}</td>
      </tr>
      <tr>
        <th colSpan={2}>New LTV</th>
        <td colSpan={7}>{other.newltv}</td>
      </tr>
      <tr>
        <th colSpan={2}>CLFR</th>
        <td colSpan={7}>{other.clfr}</td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible EMI</th>
        <td colSpan={7}>{other.eligibleEMI}</td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on FOIR</th>
        <td colSpan={7}>{other.loanAmountBasedOnFOIR}</td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on FOIR Based on Condition</th>
        <td colSpan={7}>{other.loanAmountBasedOnFOIRCondition}</td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount</th>
        <td colSpan={7}>{other.loanAmountBasedOnFOIRCondition}</td>
      </tr>
      <tr>
        <th colSpan={2}>LTV</th>
        <td colSpan={7}>{other.newltv}</td>
      </tr>
      <tr>
        <th colSpan={2}>Condition</th>
        <td colSpan={7}>{other.ltvCondition}</td>
      </tr>
      <tr>
        <th colSpan={2}>CLFR</th>
        <td colSpan={7}>{other.newclfr}</td>
      </tr>
      <tr>
        <th colSpan={2}>Amount</th>
        <td colSpan={7}>{other.amount}</td>
      </tr>
      <tr>
        <th colSpan={2}>FOIR</th>
        <td colSpan={7}>{other.newfoir}</td>
      </tr>
      <tr>
        <th colSpan={2}>Loan Amount Based on LTV</th>
        <td colSpan={7}>{other.newfoir}</td>
      </tr>
      <tr>
        <th colSpan={2}>Eligible Loan Amount</th>
        <td colSpan={7}>{other.eligibleLoanAmount}</td>
      </tr>
      <br />
      <br />
    </>
  );
};
