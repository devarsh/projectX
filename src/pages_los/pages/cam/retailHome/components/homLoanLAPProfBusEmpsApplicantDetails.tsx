import { HomLoanLAPProfBusEmplReturnFilingDetails } from "./homLoanLAPProfBusEmpReturnFilingDetails";
import { HomLoanLAPProfBusEmplSalaryDetails } from "./homLoanLAPProfBusEmplSalaryDetails";
import {
  Default,
  Age,
  DateFormat,
  Amount,
} from "pages_los/pages/cam/components";

export const HomLoanLAPProfBusEmplApplicantDetails = ({
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
        <Age colspan={7} value={applicant?.dob} />
      </tr>
      <tr>
        <Default colspan={2} value="Loan Requested" element="th" />
        <Amount colspan={7} value={loanAmount} align="left" />
      </tr>
      <HomLoanLAPProfBusEmplReturnFilingDetails
        returnFiling={applicant.returnFilingDetails}
      />
      <HomLoanLAPProfBusEmplSalaryDetails salary={applicant.salaryDetails} />

      <br />
    </>
  );
};
