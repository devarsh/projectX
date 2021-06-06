import { IncomeDetails } from "./incomeDetails";
import {
  Default,
  Percentage,
  Amount,
  DateFormat,
  Age,
} from "pages_los/pages/cam/components";

export const ManagementDetails = ({ management }) => {
  if (!Array.isArray(management) || management.length <= 0) {
    return (
      <>
        <tr>
          <Default
            colspan={9}
            className="form-heading"
            value="Management Details"
            align="center"
            element="th"
          />
        </tr>
        <tr>
          <Default colspan={9} value="Not Available" align="center" />
        </tr>
      </>
    );
  }
  return (
    <>
      <br />
      <tr>
        <Default
          colspan={9}
          className="form-heading"
          value="Management Details"
          align="center"
          element="th"
        />
      </tr>
      {management.map((data: any, index) => {
        return (
          <>
            <tr>
              <Default
                colspan={2}
                value="Name of the Partner/Director"
                element="th"
              />
              <td colSpan={7}>
                {data?.salutation ?? ""} {data?.firstName ?? ""}{" "}
                {data?.middleName ?? ""} {data?.lastName ?? ""}
              </td>
            </tr>
            <tr>
              <Default colspan={2} value="Birth Date" element="th" />
              <DateFormat colspan={7} value={data?.dob} />
            </tr>
            <tr>
              <Default colspan={2} value="Age" element="th" />
              <Age colspan={7} value={data?.dob} />
            </tr>
            <tr>
              <Default colspan={2} value="PAN No" element="th" />
              <Default colspan={7} value={data?.panNumber} />
            </tr>
            <tr>
              <Default colspan={2} value="DIN / LLPIN No" element="th" />
              <Default colspan={7} value={data?.dinLlPinNo} />
            </tr>
            <tr>
              <Default colspan={2} value="Credit Score" element="th" />
              <Default colspan={7} value={data?.creditScore} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Educational Qualification"
                element="th"
              />
              <Default colspan={7} value={data?.educationQalification} />
            </tr>
            <tr>
              <Default colspan={2} value="Experience" element="th" />
              <Default colspan={7} value={data?.experience} />
            </tr>
            <tr>
              <Default colspan={2} value="Associate Companies" element="th" />
              <Default colspan={7} value={data?.associatedCompany} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Profit Sharing / Shareholding %"
                element="th"
              />
              <Percentage colspan={7} value={data?.profitSharing} />
            </tr>
            <tr>
              <Default colspan={2} value="Networth" element="th" />
              <Amount colspan={7} value={data?.netWorth} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Resposnibilities Handled in the Comapany"
                element="th"
              />
              <Default colspan={7} value={data?.responsibility} />
            </tr>
            <IncomeDetails income={data?.incomeDetails ?? ""} />

            <br />
            <br />
          </>
        );
      })}
    </>
  );
};
