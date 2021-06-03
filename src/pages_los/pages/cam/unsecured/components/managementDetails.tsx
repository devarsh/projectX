import { IncomeSummaryDetails } from "./incomeSummary";
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
      <tr>
        <td>Invalid data</td>
      </tr>
    );
  }
  return (
    <>
      <br />
      <tr className="page-break">
        <th></th>
      </tr>
      <tr>
        <th colSpan={9} className="form-heading">
          Management Details
        </th>
      </tr>
      {management.map((data: any, index) => {
        return (
          <>
            <tr key={index}>
              <th colSpan={2}>Name of the Partner/Director</th>
              <td colSpan={7}>
                {data.salutation} {data?.firstName} {data?.middleName}{" "}
                {data?.lastName}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Birth Date</th>
              <td colSpan={7}>{<DateFormat value={data.dob ?? ""} />}</td>
            </tr>
            <tr>
              <th colSpan={2}>Age</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Age value={data.dob ?? ""} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>PAN No</th>
              <td colSpan={7}>{<Default value={data?.panNumber ?? ""} />}</td>
            </tr>
            <tr>
              <th colSpan={2}>DIN / LLPIN No</th>
              <td colSpan={7}>{<Default value={data?.dinLlPinNo ?? ""} />}</td>
            </tr>
            <tr>
              <th colSpan={2}>CIBIL Score</th>
              <td colSpan={7}>{data?.creditScore ?? ""}</td>
            </tr>
            <tr>
              <th colSpan={2}>Educational Qualification</th>
              <td colSpan={7}>
                {<Default value={data?.educationQalification ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Experience</th>
              <td colSpan={7}>{<Default value={data?.experience ?? ""} />}</td>
            </tr>
            <tr>
              <th colSpan={2}>Associate Companies</th>
              <td colSpan={7}>
                {<Default value={data?.associatedCompany ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Profit Sharing / Shareholding %</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Percentage value={data?.profitSharing ?? ""} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Networth</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={data?.netWorth ?? ""} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Resposnibilities Handled in the Comapany</th>
              <td colSpan={7}>
                {<Default value={data?.responsibility ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Any Other Source of Income</th>
              <td colSpan={7}>
                {<Default value={data?.sourceIncomeOther ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Average Banking Balance</th>
              <td colSpan={7}>
                {
                  //@ts-ignore
                  <Amount value={data?.averageBankBal ?? ""} />
                }
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Name of existing bankers</th>
              <td colSpan={7}>
                {<Default value={data?.existingBankersName ?? ""} />}
              </td>
            </tr>
            <tr>
              <th colSpan={2}>Moratorium taken or not</th>
              <td colSpan={7}>
                {<Default value={data?.maratoriumTaken ?? ""} />}
              </td>
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
