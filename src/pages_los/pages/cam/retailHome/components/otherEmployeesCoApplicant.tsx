import { OtherEmployeesReturnFilingDetails } from "./otherEmployeesReturnFilingDetails";
import { OtherEmployeesSalaryDetails } from "./otherEmployeesSalaryDetails";
import { Default, Age, DateFormat } from "pages_los/pages/cam/components";

export const OtherEmployeesCoApplicantDetails = ({ coApplicant }) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-heading"
          value="Co-Applicant Details"
          element="th"
          align="center"
        />
      </tr>
      {Array.isArray(coApplicant) &&
        coApplicant.map((coApplicantDetails, index) => {
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
              {coApplicantDetails.emplCode === "01" || "03" || "04" ? (
                <OtherEmployeesReturnFilingDetails
                  returnFiling={coApplicantDetails.returnFilingDetails}
                />
              ) : (
                <OtherEmployeesSalaryDetails
                  salary={coApplicantDetails.salaryDetails}
                />
              )}

              <br />
            </>
          );
        })}
    </>
  );
};
