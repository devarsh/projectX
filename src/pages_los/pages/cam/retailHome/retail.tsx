import {
  ApplicantDetails,
  CoApplicantDetails,
  OtherLRDDetails,
  HomLoanLAPProfBusEmplCoApplicantDetails,
  HomLoanLAPProfBusEmplApplicantDetails,
  HomeLoanLAPSalariedEligiblityDetails,
  HomeLoanLAPProfBusEligibilityDetails,
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
        (others.employeeCode === "01" || others.employeeCode === "03") ? (
          <>
            <HomLoanLAPProfBusEmplApplicantDetails
              applicant={applicantDetails}
              loanAmount={loanAmount}
            />
            <HomLoanLAPProfBusEmplCoApplicantDetails
              coApplicant={coApplicantDetails}
            />
            <HomeLoanLAPProfBusEligibilityDetails other={OthersDetails} />
          </>
        ) : others.productID === "12300001" ||
          (others.productID === "12300002" && others.employeeCode === "02") ? (
          <>
            <ApplicantDetails
              applicant={applicantDetails}
              others={OthersDetails}
              loanAmount={loanAmount}
            />
            <CoApplicantDetails coApplicant={coApplicantDetails} />
            <HomeLoanLAPSalariedEligiblityDetails others={OthersDetails} />
          </>
        ) : others.productID === "12300003" &&
          (others.employeeCode === "01" ||
            others.employeeCode === "02" ||
            others.employeeCode === "03") ? (
          <>
            <ApplicantDetails
              applicant={applicantDetails}
              others={OthersDetails}
              loanAmount={loanAmount}
            />
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
