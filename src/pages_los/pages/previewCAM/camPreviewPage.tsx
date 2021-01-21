import Button from "@material-ui/core/Button";
import html2canvas from "html2canvas";

export const CAMPreviewPage = () => {
  const savePDF = () => {
    const printArea: any = document.querySelector("#camPreviewTable");
    html2canvas(printArea).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.download = "dummy.jpeg";
      anchor.href = dataURL;
      anchor.click();
    });
  };

  return (
    <>
      <div id="camPreviewTable">
        <table className="page">
          <tr>
            <th colSpan={6} className="form-heading">
              A. General Details
            </th>
          </tr>
          <tr>
            <th colSpan={2}>Name of the Unit:</th>
            <td colSpan={4}>Aayesha</td>
          </tr>
          <tr>
            <th colSpan={2}>Constitution of Business:</th>
            <td colSpan={4}>Partnership</td>
          </tr>
          <tr>
            <th rowSpan={2}>Address:</th>
            <th>Regd. Address:</th>
            <td colSpan={4}>203, Atlanta Tower, Gulbai tekra, Ahmedabad</td>
          </tr>
          <tr>
            <th>Works:</th>
            <td colSpan={4}>204, Atlanta Tower, Gulbai tekra, Ahmedabad</td>
          </tr>
          <tr>
            <th colSpan={2}>Ownership of Factory / Business Premises</th>
            <td colSpan={4}>Own</td>
          </tr>
          <tr>
            <th colSpan={2}>Date of incorporation:</th>
            <td colSpan={4}>25/05/2005</td>
          </tr>
          <tr>
            <th colSpan={2}>Existing Type of Industry:</th>
            <td colSpan={4}>IT</td>
          </tr>
          <tr>
            <th colSpan={2}>Nature of Existing Business :</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Proposed business:</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>External credit rating:</th>
            <td colSpan={4}>SSL</td>
          </tr>
          <tr>
            <th colSpan={2}>Micro, Small or Medium</th>
            <td colSpan={4}>ABC12345DEF</td>
          </tr>
          <tr>
            <th colSpan={2}>PAN No:</th>
            <td colSpan={4}>AAAAA1111A</td>
          </tr>
          <tr>
            <th colSpan={2}>Udhyam No:</th>
            <td colSpan={4}>1111 1111 1111</td>
          </tr>
          <tr>
            <th colSpan={2}>CMR Ranking :</th>
            <td colSpan={4}>***</td>
          </tr>
          <tr>
            <th colSpan={2}>RF Rating :</th>
            <td colSpan={4}>****</td>
          </tr>
          <tr>
            <th colSpan={2}>Name of Promoters / Directors</th>
            <td colSpan={4}>Mr.Abc Xyz</td>
          </tr>
          <tr>
            <th rowSpan={2} colSpan={2}>
              Banking Arrangements
            </th>
            <th>Name of Bank</th>
            <th>Branch</th>
            <th>Current A/C No</th>
            <th>Average Bank Balance </th>
          </tr>
          <tr>
            <td>Axis Bak</td>
            <td>Shivranjani</td>
            <td>12345678912345</td>
            <td>0.00</td>
          </tr>
          <tr>
            <th rowSpan={13}>Loan amount (Rs.)</th>
            <th rowSpan={7}>Present:</th>
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
            <th rowSpan={6}>Proposed:</th>
          </tr>
          <tr>
            <th>Nature of Facility</th>
            <th>New / Takeover</th>
            <th>Requested ROI</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>Nature of Facility</td>
            <td>New / Takeover</td>
            <td>Requested ROI</td>
            <td>20,000</td>
          </tr>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr></tr>
          <tr>
            <td colSpan={4}>* Space for comments</td>
          </tr>
          <tr>
            <th colSpan={2}>Purpose of loan:</th>
            <td colSpan={4}>For New Project – For Construction of building</td>
          </tr>
          <tr>
            <th colSpan={2}>Turnover in current financial year</th>
            <td colSpan={4}>25 Lakh</td>
          </tr>
          <tr>
            <th colSpan={2}>
              Last 12 Months average Bank Balance & Average Utilisation of
              Working Capital Limits
            </th>
            <td colSpan={4}>1 Lakh</td>
          </tr>
          <tr>
            <th colSpan={2}>Credit Summation in Bank in Last 12 months</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>
              Inward cheque bounces, if any and % of total Cheque bounce{" "}
            </th>
            <td colSpan={4}>2%</td>
          </tr>
          {/* second step */}
          <tr>
            <th colSpan={6} className="form-heading">
              B. Business Details
            </th>
          </tr>
          <tr>
            <th colSpan={2}>Brief history of the Company</th>
            <td colSpan={4}>IT Company</td>
          </tr>
          <tr>
            <th colSpan={2}>Existing Products / Services of the company </th>
            <td colSpan={4}>Service Based</td>
          </tr>
          <tr>
            <th colSpan={2}>End Use of the Products</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Name of Raw Materials</th>
            <td colSpan={4}>Abc, Xyz</td>
          </tr>
          <tr>
            <th colSpan={2}>Name of Major Suppliers</th>
            <td colSpan={4}>Amazon</td>
          </tr>
          <tr>
            <th colSpan={2}>Payment Terms with Suppliers</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Name of Major Customers</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Payment terms with Customers</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Current Order Book Position</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Marketing & Distribution Policy/Strategy</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Name of Competitors</th>
            <td colSpan={4}>123</td>
          </tr>
          <tr>
            <th colSpan={2}>Name of Major Countries where Exporting</th>
            <td colSpan={4}>UAE, UK, Iran</td>
          </tr>
          <tr>
            <th colSpan={2}>Domestic and export sales ratio</th>
            <td colSpan={4}>2:3</td>
          </tr>
          <tr>
            <th colSpan={2}>No. of Employees</th>
            <td colSpan={4}>250+</td>
          </tr>
          <tr>
            <th colSpan={2}>Other Industry specific approvals / license</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Any awards / Recognition received </th>
            <td colSpan={4}>.....</td>
          </tr>
          {/* step third */}
          <tr>
            <th colSpan={6} className="form-heading">
              C. Management Details
            </th>
          </tr>
          <tr>
            <th colSpan={2}>Name of the Partner/Director</th>
            <td colSpan={4}>Aayesha</td>
          </tr>
          <tr>
            <th colSpan={2}>PAN No.</th>
            <td colSpan={4}>AAAAA1111A</td>
          </tr>
          <tr>
            <th colSpan={2}>Aadhar No.</th>
            <td colSpan={4}>1111 1111 1111</td>
          </tr>
          <tr>
            <th colSpan={2}>DIN / LLPIN No.</th>
            <td colSpan={4}>ABC12345DEF</td>
          </tr>
          <tr>
            <th colSpan={2}>Age</th>
            <td colSpan={4}>25</td>
          </tr>
          <tr>
            <th colSpan={2}>Educational Qualification</th>
            <td colSpan={4}>B.E</td>
          </tr>
          <tr>
            <th colSpan={2}>Experience</th>
            <td colSpan={4}>3+ years</td>
          </tr>
          <tr>
            <th colSpan={2}>Associate Companies</th>
            <td colSpan={4}>N/A</td>
          </tr>
          <tr>
            <th colSpan={2}>Profit Sharing / Shareholding %</th>
            <td colSpan={4}>10%</td>
          </tr>
          <tr>
            <th colSpan={2}>Networth</th>
            <td colSpan={4}>25%</td>
          </tr>
          <tr>
            <th colSpan={2}>Resposnibilities Handled in the Comapany</th>
            <td colSpan={4}>No</td>
          </tr>
          <tr>
            <th colSpan={2}>Credit Score</th>
            <td colSpan={4}>700</td>
          </tr>
          <tr>
            <th colSpan={2} rowSpan={2}>
              Last three years Income Summary :
            </th>
            <th>FY __</th>
            <th>FY __</th>
            <th>FY __</th>
            <th>FY __</th>
          </tr>
          <tr>
            <td>2016-2017</td>
            <td>2017-2018</td>
            <td>2018-2019</td>
            <td>2019-2020</td>
          </tr>
          {/* step four */}
          <tr>
            <th colSpan={6} className="form-heading">
              D.Financial Ratios
            </th>
          </tr>
          <tr>
            <th colSpan={3}>Particulars</th>
            <th>FY __</th>
            <th>FY Previous to latets Financial Year</th>
            <th>FY Latest Financial Year</th>
          </tr>
          <tr>
            <th colSpan={3}>PROFIT & LOSS DETAILS</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Revenue</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>EBITDA</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Depreciation</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>EBIT</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Interest Expenses</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>EBT</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Tax</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>PAT</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>Cash Profit</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>EBITDA (%)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>EBT (%)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>PAT (%)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Cash Profit (%)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>(Adjustments)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Directors / Partners Remuneration</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Interest on Capital</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>Adjusted PAT</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>Adjusted Cash Profit</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>{" "}
          <tr>
            <td colSpan={3}>Adjusted PAT (%)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Adjusted Cash Profit (%)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>DSCR</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>BALANCE SHEET DETAILS</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Share Capital</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Net Worth (Quasi)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Long Term Debt Fund</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Short Term Debt Fund</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>Long Term Debt / Equity</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>TOL / TNW</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>{" "}
          <tr>
            <td colSpan={3}>Current Assets</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Current Liabilities</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>{" "}
          <tr>
            <th colSpan={3}>Current Ratio</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>Operating cycle days</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={6}>
              *Estimated and Projected turnover for the next two years is Rs.__
              in FY __ and Rs. __ in FY ___.
            </td>
          </tr>
          {/* //step five */}
          <tr>
            <th colSpan={6} className="form-heading">
              F.Collateral Details
            </th>
          </tr>
          <tr>
            <th colSpan={6} className="formLabelHeading">
              PRIMARY SECURITY
            </th>
          </tr>
          <tr>
            <th colSpan={3}>Address of the Property</th>
            <th>Area of the Property</th>
            <th>Owner</th>
            <th>Market Value (Rs. In Crore)</th>
          </tr>
          <tr>
            <td colSpan={3}>204, abc, xyz</td>
            <td>2500 sq.meter</td>
            <td>Mrs.Abc xyz</td>
            <td>1 crore</td>
          </tr>
          <tr>
            <td colSpan={3}>203, abc, xyz</td>
            <td>2100 sq.meter</td>
            <td>Mr.Abc xyz</td>
            <td>5 crore</td>
          </tr>
          <tr>
            <th colSpan={6}>Total</th>
          </tr>
          <tr>
            <th colSpan={6} className="formLabelHeading">
              COLLATERAL SECURITY{" "}
            </th>
          </tr>
          <tr>
            <th colSpan={3}>Address of the Property</th>
            <th>Area of the Property</th>
            <th>Owner</th>
            <th>Market Value (Rs. In Crore)</th>
          </tr>
          <tr>
            <td colSpan={3}>204, abc, xyz</td>
            <td>2500 sq.meter</td>
            <td>Mrs.Abc xyz</td>
            <td>1 crore</td>
          </tr>
          <tr>
            <td colSpan={3}>203, abc, xyz</td>
            <td>2100 sq.meter</td>
            <td>Mr.Abc xyz</td>
            <td>5 crore</td>
          </tr>
          <tr>
            <th colSpan={6}>Total</th>
          </tr>
          <tr>
            <th colSpan={5} style={{ textAlign: "end" }}>
              Collateral Coverage
            </th>
            <td>3400 sq.meter</td>
          </tr>
          <tr>
            <th colSpan={5} style={{ textAlign: "end" }}>
              FACR
            </th>
            <td>N/A</td>
          </tr>
          <tr>
            <th colSpan={5} style={{ textAlign: "end" }}>
              ACR
            </th>
            <td>N/A</td>
          </tr>
          <tr>
            <th colSpan={6} className="formLabelHeading">
              PERSONAL GUARANTE
            </th>
          </tr>
          <tr>
            <th colSpan={2}>Name of Guarantor</th>
            <th>PAN No.</th>
            <th>Net Worth </th>
          </tr>
          <tr>
            <td colSpan={2}>Ms.Aayesha</td>
            <td>AAAAA1111A</td>
            <td>5,000</td>
          </tr>
          <tr>
            <td colSpan={2}>Mr.Abc</td>
            <td>BBBBB2222B</td>
            <td>10,000</td>
          </tr>
          <tr>
            <td colSpan={2}>Mr.Singh</td>
            <td>AAAAA1111A</td>
            <td>10,000</td>
          </tr>
          <tr>
            <td colSpan={2}>Mr.Abc</td>
            <td>CCCCC1111C</td>
            <td>12,000</td>
          </tr>
        </table>

        <Button onClick={savePDF}>Print</Button>
      </div>
    </>
  );
};
