import { ReturnFilingDetails } from "./returnFilingDetails";
import { SalaryDetails } from "./salaryDetails";
import { Age, DateFormat } from "pages_los/pages/cam/components";

export const CoApplicantDetails = ({ coApplicant }) => {
  if (!Array.isArray(coApplicant) || coApplicant.length <= 0) {
    return null;
  }

  return (
    <>
      <tr>
        <th colSpan={9} className="form-heading">
          Co-Applicant Details
        </th>
      </tr>
      {coApplicant.map((coApplicantDetails, index) => {
        return (
          <>
            <tr key={index}>
              <th colSpan={2}>Name</th>
              <td colSpan={7}>
                {coApplicantDetails.firstName} {coApplicantDetails.lastName}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Date of Birth</th>
              <td colSpan={7}>
                {<DateFormat value={coApplicantDetails.birthDate} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Age</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Age value={coApplicantDetails.birthDate} />
                }
              </td>
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
