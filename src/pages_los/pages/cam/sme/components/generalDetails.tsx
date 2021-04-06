import { AddressDetails } from "./addressDetails";
import { PromoterDetails } from "./promoterDetails";

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
  { label: "Registered Address:", name: "1111" },
  { label: "Works Address:", name: "Null" },
  { label: "Ownership of Factory / Business Premises", name: "25" },
  { label: "Date of incorporation:", name: "inceptionDate" },
  { label: "Existing Type of Industry:", name: "typeOfIndustry" },
  { label: "Nature of Existing Business:", name: "businessNature" },
  {
    label: "Proposed business:",
    name: "5%",
  },
  { label: "External credit rating:", name: "rankExternal" },
  {
    label: "MSME",
    name: "Null",
  },
  { label: "PAN No:", name: "panNumber" },
  {
    label: "Udhyam No:",
    name: "udhyogNumber",
  },
  {
    label: "CMR Ranking :",
    name: "crmRank",
  },
  {
    label: "RF Rating :",
    name: "rfRank",
  },
  {
    label: "Name of Promoters / Directors",
    name: "Null",
  },
  { label: "Purpose of loan:", name: "purposeLoan" },
  { label: "Turnover in current financial year", name: "turnOverAmount" },
  {
    label:
      "Last 12 Months average Bank Balance & Average Utilisation  of Working Capital Limits",
    name: "averageBankBal",
  },
  {
    label: "Credit Summation in Bank in Last 12 months",
    name: "chequeBounces",
  },
  {
    label: "Inward cheque bounces, if any and % of total Cheque bounce",
    name: "chequeBouncesPer",
  },
];
