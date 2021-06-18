import { BankDetails } from "./bankingArrangements";
import { IncomeSummaryDetails } from "./incomeSummary";
import {
  Age,
  Address,
  Default,
  Amount,
  DateFormat,
} from "pages_los/pages/cam/components";

export const GeneralDetailsPersonal = ({ general }) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          value="General Details"
          className="form-heading"
          element="th"
          align="center"
        />
      </tr>
      {Array.isArray(general) &&
        general.map((personalDetail) => {
          return (
            <>
              <tr>
                <Default colspan={2} value="Name of the Person" element="th" />
                <Default
                  colspan={7}
                  value={`${personalDetail.salutation}${" "}${
                    personalDetail?.firstName
                  }
                ${" "}${personalDetail?.middleName}${" "}${
                    personalDetail?.lastName
                  }`}
                />
              </tr>
              <tr>
                <Default colspan={2} value="Birth Date" element="th" />
                <DateFormat colspan={7} value={personalDetail?.dob} />
              </tr>
              <tr>
                <Default colspan={2} value="Age" element="th" />
                <Age colspan={7} value={personalDetail?.dob} />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Educational Qualification"
                  element="th"
                />
                <Default
                  colspan={7}
                  value={personalDetail?.educationQalification}
                />
              </tr>
              <tr>
                <Default colspan={2} value="Residential Type" element="th" />
                <Default colspan={7} value={personalDetail?.residentialType} />
              </tr>
              <tr>
                <Default colspan={2} value="PAN No" element="th" />
                <Default colspan={7} value={personalDetail?.panNumber} />
              </tr>
              <tr>
                <Default colspan={2} value="Employment Type" element="th" />
                <Default colspan={7} value="" />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Name of the Employer"
                  element="th"
                />
                <Default colspan={7} value="" />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Total Work Experience"
                  element="th"
                />
                <Default colspan={7} value={personalDetail?.experience} />
              </tr>
              <tr>
                <Default colspan={2} value="Net Monthly Salary" element="th" />
                <Amount colspan={7} value="" />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Any other Source of Income"
                  element="th"
                />
                <Default
                  colspan={7}
                  value={personalDetail?.sourceIncomeOther}
                />
              </tr>
              <tr>
                <Default colspan={2} value="Credit Score" element="th" />
                <Default colspan={7} value={personalDetail?.creditScore} />
              </tr>
              <tr>
                <Default colspan={2} value="CMR Ranking" element="th" />
                <Default colspan={7} value={personalDetail?.crmRank} />
              </tr>
              <tr>
                <Default colspan={2} value="Purpose of Loan" element="th" />
                <Default colspan={7} value={personalDetail?.purposeLoan} />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Moratorium taken or not"
                  element="th"
                />
                <Default colspan={7} value={personalDetail?.maratoriumTaken} />
              </tr>
              <tr>
                <Default
                  colspan={2}
                  value="Last 12 Months average Bank Balance"
                  element="th"
                />
                <Amount colspan={7} value={personalDetail?.averageBankBal} />
              </tr>

              <Address value={personalDetail?.contactDetails ?? ""} />
              <BankDetails bank={personalDetail?.bankDetails ?? ""} />
              <IncomeSummaryDetails
                income={personalDetail?.incomeDetails ?? ""}
              />
            </>
          );
        })}
    </>
  );
};
