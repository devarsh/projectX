import { BankDetails } from "./bankingArrangements";
import { IncomeSummaryDetails } from "./incomeSummary";
import {
  Age,
  Address,
  Default,
  Amount,
  DateFormat,
} from "pages_los/pages/cam/components";

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
  return (
    <>
      <tr>
        <th className="form-heading" colSpan={9}>
          General Details
        </th>
      </tr>
      {general.map((personalDetail) => {
        return (
          <>
            <tr>
              <th colSpan={2}>Name of the Person</th>
              <td colSpan={7}>
                {personalDetail.salutation} {personalDetail?.firstName}{" "}
                {personalDetail?.middleName} {personalDetail?.lastName}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Birth Date</th>
              <td colSpan={7}>
                {<DateFormat value={personalDetail?.dob ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Age</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Age value={personalDetail?.dob ?? ""} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Educational Qualification</th>
              <td colSpan={7}>
                {
                  <Default
                    value={personalDetail?.educationQalification ?? ""}
                  />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Residential Type</th>
              <td colSpan={7}>
                {<Default value={personalDetail?.residentialType ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>PAN No</th>
              <td colSpan={7}>
                {<Default value={personalDetail?.panNumber ?? ""} />}
              </td>
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
              <td colSpan={7}>
                {<Default value={personalDetail?.experience ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Net Monthly Salary</th>
              <td colSpan={7}>{}</td>
            </tr>
            <tr>
              <th colSpan={2}>Any other Source of Income</th>
              <td colSpan={7}>
                {<Default value={personalDetail?.sourceIncomeOthe ?? ""} />}
              </td>
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
              <th colSpan={2}>Purpose of loan</th>
              <td colSpan={7}>
                {<Default value={personalDetail?.purposeLoan ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Moratorium taken or not</th>
              <td colSpan={7}>
                {<Default value={personalDetail?.maratoriumTaken ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Last 12 Months average Bank Balance</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={personalDetail?.averageBankBal ?? ""} />
                }
              </td>
            </tr>
            <Address value={personalDetail?.contactDetails ?? ""} />
            <BankDetails bank={personalDetail?.bankDetails ?? ""} />
            <IncomeSummaryDetails
              income={personalDetail?.incomeDetails ?? ""}
            />
          </>
        );
      })}
    </>
  );
};
