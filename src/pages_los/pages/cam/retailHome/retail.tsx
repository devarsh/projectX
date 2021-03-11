import {
  ApplicantDetails,
  CoApplicantDetails,
  OtherDetails,
} from "./components";

export const RetailHome = ({ data, others }) => {
  let { applicantDetails, coApplicantDetails, OthersDetails } = data;

  return (
    <table className="page">
      <tbody>
        <ApplicantDetails applicant={applicantDetails} />
        <CoApplicantDetails coApplicant={coApplicantDetails} />
        <OtherDetails others={OthersDetails} />
      </tbody>
    </table>
  );
};
