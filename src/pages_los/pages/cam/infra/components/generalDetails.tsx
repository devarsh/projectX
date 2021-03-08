import { AddressDetails } from "./addressDetails";
import { PromoterDetails } from "./promoterDetails";
import { BankDetails } from "./bankDetails";
export const GeneralDetails = ({ general, promoter, address, bank }) => {
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
            <tr key={index}>
              <th colSpan={2}>{res?.label ?? "N/A"}</th>
              <td colSpan={7}>{general[res?.name] ?? "N/A"}</td>
            </tr>
          ) : null;
        }) ?? "No data found"}
        <AddressDetails address={address} />;
        <PromoterDetails promoter={promoter} />
        <BankDetails bank={bank} />
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
  { label: "Name of the Firm", name: "entityName" },
  { label: "Project Name", name: "projectName" },
  { label: "Constitution", name: "constitution" },
  { label: "Date of incorporation", name: "incorporationDate" },
  { label: "RERA Received", name: "reraReceived" },
  { label: "RERA No.", name: "reraNo" },
  { label: "Project Start Date", name: "projectStartDate" },
  { label: "Project End Date", name: "projectEndDate" },
  { label: "Type of the project", name: "projectType" },
  { label: "External credit rating", name: "rankExternal" },
  { label: "CMR Ranking", name: "crmRank" },
  { label: "RF Rating", name: "rfRank" },
  {
    label: "Construction Stage of the Project",
    name: "projectConstructionStage",
  },
  {
    label: "Booking Status of the Project",
    name: "projectBookingStatus",
  },
  {
    label: "Proposed Loan Amount",
    name: "proposedLoanAmount",
  },
  {
    label: "Brief Abount the Group",
    name: "briefAboutGroup",
  },
  { label: "Brief About the promoters", name: "briefAboutPromoters" },
];
