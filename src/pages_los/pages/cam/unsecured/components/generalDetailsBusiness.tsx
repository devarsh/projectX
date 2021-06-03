import {
  Default,
  DateFormat,
  Address,
  Amount,
} from "pages_los/pages/cam/components";
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
        <tr>
          <th colSpan={2}>Name of the Unit</th>
          <td colSpan={7}>{<Default value={general?.entityName ?? ""} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Constitution of Business</th>
          <td colSpan={7}>{<Default value={general?.entityType ?? ""} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Credit Score</th>
          <td colSpan={7}>{<Default value={general?.creditScore ?? ""} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Ownership of Factory / Business Premises</th>
          <td colSpan={7}>
            {<Default value={general?.ownershipType ?? ""} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Date of incorporation</th>
          <td colSpan={7}>
            {<DateFormat value={general?.incorporationDate ?? ""} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Nature of Existing Business</th>
          <td colSpan={7}>
            {<Default value={general?.businessNature ?? ""} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Existing Type of Industry</th>
          <td colSpan={7}>
            {<Default value={general?.typeOfIndustry ?? ""} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Proposed business</th>
          <td colSpan={7}>
            {<Default value={general?.businessProposed ?? ""} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>External credit rating</th>
          <td colSpan={7}>{<Default value={general?.rankExternal ?? ""} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>MSME</th>
          <td colSpan={7}>{<Default value={general?.businessSize ?? ""} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>PAN No</th>
          <td colSpan={7}>{<Default value={general?.panNumber ?? ""} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Udhyog Aadhar No</th>
          <td colSpan={7}>{<Default value={general?.udhyogNumber ?? ""} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>CMR Ranking</th>
          <td colSpan={7}>{<Default value={general?.crmRank ?? ""} />}</td>
        </tr>
        {/* <tr>
          <th colSpan={2}>Purpose of loan</th>
          <td colSpan={7}>{<Default value={general.purposeLoan} />}</td>
        </tr> */}
        <tr>
          <th colSpan={2}>Turnover in current financial year</th>
          <td colSpan={7}>
            {
              //@ts-ignore
              <Amount value={general?.turnOverAmount ?? ""} />
            }
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Last 12 Months average Bank Balance</th>
          <td colSpan={7}>
            {
              //@ts-ignore
              <Amount value={general?.averageBankBal ?? ""} />
            }
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Average Utilisation of Working Capital Limits</th>
          <td colSpan={7}>
            {
              //@ts-ignore
              <Amount value={general?.limitBal ?? ""} />
            }
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Credit Summation in Bank in Last 12 months</th>
          <td colSpan={7}>
            {<Default value={general?.chequeBounces ?? ""} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>
            Inward cheque bounces, if any and % of total Cheque bounce
          </th>
          <td colSpan={7}>
            {<Default value={general?.chequeBouncesPer ?? ""} />}
          </td>
        </tr>

        <Address value={address} />
        <PromoterDetails promoter={promoter} />
      </>
    );
  }
  return null;
};
