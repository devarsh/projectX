import { OtherEmployeesReturnFilingDetails } from "./otherEmployeesReturnFilingDetails";
import { OtherEmployeesSalaryDetails } from "./otherEmployeesSalaryDetails";
import { getAge, dateFormatter } from "pages_los/pages/cam/utils";

export const OtherEmployeesCoApplicantDetails = ({ coApplicant }) => {
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
                {coApplicantDetails.firstName}
                {coApplicantDetails.lastName}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Date of Birth</th>
              <td colSpan={7}>
                {dateFormatter({ val: coApplicantDetails.birthDate })}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Age</th>
              <td colSpan={7}>
                {getAge({ date: coApplicantDetails.birthDate })}
              </td>
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
