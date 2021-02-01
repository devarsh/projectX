import "../styles.css";

export const LRDBorrower = () => {
  return (
    <div id="camPreviewTable">
      <table className="page">
        <tr>
          <th colSpan={5} className="form-heading">
            A. General Details
          </th>
        </tr>
        <tr>
          <th colSpan={2}>Loan Requested</th>
          <td colSpan={3}>2000000</td>
        </tr>
        <tr>
          <th colSpan={2}></th>
          <th>Applicant</th>
          <th colSpan={2}>Co Applicant</th>
        </tr>
        <tr>
          <th colSpan={2}>Name</th>
          <td>Aayesha</td>
          <td colSpan={2}>Shaikh</td>
        </tr>
        <tr>
          <th colSpan={2}>Date of Birth</th>
          <td>01/07/1995</td>
          <td colSpan={2}>18/04/1991</td>
        </tr>
        <tr>
          <th colSpan={2}>Age</th>
          <td>25</td>
          <td colSpan={2}>29</td>
        </tr>
        <tr>
          <th colSpan={2}>Rent</th>
          <td colSpan={3}>200000</td>
        </tr>
        <tr>
          <th colSpan={2}>Rate of Interest</th>
          <td colSpan={3}>10%</td>
        </tr>
        <tr>
          <th colSpan={2}>Increase in Rent</th>
          <td colSpan={3}>5%</td>
        </tr>
        <tr>
          <th colSpan={2}>Total Month Lease Period In Months</th>
          <td colSpan={3}>120</td>
        </tr>
        <tr>
          <th colSpan={2}>Months Passsed</th>
          <td colSpan={3}>12</td>
        </tr>
        <tr>
          <th colSpan={2}>Balance Lease period remaining</th>
          <td colSpan={3}>108</td>
        </tr>
        <tr>
          <th colSpan={2}>Rent Revision Frequency</th>
          <td colSpan={3}>36</td>
        </tr>
        <tr>
          <th colSpan={2}>Rent Revision Month</th>
          <td colSpan={3}>24</td>
        </tr>
        <tr>
          <th colSpan={2}>Property Type</th>
          <td colSpan={3}>Industrial/Commercial/Residential</td>
        </tr>
        <tr>
          <th colSpan={2}>Property Value</th>
          <td colSpan={3}>70,000,000</td>
        </tr>
        <tr>
          <th colSpan={2}>LTV</th>
          <td colSpan={3}>65%</td>
        </tr>
        <tr>
          <th colSpan={2}>Loan Based on LTV</th>
          <td colSpan={3}>70000000*65%=455000000</td>
        </tr>
        <tr>
          <th colSpan={2}>Eligible Amount Based on Rent</th>
          <td colSpan={3}>8385155</td>
        </tr>
        <tr>
          <th colSpan={2}>Minimum of Loan Based on LTV and Rent</th>
          <td colSpan={3}>8385155</td>
        </tr>

        <tr>
          <th colSpan={2}>Eligible EMI</th>
          <td colSpan={3}>118052</td>
        </tr>

        <tr>
          <th colSpan={2}>Credit Score</th>
          <td colSpan={3}>500</td>
        </tr>

        <tr>
          <th colSpan={2}>Final Amount</th>
          <td colSpan={3}>
            Would you like to proceed as score is less than 600?
          </td>
        </tr>

        <tr>
          <th colSpan={2}>Eligibility</th>
          <td colSpan={3}>
            {/* if credit score is less than 600 then show decline msg */}
            Congratulations!!!!! You are eligible for loan amount of Rs.
            8385155.Congratulations!!!!! Our team will connect with you shortly.
          </td>
        </tr>
      </table>
    </div>
  );
};
