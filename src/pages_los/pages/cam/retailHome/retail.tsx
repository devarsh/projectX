import {
  ApplicantDetails,
  CoApplicantDetails,
  OtherDetails,
  OtherLRDDetails,
  OtherEmployeesOtherDetails,
  OtherEmployeesCoApplicantDetails,
  OtherEmployeesApplicantDetails,
} from "./components";

export const RetailHome = ({ data, others }) => {
  let {
    applicantDetails,
    coApplicantDetails,
    OthersDetails,
    loanAmount,
  } = data;

  return (
    <table className="page">
      <tbody>
        {(others.productID === "12300001" || others.productID === "12300002") &&
        (others.employeeCode === "01" ||
          others.employeeCode === "03" ||
          others.employeeCode === "04") ? (
          <>
            <OtherEmployeesApplicantDetails
              applicant={applicantDetails}
              loanAmount={loanAmount}
            />
            <OtherEmployeesCoApplicantDetails
              coApplicant={coApplicantDetails}
            />
            <OtherEmployeesOtherDetails other={OthersDetails} />
          </>
        ) : (others.productID === "12300001" ||
            others.productID === "12300002") &&
          others.employeeCode === "02" ? (
          <>
            <ApplicantDetails
              applicant={applicantDetails}
              others={OthersDetails}
              loanAmount={loanAmount}
            />
            <CoApplicantDetails coApplicant={coApplicantDetails} />
            <OtherDetails others={OthersDetails} />
          </>
        ) : others.productID === "12300003" &&
          (others.employeeCode === "01" ||
            others.employeeCode === "02" ||
            others.employeeCode === "03" ||
            others.employeeCode === "04") ? (
          <>
            <ApplicantDetails
              applicant={applicantDetails}
              others={OthersDetails}
              loanAmount={loanAmount}
            />
            <CoApplicantDetails coApplicant={coApplicantDetails} />
            <OtherLRDDetails others={OthersDetails} />
          </>
        ) : (
          <>
            <ApplicantDetails
              applicant={applicantDetails}
              others={OthersDetails}
              loanAmount={loanAmount}
            />
            <CoApplicantDetails coApplicant={coApplicantDetails} />
            <OtherLRDDetails others={OthersDetails} />
          </>
        )}
      </tbody>
    </table>
  );
};
