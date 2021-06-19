import { HomeLoanLAPLRDSalaryEmpReturnFilingDetails } from "./homeLoanLAPLRDSalaryEmpReturnFilingDetails";
import { HomeLoanLAPLRDSalaryEmpSalaryDetails } from "./homeLoanLAPLRDSalaryEmpSalaryDetails";
import {
  Default,
  Age,
  DateFormat,
  NotAvailable,
} from "pages_los/pages/cam/components";

export const CoApplicantDetails = ({ coApplicant }) => {
  if (!Array.isArray(coApplicant) || coApplicant.length <= 0) {
    return (
      <>
        <br />
        <tr>
          <Default
            className="form-heading"
            colspan={9}
            value="Co-Applicant Details"
            element="th"
            align="center"
          />
        </tr>
        <tr>
          <NotAvailable />
        </tr>
      </>
    );
  }
  return (
    <>
      <br />
      <tr>
        <Default
          className="form-heading"
          colspan={9}
          value="Co-Applicant Details"
          element="th"
          align="center"
        />
      </tr>
      {coApplicant.map((coApplicantDetails, index) => {
        return (
          <>
            <tr key={index}>
              <Default colspan={2} value="Name" element="th" />
              <Default
                colspan={7}
                value={`${coApplicantDetails?.salutation}${" "}${
                  coApplicantDetails?.firstName
                }
                ${" "}${coApplicantDetails?.middleName}${" "}${
                  coApplicantDetails?.lastName
                }`}
              />
            </tr>
            <tr>
              <Default colspan={2} value="Date of Birth" element="th" />
              <DateFormat colspan={7} value={coApplicantDetails?.birthDate} />
            </tr>
            <tr>
              <Default colspan={2} value="Age" element="th" />
              <Age colspan={7} value={coApplicantDetails?.birthDate} />
            </tr>
            <HomeLoanLAPLRDSalaryEmpReturnFilingDetails
              returnFiling={coApplicantDetails.returnFilingDetails}
            />
            <HomeLoanLAPLRDSalaryEmpSalaryDetails
              salary={coApplicantDetails.salaryDetails}
            />
            <br />
          </>
        );
      })}
    </>
  );
};
