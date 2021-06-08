import { PromoterDetails } from "./promoterDetails";
import { NatureofFacilityPresentDetails } from "./facilityPresent";
import { NatureofFacilityProposedDetails } from "./facilityProposed";
import {
  Default,
  DateFormat,
  Amount,
  Address,
} from "pages_los/pages/cam/components";

export const GeneralDetails = ({
  general = {},
  promoter = [],
  address = [],
}: any) => {
  if (typeof general === "object") {
    return (
      <>
        <tr>
          <Default
            colspan={9}
            className="form-heading"
            value=" General Details"
            align="center"
            element="th"
          />
        </tr>
        <tr>
          <Default colspan={2} value="Name of the Unit" element="th" />
          <Default colspan={7} value={general?.entityName} />
        </tr>
        <tr>
          <Default colspan={2} value="Constitution of Business" element="th" />
          <Default colspan={7} value={general?.entityType} />
        </tr>
        <tr>
          <Default colspan={2} value="Credit Score" element="th" />
          <Default colspan={7} value={general?.creditScore} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Ownership of Factory / Business Premises"
            element="th"
          />
          <Default colspan={7} value={general?.ownershipType} />
        </tr>
        <tr>
          <Default colspan={2} value="Date of incorporation" element="th" />
          <DateFormat colspan={7} value={general?.inceptionDate} />
        </tr>
        <tr>
          <Default colspan={2} value="Existing Type of Industry" element="th" />
          <Default colspan={7} value={general?.typeOfIndustry} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Nature of Existing Business"
            element="th"
          />
          <Default colspan={7} value={general?.businessNature} />
        </tr>
        <tr>
          <Default colspan={2} value="Proposed business" element="th" />
          <Default colspan={7} value={general?.businessProposed} />
        </tr>
        <tr>
          <Default colspan={2} value="External credit rating" element="th" />
          <Default colspan={7} value={general?.rankExternal} />
        </tr>
        <tr>
          <Default colspan={2} value="MSME" element="th" />
          <Default colspan={7} value={general?.businessSize} />
        </tr>
        <tr>
          <Default colspan={2} value="PAN No" element="th" />
          <Default colspan={7} value={general?.panNumber} />
        </tr>
        <tr>
          <Default colspan={2} value="Udhyam No" element="th" />
          <Default colspan={7} value={general?.udhyogNumber} />
        </tr>
        <tr>
          <Default colspan={2} value="CMR Ranking" element="th" />
          <Default colspan={7} value={general?.crmRank} />
        </tr>
        {/* <tr>
          <th colSpan={2}>Name of Promoters / Directors</th>
          <td colSpan={7}>{<Default value={"Not Specified"} />}</td>
        </tr>*/}
        <tr>
          <Default colspan={2} value="Purpose of loan" element="th" />
          <Default colspan={7} value={general?.purposeLoan} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Turnover in current financial year"
            element="th"
          />
          <Amount colspan={7} value={general?.turnOverAmount} align="left" />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Last 12 Months average Bank Balance"
            element="th"
          />
          <Amount colspan={7} value={general?.averageBankBal} align="left" />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Average Utilisation of Working Capital Limits"
            element="th"
          />
          <Amount colspan={7} value={general?.limitBal} align="left" />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Credit Summation in Bank in Last 12 months"
            element="th"
          />
          <Default colspan={7} value={general?.chequeBounces} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Inward cheque bounces, if any and % of total Cheque bounce"
            element="th"
          />
          <Default colspan={7} value={general?.chequeBouncesPer} />
        </tr>

        <Address value={address} />
        <PromoterDetails promoter={promoter} />
        <NatureofFacilityPresentDetails
          natureOfFacilityPresent={
            general?.presentNatureOfFacilityDetails ?? ""
          }
        />
        <NatureofFacilityProposedDetails
          natureOfFacilityProposed={
            general?.proposedNatureOfFacilityDetails ?? ""
          }
        />
      </>
    );
  }
  return null;
};
