import "../styles.css";

export const BorrowerSalariedHomeOrCAM = () => {
  return (
    <div id="camPreviewTable">
      <table className="page">
        <tr>
          <th colSpan={4} className="form-heading">
            Particulars
          </th>
        </tr>
        <tr>
          <th colSpan={1}>Loan Requested</th>
          <td colSpan={3}>2000000</td>
        </tr>
        <tr>
          <th colSpan={1}>FOIR or Portion of Income Considered</th>
          <td colSpan={3}>70%</td>
        </tr>
        <tr>
          <th colSpan={1}></th>
          <th>Applicant</th>
          <th colSpan={2}>Co Applicant</th>
        </tr>
        <tr>
          <th colSpan={1}>Name</th>
          <td>Aayesha</td>
          <td colSpan={2}>Shaikh</td>
        </tr>
        <tr>
          <th colSpan={1}>Date of Birth</th>
          <td>01/07/1995</td>
          <td colSpan={2}>18/04/1991</td>
        </tr>
        <tr>
          <th colSpan={1}>Age</th>
          <td>25</td>
          <td colSpan={2}>29</td>
        </tr>
        <tr>
          <th colSpan={3}>Salary (Monthly)</th>
          <th>Income Considered</th>
        </tr>
        <tr>
          <th>Net Salary (Fixed) - 100%</th>
          <td>100000</td>
          <td></td>
          <td>100000</td>
        </tr>
        <tr>
          <th>Other Income (Monthly)</th>
          <td></td>
          <td>5000</td>
          <td>5000</td>
        </tr>
        <tr>
          <th>Total Income</th>
          <td>10000</td>
          <td>5000</td>
          <td>15000</td>
        </tr>
        <tr>
          <th>Obligations</th>
          <td>30000</td>
          <td></td>
          <td>30000</td>
        </tr>
        <tr>
          <th colSpan={1}>Rate of Interest</th>
          <td colSpan={3}>10%</td>
        </tr>
        <tr>
          <th colSpan={1}>Credit Score</th>
          <td colSpan={3}>700</td>
        </tr>
        <tr>
          <th colSpan={1}>Tenure</th>
          <td colSpan={3}>120</td>
        </tr>
        <tr>
          <th colSpan={1}>Rate</th>
          <td colSpan={3}>12</td>
        </tr>
        {/* if borrower salaried LAP */}
        <tr>
          <th colSpan={1}>Property Type</th>
          <td colSpan={3}>SOCP</td>
        </tr>
        {/*  */}
        <tr>
          <th colSpan={1}>Market Value of Property</th>
          <td colSpan={3}>108</td>
        </tr>
        <tr>
          <th colSpan={1}>Eligible EMI</th>
          <td colSpan={3}>36</td>
        </tr>
        <tr>
          <th colSpan={1}>Loan Amount Based on FOIR</th>
          <td colSpan={3}>24</td>
        </tr>
        <tr>
          <th colSpan={1}>LTV</th>
          <td colSpan={3}>Industrial/Commercial/Residential</td>
        </tr>
        <tr>
          <th colSpan={1}>Loan Amount Based on LTV</th>
          <td colSpan={3}>70,000,000</td>
        </tr>
        <tr>
          <th colSpan={1}>Loan Amount Based on min of FOIR and LTV</th>
          <td colSpan={3}>65%</td>
        </tr>
        <tr>
          <th colSpan={1}>
            Difference Between Applied and Eligible Loan Amount
          </th>
          <td colSpan={3}>70000000*65%=455000000</td>
        </tr>
        <tr>
          <th colSpan={1}>Message to be Displayed</th>
          <td colSpan={3}>8385155</td>
        </tr>
      </table>
    </div>
  );
};
