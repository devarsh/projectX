import { BankDetails } from "./bankDetails";
import { HomeLoanLAPLRDSalaryEmpReturnFilingDetails } from "./homeLoanLAPLRDSalaryEmpReturnFilingDetails";
import { HomeLoanLAPLRDSalaryEmpSalaryDetails } from "./homeLoanLAPLRDSalaryEmpSalaryDetails";
import {
  Age,
  DateFormat,
  Percentage,
  Amount,
  Address,
  Default,
} from "pages_los/pages/cam/components";

export const ApplicantDetails = ({
  applicant = {},
  others,
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
          className="form-heading"
          element="th"
          align="center"
        />
      </tr>
      <tr>
        <Default colspan={2} value="Name" element="th" />
        <Default
          colspan={7}
          value={`${applicant.salutation}${" "}${applicant?.firstName}
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
      {others.foir !== null ? (
        <tr>
          <Default
            colspan={2}
            value="FOIR or Portion of Income Considered"
            element="th"
          />
          <Percentage colspan={7} value={others?.foir} />
        </tr>
      ) : null}

      <BankDetails bank={applicant.bankDetails} />
      <Address value={applicant.contactDetails} />
      <HomeLoanLAPLRDSalaryEmpReturnFilingDetails
        returnFiling={applicant.returnFilingDetails}
      />
      <HomeLoanLAPLRDSalaryEmpSalaryDetails salary={applicant.salaryDetails} />
    </>
  );
};
