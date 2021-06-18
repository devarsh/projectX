import { PromoterDetails } from "./partnerDetails";
import { BriefAboutProject } from "./projectBrief";
import { ProjectParticularDetails } from "./projectParticular";
import { SiteAreaDetails } from "./siteAreaDetail";
import {
  Default,
  DateFormat,
  Amount,
  Address,
} from "pages_los/pages/cam/components";

export const GeneralDetails = ({
  general,
  promoter,
  address,
  project,
  projectParticular,
  siteArea,
}) => {
  if (typeof general === "object") {
    return (
      <>
        <tr>
          <Default
            colspan={9}
            className="form-heading"
            align="center"
            value="General Details"
            element="th"
          />
        </tr>
        <tr>
          <Default colspan={2} value="Name of the Firm" element="th" />
          <Default colspan={7} value={general?.entityName} />
        </tr>
        <tr>
          <Default colspan={2} value="Project Name" element="th" />
          <Default colspan={7} value={general?.projectName} />
        </tr>
        <tr>
          <Default colspan={2} value="Constitution" element="th" />
          <Default colspan={7} value={general?.constitution} />
        </tr>
        <tr>
          <Default colspan={2} value="Date of incorporation" element="th" />
          <DateFormat colspan={7} value={general?.incorporationDate} />
        </tr>
        <tr>
          <Default colspan={2} value="RERA Received" element="th" />
          <Default colspan={7} value={general?.reraReceived} />
        </tr>
        {general?.reraReceived === "Yes" ? (
          <tr>
            <Default colspan={2} value="RERA No" element="th" />
            <Default colspan={7} value={general?.reraNo} />
          </tr>
        ) : null}
        <tr>
          <Default colspan={2} value="Project Start Date" element="th" />
          <DateFormat colspan={7} value={general?.projectStartDate} />
        </tr>
        <tr>
          <Default colspan={2} value="Project End Date" element="th" />
          <DateFormat colspan={7} value={general?.projectEndDate} />
        </tr>
        <tr>
          <Default colspan={2} value="Type of Project" element="th" />
          <Default colspan={7} value={general?.projectType} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Construction Stage of the Project"
            element="th"
          />
          <Default colspan={7} value={general?.projectConstructionStage} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Booking Status of the Project"
            element="th"
          />
          <Default colspan={7} value={general?.projectBookingStatus} />
        </tr>
        <tr>
          <Default colspan={2} value="Proposed Loan Amount" element="th" />
          <Amount colspan={7} value={general.proposedLoanAmount} align="left" />
        </tr>
        <tr>
          <Default colspan={2} value="Brief About the Group" element="th" />
          <Default colspan={7} value={general?.briefAboutGroup} />
        </tr>
        <tr>
          <Default colspan={2} value="Brief About the Promoters" element="th" />
          <Default colspan={7} value={general?.briefAboutPromoters} />
        </tr>

        <Address value={address} />
        <PromoterDetails promoter={promoter} />
        {/* <BankDetails bank={bank} /> */}
        <BriefAboutProject project={project} />
        <ProjectParticularDetails projectParticular={projectParticular} />
        <SiteAreaDetails siteArea={siteArea} />
      </>
    );
  }
  return null;
};
