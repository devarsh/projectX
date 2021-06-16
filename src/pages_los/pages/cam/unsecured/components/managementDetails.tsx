import { IncomeSummaryDetails } from "./incomeSummary";
import {
  Default,
  Amount,
  DateFormat,
  Age,
} from "pages_los/pages/cam/components";

export const ManagementDetails = ({ management }) => {
  return (
    <>
      <br />
      <tr>
        <Default
          colspan={9}
          value="Management Details"
          className="form-heading"
          element="th"
          align="center"
        />
      </tr>
      {Array.isArray(management) &&
        management.map((data: any, index) => {
          return (
            <>
              <tr key={index}>
                <Default
                  colspan={2}
                  value="Name of the Partner/Director"
                  element="th"
                />
                <Default
                  colspan={7}
                  value={`${data.salutation}${" "}${data?.firstName}
                ${" "}${data?.middleName}${" "}${data?.lastName}`}
                />
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
                <Default colspan={2} value="CIBIL Score" element="th" />
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
                <Default colspan={7} value={data?.profitSharing} />
              </tr>
              <tr>
                <Default colspan={2} value="Networth" element="th" />
                <Default colspan={7} value={data?.netWorth} />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Resposnibilities Handled in the Comapany"
                  element="th"
                />
                <Default colspan={7} value={data?.responsibility} />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Any Other Source of Income"
                  element="th"
                />
                <Default colspan={7} value={data?.sourceIncomeOther} />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Average Banking Balance"
                  element="th"
                />
                <Amount colspan={7} value={data?.averageBankBal} align="left" />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Name of existing bankers"
                  element="th"
                />
                <Default colspan={7} value={data?.existingBankersName} />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Moratorium taken or not"
                  element="th"
                />
                <Default colspan={7} value={data?.maratoriumTaken} />
              </tr>

              <IncomeSummaryDetails income={data?.incomeDetails ?? ""} />

              <br />
              <br />
            </>
          );
        })}
    </>
  );
};
