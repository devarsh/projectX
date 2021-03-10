import { BankDetails } from "./bankDetails";
import { ContactDetails } from "./contactDetails";
import { ReturnFilingDetails } from "./returnFilingDetails";
import { SalaryDetails } from "./salaryDetails";
import { getAge } from "pages_los/pages/cam/utils";

export const ApplicantDetails = ({ applicant }) => {
  if (typeof applicant !== "object") {
    return null;
  }

  return (
    <>
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
        <td colSpan={7}>{applicant.dob}</td>
      </tr>
      <tr>
        <th colSpan={2}>Age</th>
        <td colSpan={7}>{getAge({ date: applicant.dob })}</td>
      </tr>

      <BankDetails bank={applicant.bankDetails} />
      <ContactDetails contact={applicant.contactDetails} />
      <ReturnFilingDetails returnFiling={applicant.returnFilingDetails} />
      <SalaryDetails salary={applicant.salaryDetails} />
    </>
  );
};
