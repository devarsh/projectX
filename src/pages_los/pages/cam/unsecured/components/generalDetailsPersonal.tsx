import { AddressDetails } from "./addressDetails";
import { BankDetails } from "./bankingArrangements";
import { IncomeSummaryDetails } from "./incomeSummary";

export const GeneralDetailsPersonal = ({ general }) => {
  if (!Array.isArray(general) || general.length <= 0) {
    return (
      <>
        <tr>
          <th className="form-heading" colSpan={9}>
            General Details
          </th>
        </tr>
        <tr>
          <th>Invalid data</th>
        </tr>
      </>
    );
  }
  console.log(general);
  return (
    <>
      <tr>
        <th className="form-heading" colSpan={9}>
          General Details
        </th>
      </tr>
      {general.map((personlaDetail) => {
        return (
          <>
            <tr>
              <th colSpan={2}>Name of the Person</th>
              <td colSpan={7}>{personlaDetail.firstName}</td>
            </tr>
            <tr>
              <th colSpan={2}>Age </th>
              <td colSpan={7}>{}</td>
            </tr>
            <tr>
              <th colSpan={2}>Educational Qualification</th>
              <td colSpan={7}>{personlaDetail.educationQalification}</td>
            </tr>
            <tr>
              <th colSpan={2}>Residential Type</th>
              <td colSpan={7}>{personlaDetail.residentialType}</td>
            </tr>
            <tr>
              <th colSpan={2}>PAN No</th>
              <td colSpan={7}>{personlaDetail.panNumber}</td>
            </tr>
            <tr>
              <th colSpan={2}>Employment Type</th>
              <td colSpan={7}>{}</td>
            </tr>
            <tr>
              <th colSpan={2}>Name of the Employer</th>
              <td colSpan={7}>{}</td>
            </tr>
            <tr>
              <th colSpan={2}>Total Work Experience</th>
              <td colSpan={7}>{personlaDetail.experience}</td>
            </tr>
            <tr>
              <th colSpan={2}>Net Monthly Salary</th>
              <td colSpan={7}>{}</td>
            </tr>
            <tr>
              <th colSpan={2}>Any other Source of Income</th>
              <td colSpan={7}>{personlaDetail.sourceIncomeOther}</td>
            </tr>
            <tr>
              <th colSpan={2}>CIBIL Score</th>
              <td colSpan={7}>{}</td>
            </tr>
            <tr>
              <th colSpan={2}>CMR Ranking</th>
              <td colSpan={7}>{}</td>
            </tr>
            <tr>
              <th colSpan={2}>RF Rating</th>
              <td colSpan={7}>{}</td>
            </tr>
            <tr>
              <th colSpan={2}>Purpose of loan</th>
              <td colSpan={7}>{personlaDetail.purposeLoan}</td>
            </tr>
            <tr>
              <th colSpan={2}>Moratorium taken or not</th>
              <td colSpan={7}>{personlaDetail.maratoriumTaken}</td>
            </tr>
            <AddressDetails address={personlaDetail.contactDetails} />
            <BankDetails bank={personlaDetail.bankDetails} />
            <IncomeSummaryDetails income={personlaDetail.incomeDetails} />
          </>
        );
      })}
    </>
  );
};
