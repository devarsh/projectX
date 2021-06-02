import { BankDetails } from "./bankDetails";
import { ReturnFilingDetails } from "./returnFilingDetails";
import { SalaryDetails } from "./salaryDetails";
import {
  Age,
  DateFormat,
  Percentage,
  Amount,
  Address,
} from "pages_los/pages/cam/components";

export const ApplicantDetails = ({ applicant, others, loanAmount }) => {
  if (typeof applicant !== "object") {
    return null;
  }

  return (
    <>
      <tr>
        <th colSpan={2}>Loan Requested</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Amount value={loanAmount} />
          }
        </td>
      </tr>
      {others.foir !== null ? (
        <tr>
          <th colSpan={2}>FOIR or Portion of Income Considered</th>
          <td colSpan={7}>
            {
              //@ts-ignore
              <Percentage value={others.foir} />
            }
          </td>
        </tr>
      ) : (
        ""
      )}

      <tr>
        <th colSpan={9} className="form-heading">
          Applicant Details
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Name</th>
        <td colSpan={7}>
          {applicant.firstName} {applicant.lastName}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Date of Birth</th>
        <td colSpan={7}>{<DateFormat value={applicant.dob} />}</td>
      </tr>
      <tr>
        <th colSpan={2}>Age</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Age value={applicant.dob} />
          }
        </td>
      </tr>

      <BankDetails bank={applicant.bankDetails} />
      <Address value={applicant.contactDetails} />
      <ReturnFilingDetails returnFiling={applicant.returnFilingDetails} />
      <SalaryDetails salary={applicant.salaryDetails} />
    </>
  );
};
