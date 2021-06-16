import { OtherEmployeesReturnFilingDetails } from "./otherEmployeesReturnFilingDetails";
import { OtherEmployeesSalaryDetails } from "./otherEmployeesSalaryDetails";
import {
  Default,
  Age,
  DateFormat,
  Amount,
} from "pages_los/pages/cam/components";

export const OtherEmployeesApplicantDetails = ({
  applicant = {},
  loanAmount,
}: any) => {
  if (typeof applicant !== "object") {
    return null;
  }

  return (
    <>
      <tr>
        <Default
          colspan={9}
          value="Applicant Details"
          element="th"
          align="center"
          className="form-heading"
        />
      </tr>
      <tr>
        <Default colspan={2} value="Name" element="th" />
        <Default
          colspan={7}
          value={`${applicant?.salutation}${" "}${applicant?.firstName}
                ${" "}${applicant?.middleName}${" "}${applicant?.lastName}`}
        />
      </tr>
      <tr>
        <Default colspan={2} value="Date of Birth" element="th" />
        <DateFormat colspan={7} value={applicant?.dob} />
      </tr>
      <tr>
        <Default colspan={2} value="Age" element="th" />
        <Age colspan={7} value={applicant?.birthDate} />
      </tr>
      <tr>
        <Default colspan={2} value="Loan Requested" element="th" />
        <Amount colspan={7} value={loanAmount} align="left" />
      </tr>
      <OtherEmployeesReturnFilingDetails
        returnFiling={applicant.returnFilingDetails}
      />
      <OtherEmployeesSalaryDetails salary={applicant.salaryDetails} />

      <br />
    </>
  );
};
