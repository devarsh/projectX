import {
  ApplicantDetails,
  CoApplicantDetails,
  OtherDetails,
  OtherLRDDetails,
} from "./components";

export const RetailHome = ({ data, others }) => {
  let { applicantDetails, coApplicantDetails, OthersDetails } = data;

  return (
    <table className="page">
      <tbody>
        <ApplicantDetails applicant={applicantDetails} others={OthersDetails} />
        <CoApplicantDetails coApplicant={coApplicantDetails} />
        <OtherDetails others={OthersDetails} />
        {others.productID === "12300003" ? (
          <OtherLRDDetails others={OthersDetails} />
        ) : null}
      </tbody>
    </table>
  );
};
