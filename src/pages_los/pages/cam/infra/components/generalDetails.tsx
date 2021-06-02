import { PromoterDetails } from "./partnerDetails";
import { BreifeAboutProject } from "./projectBrief";
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
          <th className="form-heading" colSpan={9}>
            General Details
          </th>
        </tr>
        <tr>
          <th colSpan={2}>Name of the Firm</th>
          <td colSpan={7}>{<Default value={general.entityName} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Project Name</th>
          <td colSpan={7}>{<Default value={general.projectName} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Constitution</th>
          <td colSpan={7}>{<Default value={general.constitution} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Date of incorporation</th>
          <td colSpan={7}>
            {<DateFormat value={general.incorporationDate} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>RERA Received</th>
          <td colSpan={7}>{<Default value={general.reraReceived} />}</td>
        </tr>
        {general.reraReceived === "Yes" ? (
          <tr>
            <th colSpan={2}>RERA No</th>
            <td colSpan={7}>{<Default value={general.reraNo} />}</td>
          </tr>
        ) : null}
        <tr>
          <th colSpan={2}>Project Start Date</th>
          <td colSpan={7}>{<DateFormat value={general.projectStartDate} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Project End Date</th>
          <td colSpan={7}>{<DateFormat value={general.projectEndDate} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Type of the project</th>
          <td colSpan={7}>{<Default value={general.projectType} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>External credit rating</th>
          <td colSpan={7}>{<Default value={general.rankExternal} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>CMR Ranking</th>
          <td colSpan={7}>{<Default value={general.crmRank} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Construction Stage of the Project</th>
          <td colSpan={7}>
            {<Default value={general.projectConstructionStage} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Booking Status of the Project</th>
          <td colSpan={7}>
            {<Default value={general.projectBookingStatus} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Proposed Loan Amount</th>
          <td colSpan={7}>
            {
              //@ts-ignore
              <Amount value={general.proposedLoanAmount} />
            }
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Brief Abount the Group</th>
          <td colSpan={7}>{<Default value={general.briefAboutGroup} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Brief About the promoters</th>
          <td colSpan={7}>{<Default value={general.briefAboutPromoters} />}</td>
        </tr>

        <Address value={address} />
        <PromoterDetails promoter={promoter} />
        {/* <BankDetails bank={bank} /> */}
        <BreifeAboutProject project={project} />
        <ProjectParticularDetails projectParticular={projectParticular} />
        <SiteAreaDetails siteArea={siteArea} />
      </>
    );
  }
  return (
    <>
      <tr>
        <th className="form-heading" colSpan={9}>
          General Details
        </th>
      </tr>
      <tr>
        <th>No Data Found</th>
      </tr>
    </>
  );
};
