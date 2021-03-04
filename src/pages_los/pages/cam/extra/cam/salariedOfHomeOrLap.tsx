import "../styles.css";

export const CAMSalariedHomeOrLAP = () => {
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
          <td colSpan={3}>65%</td>
        </tr>
        <tr>
          <th></th>
          <th>Applicant</th>
          <th colSpan={2}>Co Applicant</th>
        </tr>
        <tr>
          <th>Name</th>
          <td></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <th>Date of Birth</th>
          <td></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <th>Age</th>
          <td></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <th>Salary (Monthly)</th>
          <td colSpan={2}>Jan-21</td>
          <th>Income Considered</th>
        </tr>

        <tr>
          <th>Net Salary (Fixed) - 100%</th>
          <td>100000</td>
          <td></td>
          <th>100000</th>
        </tr>
        <tr>
          <th>Variable Pay - 50%</th>
          <td></td>
          <td></td>
          <th>0</th>
        </tr>
        <tr>
          <th>Bonus - 50% Of CY</th>
          <td></td>
          <td></td>
          <th>0</th>
        </tr>
        <tr>
          <th>Incentive</th>
          <td></td>
          <td></td>
          <th>0</th>
        </tr>
        <tr>
          <th>Agriculture Income - 20%</th>
          <td></td>
          <td></td>
          <th>0</th>
        </tr>
        <tr>
          <th>Other Allowances</th>
          <td></td>
          <td></td>
          <th>0</th>
        </tr>
        <tr>
          <th>Other Income</th>
          <td></td>
          <td></td>
          <th>0</th>
        </tr>
        <tr>
          <th>Total Income</th>
          <td>100000</td>
          <th></th>
          <td>100000</td>
        </tr>
        <tr>
          <th>Obligations</th>
          <td>10000</td>
          <th>5000</th>
          <th>15000</th>
        </tr>
        <tr>
          <th>Actual Obligations</th>
          <td>30000</td>
          <td></td>
          <th>30000</th>
        </tr>
        <tr>
          <th>Credit Score</th>
          <td colSpan={3}>600</td>
        </tr>

        <tr>
          <th>Tenure</th>
          <td colSpan={3}>240</td>
        </tr>
        <tr>
          <th>Rate</th>
          <td colSpan={3}>9.50%</td>
        </tr>
        {/* only inCAM salaried LAP */}
        <tr>
          <th>Property Type</th>
          <td>Commercial Rented</td>
        </tr>
        <tr>
          <th>Market Value of Property</th>
          <td colSpan={3}>6000000</td>
        </tr>
        <tr>
          <th>Eligible EMI</th>
          <td colSpan={3}>35000</td>
        </tr>
        <tr>
          <th>Loan Amount Based on FOIR</th>
          <td colSpan={3}>3754836</td>
        </tr>
        <tr>
          <th>LTV</th>
          <td colSpan={3}>80%</td>
        </tr>
        <tr>
          <th>Loan Amount Based on LTV</th>
          <td colSpan={3}>48000000</td>
        </tr>
        <tr>
          <th>Loan Amount Based on min of FOIR and LTV</th>
          <td colSpan={3}>3754836</td>
        </tr>
        <tr>
          <th>Difference Between Applied and Eligible Loan Amount</th>
          <td colSpan={3}>-25%</td>
        </tr>
        <tr>
          <th>Loan Amount Condition</th>
          <td colSpan={3}>3754836</td>
        </tr>
        <tr>
          <th colSpan={4} className="form-heading">
            No
          </th>
        </tr>
        <tr>
          <th>Eligible Loan Amount</th>
          <td colSpan={3}>3754836</td>
        </tr>
      </table>
    </div>
  );
};
