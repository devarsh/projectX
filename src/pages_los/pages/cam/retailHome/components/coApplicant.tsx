import { ReturnFilingDetails } from "./returnFilingDetails";
import { SalaryDetails } from "./salaryDetails";
import { Default, Age, DateFormat } from "pages_los/pages/cam/components";

export const CoApplicantDetails = ({ coApplicant }) => {
  return (
    <>
      <tr>
        <Default
          className="form-heading"
          colspan={9}
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
              <ReturnFilingDetails
                returnFiling={coApplicantDetails.returnFilingDetails}
              />
              <SalaryDetails salary={coApplicantDetails.salaryDetails} />
              <br />
            </>
          );
        })}
    </>
  );
};
