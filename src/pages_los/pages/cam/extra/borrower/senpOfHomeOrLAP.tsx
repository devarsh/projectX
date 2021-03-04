import "../styles.css";

export const BorrowerSENPHomeOrLAP = () => {
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
          <th></th>
          <th>Applicant</th>
          <th>Co Applicant 1</th>
          <th>Co Applicant 2</th>
        </tr>
        <tr>
          <th>Name</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th colSpan={1}>Date of Birth</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th colSpan={1}>Age</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowSpan={2}>Applicant</th>
          <th>AY</th>
          <th>AY</th>
          <th rowSpan={2}>ITR GAP</th>
        </tr>
        <tr>
          <td>2018-19</td>
          <td>2017-18</td>
        </tr>
        <tr>
          <th>Date of Filing Return</th>
          <td>14-Aug-2018</td>
          <td>15-Aug-2017</td>
          <td>12</td>
        </tr>
        <tr>
          <th>Net Profit Before Tax (PBT)</th>
          <td>600000</td>
          <td>0</td>
          <td></td>
        </tr>
        <tr>
          <th>Depreciation</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Other Income</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Total Income</th>
          <td>60000</td>
          <td>0</td>
          <td>60000</td>
        </tr>

        <tr>
          <th rowSpan={2}>Co Applicant 1</th>
          <th>AY</th>
          <th>AY</th>
          <th rowSpan={2}>ITR GAP</th>
        </tr>
        <tr>
          <td>2018-19</td>
          <td>2017-18</td>
        </tr>
        <tr>
          <th>Date of Filing Return</th>
          <td>14-Aug-2018</td>
          <td>15-Aug-2017</td>
          <td>12</td>
        </tr>
        <tr>
          <th>Net Profit Before Tax (PBT)</th>
          <td>600000</td>
          <td>0</td>
          <td></td>
        </tr>
        <tr>
          <th>Depreciation</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Other Income</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Total Income</th>
          <td>60000</td>
          <td>0</td>
          <td>60000</td>
        </tr>

        <tr>
          <th rowSpan={2}>Co Applicant 2</th>
          <th>AY</th>
          <th>AY</th>
          <th rowSpan={2}>ITR GAP</th>
        </tr>
        <tr>
          <td>2018-19</td>
          <td>2017-18</td>
        </tr>
        <tr>
          <th>Date of Filing Return</th>
          <td>14-Aug-2018</td>
          <td>15-Aug-2017</td>
          <td>12</td>
        </tr>
        <tr>
          <th>Net Profit Before Tax (PBT)</th>
          <td>600000</td>
          <td>0</td>
          <td></td>
        </tr>
        <tr>
          <th>Depreciation</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Other Income</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Total Income</th>
          <td>60000</td>
          <td>0</td>
          <td>60000</td>
        </tr>

        <tr>
          <th>Consolidated Income</th>
          <td colSpan={3}>1000000.00</td>
        </tr>

        <tr>
          <th className="form-heading">Applicant</th>
          <td colSpan={3}>10000</td>
        </tr>
        <tr className="form-heading">
          <th>Co Applicant 1</th>
          <td colSpan={3}>500000</td>
        </tr>
        <tr className="form-heading">
          <th>Co Applicant 2</th>
          <td colSpan={3}>60000</td>
        </tr>
        <tr className="form-heading">
          <th>Total</th>
          <td colSpan={3}>570000</td>
        </tr>

        <tr>
          <th>Credit Score</th>
          <td colSpan={3}>900</td>
        </tr>
        <tr>
          <th>Tenure</th>
          <td colSpan={3}>240</td>
        </tr>
        <tr>
          <th>Rate</th>
          <td colSpan={3}>9.50%</td>
        </tr>
        <tr>
          <th>Property Type</th>
          <td colSpan={3}>SOCP</td>
        </tr>
        <tr>
          <th>Market Value of Property</th>
          <td colSpan={3}>80000000</td>
        </tr>
        <tr>
          <th>Max EMI Possible</th>
          <td colSpan={3}>430000</td>
        </tr>
        <tr>
          <th>LTV Condition</th>
          <td colSpan={3}>75%</td>
        </tr>
        <tr>
          <th>FOIR</th>
          <td colSpan={3}>100%</td>
        </tr>
        {/* only come in SENP home not in LAP */}
        <tr>
          <th>Loan Amount Based on Max EMI Possible</th>
          <td colSpan={3}>43160846</td>
        </tr>
        <tr>
          <th>Loan Amount Based on LTV</th>
          <td colSpan={3}>60000000</td>
        </tr>
        <tr>
          <th>Loan Amount Based on min of FOIR and LTV</th>
          <td colSpan={3}>43160846</td>
        </tr>
        <tr>
          <th>Difference Between Applied and Eligible Loan Amount</th>
          <td colSpan={3}>88%</td>
        </tr>
        <tr>
          <th>Message to be Displayed</th>
          <td colSpan={3}>
            Congratulations!!!!! Our team will connect with you shortly
          </td>
        </tr>
      </table>
    </div>
  );
};
