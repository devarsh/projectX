import "../styles.css";

export const CAMSENPHomeOrLAP = () => {
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
          <th>Date of Birth</th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Age</th>
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
          <td>600000</td>
          <td>0</td>
          <td>600000</td>
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
          <td>200000</td>
          <td>150000</td>
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
          <td>200000</td>
          <td>150000</td>
          <td>200000</td>
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
          <td>200000</td>
          <td>150000</td>
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
          <td>200000</td>
          <td>150000</td>
          <td>200000</td>
        </tr>

        <tr>
          <th>Consolidated Income</th>
          <td colSpan={3}>1000000.00</td>
        </tr>

        <tr>
          <th colSpan={4}>Obligation</th>
        </tr>

        <tr>
          <th className="form-heading">Applicant</th>
          <td colSpan={3}>10000</td>
        </tr>
        <tr className="form-heading">
          <th>Co Applicant 1</th>
          <td colSpan={3}>50000</td>
        </tr>
        <tr className="form-heading">
          <th>Co Applicant 2</th>
          <td colSpan={3}>70000</td>
        </tr>
        <tr className="form-heading">
          <th>Total</th>
          <td colSpan={3}>130000</td>
        </tr>

        <tr>
          <th>Credit Score</th>
          <td colSpan={3}>556</td>
        </tr>
        <tr>
          <th>Tenure</th>
          <td colSpan={3}>240</td>
        </tr>
        <tr>
          <th>Rate</th>
          <td colSpan={3}>10.00%</td>
        </tr>
        {/* only in SNEP LAP */}
        <tr>
          <th>Property Type</th>
          <td colSpan={3}>SOCP</td>
        </tr>
        <tr>
          <th>Market Value of Property</th>
          <td colSpan={3}>100000000</td>
        </tr>

        <tr>
          <th>FOIR</th>
          <td colSpan={3}>72.00%</td>
        </tr>
        <tr>
          <th>Condition</th>
          <td colSpan={3}>Fine</td>
        </tr>
        <tr>
          <th>LTV Condition</th>
          <td colSpan={3}>75%</td>
        </tr>
        <tr>
          <th>New LTV</th>
          <td colSpan={3}>61%</td>
        </tr>
        <tr>
          <th>CLFR</th>
          <td colSpan={3}>133%</td>
        </tr>
        <tr>
          <th>Eligible EMI</th>
          <td colSpan={3}>590000</td>
        </tr>

        <tr>
          <th>Loan Amount Based on FOIR</th>
          <td colSpan={3}>61138525</td>
        </tr>
        <tr>
          <th>Loan Amount Based on FOIR Based on Condition</th>
          <td colSpan={3}>61138525</td>
        </tr>

        <tr>
          <th>Loan Amount</th>
          <td colSpan={3}>Put LTV Up to 75%</td>
        </tr>
        <tr>
          <th>LTV</th>
          <td colSpan={3}>67.00%</td>
        </tr>
        <tr>
          <th>Condition</th>
          <td colSpan={3}>Fine</td>
        </tr>
        <tr>
          <th>CLFR</th>
          <td colSpan={3}>145%</td>
        </tr>
        <tr>
          <th>Amount</th>
          <td colSpan={3}>67000000</td>
        </tr>
        <tr>
          <th>FOIR</th>
          <td colSpan={3}>78%</td>
        </tr>
        <tr>
          <th>Loan Amount Based on LTV</th>
          <td colSpan={3}>67000000</td>
        </tr>
        <tr>
          <th>Final Amount</th>
          <td colSpan={3}>
            Would you like to proceed as score is less than 600?
          </td>
        </tr>
        <tr>
          <th colSpan={4}>Yes</th>
        </tr>
        <tr>
          <th>Eligible Loan Amount</th>
          <td colSpan={3}>67000000</td>
        </tr>
      </table>
    </div>
  );
};
