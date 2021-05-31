import { OtherEmployeesReturnFilingDetails } from "./otherEmployeesReturnFilingDetails";
import { OtherEmployeesSalaryDetails } from "./otherEmployeesSalaryDetails";
import { dateFormatter } from "pages_los/pages/cam/utils";
import { Age } from "pages_los/pages/cam/components";

export const OtherEmployeesApplicantDetails = ({ applicant, loanAmount }) => {
  if (typeof applicant !== "object") {
    return null;
  }

  return (
    <>
      <tr>
        <th colSpan={2}>Loan Requested</th>
        <td colSpan={7}>{loanAmount}</td>
      </tr>
      <tr>
        <th colSpan={9} className="form-heading">
          Applicant Details
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Name</th>
        <td colSpan={7}>
          {applicant.firstName}
          {applicant.lastName}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>Date of Birth</th>
        <td colSpan={7}>{dateFormatter({ val: applicant.dob })}</td>
      </tr>
      <tr>
        <th colSpan={2}>Age</th>
        <td colSpan={7}>
          {
            //@ts-ignore
            <Age value={applicant.birthDate} />
          }
        </td>
      </tr>
      {applicant.emplCode === "01" || "03" || "04" ? (
        <OtherEmployeesReturnFilingDetails
          returnFiling={applicant.returnFilingDetails}
        />
      ) : (
        <OtherEmployeesSalaryDetails salary={applicant.salaryDetails} />
      )}

      <br />
    </>
  );
};
