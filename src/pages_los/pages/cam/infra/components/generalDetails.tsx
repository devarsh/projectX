import { AddressDetails } from "./addressDetails";
import { PromoterDetails } from "./partnerDetails";
import { BankDetails } from "./bankDetails";
import { BreifeAboutProject } from "./projectBrief";
import { ProjectParticularDetails } from "./projectParticular";
import { SiteAreaDetails } from "./siteAreaDetail";
import { Default, DateFormat, Amount } from "pages_los/pages/cam/components";

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
        {generalDetailsLabels?.map((res, index) => {
          return general[res?.name] ? (
            <tr key={index + 1}>
              <th colSpan={2}>{res?.label ?? "N/A"}</th>
              <td colSpan={7}>
                {res?.componentType === "amount" ? (
                  //@ts-ignore
                  <Amount value={general[res?.name]} />
                ) : res?.componentType === "dateFormat" ? (
                  <DateFormat value={general[res?.name]} />
                ) : (
                  <Default value={general[res?.name]} />
                )}
              </td>
            </tr>
          ) : null;
        }) ?? "No data found"}
        <AddressDetails address={address} />
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
        <th>Invalid data</th>
      </tr>
    </>
  );
};

const generalDetailsLabels = [
  { label: "Name of the Firm", name: "entityName", componentType: "default" },
  { label: "Project Name", name: "projectName", componentType: "default" },
  { label: "Constitution", name: "constitution", componentType: "default" },
  {
    label: "Date of incorporation",
    name: "incorporationDate",
    componentType: "dateFormat",
  },
  { label: "RERA Received", name: "reraReceived", componentType: "default" },
  { label: "RERA No.", name: "reraNo", componentType: "default" },
  {
    label: "Project Start Date",
    name: "projectStartDate",
    componentType: "dateFormat",
  },
  {
    label: "Project End Date",
    name: "projectEndDate",
    componentType: "dateFormat",
  },
  {
    label: "Type of the project",
    name: "projectType",
    componentType: "default",
  },
  {
    label: "External credit rating",
    name: "rankExternal",
    componentType: "default",
  },
  { label: "CMR Ranking", name: "crmRank", componentType: "default" },
  // { label: "RF Rating", name: "rfRank" },
  {
    label: "Construction Stage of the Project",
    name: "projectConstructionStage",
    componentType: "default",
  },
  {
    label: "Booking Status of the Project",
    name: "projectBookingStatus",
    componentType: "default",
  },
  {
    label: "Proposed Loan Amount",
    name: "proposedLoanAmount",
    componentType: "amount",
  },
  {
    label: "Brief Abount the Group",
    name: "briefAboutGroup",
    componentType: "default",
  },
  {
    label: "Brief About the promoters",
    name: "briefAboutPromoters",
    componentType: "default",
  },
];
