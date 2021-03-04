import "../styles.css";

export const PersonalLoan = () => {
  return (
    <div id="camPreviewTable">
      <table className="page">
        <tr>
          <th colSpan={7} className="form-heading">
            A. General Details
          </th>
        </tr>
        <tr>
          <th colSpan={3}>Name of the Person:</th>
          <td colSpan={4}>Aayesha</td>
        </tr>
        <tr>
          <th colSpan={3}>Age</th>
          <td colSpan={4}>25</td>
        </tr>
        <tr>
          <th colSpan={3}>Educational Qualification</th>
          <td colSpan={4}>B.E</td>
        </tr>
        <tr>
          <th colSpan={3}>Residential Address:</th>
          <td colSpan={4}>25/05/2005</td>
        </tr>
        <tr>
          <th colSpan={3}>Residential Type</th>
          <td colSpan={4}>N/A</td>
        </tr>
        <tr>
          <th colSpan={3}>PAN No:</th>
          <td colSpan={4}>IT</td>
        </tr>
        <tr>
          <th colSpan={3}>Aadhar No:</th>
          <td colSpan={4}>N/A</td>
        </tr>
        <tr>
          <th colSpan={3}>Employment Type:</th>
          <td colSpan={4}>SSL</td>
        </tr>
        <tr>
          <th colSpan={3}>Name of the Employer:</th>
          <td colSpan={4}>ABC12345DEF</td>
        </tr>
        <tr>
          <th colSpan={3}>Total Work Experience</th>
          <td colSpan={4}>AAAAA1111A</td>
        </tr>
        <tr>
          <th colSpan={3}>Net Monthly Salary</th>
          <td colSpan={4}>1111 1111 1111</td>
        </tr>
        <tr>
          <th colSpan={3}>Any other Source of Income</th>
          <td colSpan={4}>***</td>
        </tr>
        <tr>
          <th colSpan={3}>CIBIL Score</th>
          <td colSpan={4}>****</td>
        </tr>
        <tr>
          <th colSpan={3}>CMR Ranking :</th>
          <td colSpan={4}>Mr.Abc Xyz</td>
        </tr>
        <tr>
          <th colSpan={3}>RF Rating :</th>
          <td colSpan={4}>Mr.Abc Xyz</td>
        </tr>
        <tr>
          <th rowSpan={2} colSpan={3}>
            Banking Arrangements
          </th>
          <th>Name of Bank</th>
          <th>Address</th>
          <th>Current A/C No</th>
          <th>Balance</th>
        </tr>
        <tr>
          <td>Axis Bak</td>
          <td>Shivranjani</td>
          <td>12345678912345</td>
          <td>0.00</td>
        </tr>
        <tr>
          <th rowSpan={13}>Loan amount (Rs.)</th>
          <th rowSpan={7} colSpan={2}>
            Present:
          </th>
        </tr>
        <tr>
          <th>Nature of Facility</th>
          <th>Name of Bank</th>
          <th>O/s Amount as on</th>
          <th>Rate of Interest</th>
        </tr>
        <tr>
          <td>Nature of Facility</td>
          <td>AXIS</td>
          <td>25,000</td>
          <td>2%</td>
        </tr>
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr></tr>
        <tr>
          <td colSpan={4}>* Space for Comments</td>
        </tr>
        <tr></tr>
        <tr>
          <th rowSpan={6} colSpan={2}>
            Proposed:
          </th>
        </tr>
        <tr>
          <th>Nature of Facility</th>
          <th>New / Takeover</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Nature of Facility</td>
          <td>New / Takeover</td>
          <td>20,000</td>
        </tr>
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
        </tr>
        <tr></tr>
        <tr>
          <td colSpan={4}>* Space for comments</td>
        </tr>
        <tr>
          <th colSpan={3}>Purpose of loan:</th>
          <td colSpan={4}>For New Project – For Construction of building</td>
        </tr>
        <tr>
          <th colSpan={3} rowSpan={2}>
            Last three years Income Summary :
          </th>
          <th>FY __</th>
          <th>FY __</th>
          <th>FY __</th>
          <th></th>
        </tr>
        <tr>
          <td>2016-2017</td>
          <td>2017-2018</td>
          <td>2018-2019</td>
          <td></td>
        </tr>
        <tr>
          <th colSpan={3}>Average Banking Balance</th>
          <td colSpan={4}>1,000</td>
        </tr>
        <tr>
          <th colSpan={3}>Moratorium taken or not</th>
          <td colSpan={4}>Yes</td>
        </tr>
        <tr>
          <th colSpan={7} className="form-heading">
            PERSONAL GUARANTE
          </th>
        </tr>
        <tr>
          <th>Name of Guarantor</th>
          <th>PAN No.</th>
          <th>Net Worth </th>
        </tr>
        <tr>
          <td>Ms.Aayesha</td>
          <td>AAAAA1111A</td>
          <td>5,000</td>
        </tr>
        <tr>
          <td>Mrs.Singh</td>
          <td>BBBBB2222B</td>
          <td>10,000</td>
        </tr>
        <tr>
          <td>Mr.Abhi</td>
          <td>AAAAA1111A</td>
          <td>10,000</td>
        </tr>
        <tr>
          <td>Mr.Singh</td>
          <td>CCCCC1111C</td>
          <td>12,000</td>
        </tr>
      </table>
    </div>
  );
};
