import { AddressDetails } from "./addressDetails";
import { PromoterDetails } from "./promoterDetail";

export const GeneralDetailsBusiness = ({ general, promoter, address }) => {
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
  { label: "Name of the Unit", name: "entityName" },
  { label: "Constitution of Business", name: "constitution" },
  { label: "Ownersip of Factory / Business Premises", name: "constitution" },
  { label: "Date of incorporation", name: "incorporationDate" },
  { label: "Nature of Existing Business", name: "businessNature" },
  { label: "Existing Type of Industry", name: "typeOfIndustry" },
  { label: "Proposed business", name: "businessProposed" },
  { label: "External credit rating", name: "rankExternal" },
  { label: "MSME", name: "projectType" },
  { label: "PAN No", name: "panNumber" },
  { label: "CMR Ranking", name: "crmRank" },
  { label: "RF Rating", name: "rfRank" },
  {
    label: "Purpose of loan",
    name: "purposeLoan",
  },
  { label: "Udhyog Aadhar No", name: "udhyogNumber" },
];
