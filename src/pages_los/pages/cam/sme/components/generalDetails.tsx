import { AddressDetails } from "./addressDetails";
import { PromoterDetails } from "./promoterDetails";
import { NatureofFacilityPresentDetails } from "./facilityPresent";
import { NatureofFacilityProposedDetails } from "./facilityProposed";
import { Default, DateFormat, Amount } from "pages_los/pages/cam/components";

export const GeneralDetails = ({ general, promoter, address }) => {
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
        <NatureofFacilityPresentDetails
          natureOfFacilityPresent={general.presentNatureOfFacilityDetails}
        />
        <NatureofFacilityProposedDetails
          natureOfFacilityProposed={general.proposedNatureOfFacilityDetails}
        />
      </>
    );
  }
  return null;
};

const generalDetailsLabels = [
  {
    label: "Name of the Unit",
    name: "entityName",
    componentType: "default",
  },
  {
    label: "Constitution of Business",
    name: "entityType",
    componentType: "default",
  },
  {
    label: "Ownership of Factory / Business Premises",
    name: "ownershipType",
    componentType: "default",
  },
  {
    label: "Date of incorporation:",
    name: "inceptionDate",
    componentType: "dateFormat",
  },
  {
    label: "Existing Type of Industry:",
    name: "typeOfIndustry",
    componentType: "default",
  },
  {
    label: "Nature of Existing Business:",
    name: "businessNature",
    componentType: "default",
  },
  {
    label: "Proposed business:",
    name: "businessProposed",
    componentType: "default",
  },
  {
    label: "External credit rating:",
    name: "rankExternal",
    componentType: "default",
  },
  {
    label: "MSME",
    name: "businessSize",
    componentType: "default",
  },
  { label: "PAN No:", name: "panNumber", componentType: "default" },
  {
    label: "Udhyam No:",
    name: "udhyogNumber",
    componentType: "default",
  },
  {
    label: "CMR Ranking :",
    name: "crmRank",
    componentType: "default",
  },
  {
    label: "Name of Promoters / Directors",
    name: "Null",
    componentType: "default",
  },
  { label: "Purpose of loan:", name: "purposeLoan", componentType: "default" },
  {
    label: "Turnover in current financial year",
    name: "turnOverAmount",
    componentType: "default",
  },
  {
    label:
      "Last 12 Months average Bank Balance & Average Utilisation  of Working Capital Limits",
    name: "averageBankBal",
    componentType: "default",
  },
  {
    label: "Credit Summation in Bank in Last 12 months",
    name: "chequeBounces",
    componentType: "default",
  },
  {
    label: "Inward cheque bounces, if any and % of total Cheque bounce",
    name: "chequeBouncesPer",
    componentType: "default",
  },
];
