import {
  ApplicantDetails,
  CoApplicantDetails,
  OtherDetails,
  OtherLRDDetails,
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
        <ApplicantDetails
          applicant={applicantDetails}
          others={OthersDetails}
          loanAmount={loanAmount}
        />
        <CoApplicantDetails coApplicant={coApplicantDetails} />
        {others.productID === "12300003" ? (
          <OtherLRDDetails others={OthersDetails} />
        ) : (
          <OtherDetails others={OthersDetails} />
        )}
      </tbody>
    </table>
  );
};
