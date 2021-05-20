import { NomineeDetails } from "./nomineeDetails";
import { Percentage } from "pages_los/pages/cam/components";

export const PromoterDetails = ({ promoter }) => {
  if (!Array.isArray(promoter) || promoter.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Partner Details
        </th>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <th colSpan={1} style={{ textAlign: "center" }}>
          Sr.No
        </th>
        <th colSpan={1}>Name</th>
        <th colSpan={1}>Experience</th>
        <th colSpan={1}>Credit Score</th>
        <th colSpan={1}>Obligations</th>
        <th colSpan={1}>Nominee</th>
        <th colSpan={1}>Share%</th>
      </tr>
      {promoter.map((promoterData, index) => {
        return (
          <>
            <tr key={index + 1}>
              <td colSpan={2}></td>
              <td colSpan={1} style={{ textAlign: "center" }}>
                {index}
              </td>
              <td colSpan={1}>
                {promoterData.salutation} {promoterData.firstName}{" "}
                {promoterData.middleName} {promoterData.lastName}
              </td>
              <td colSpan={1}>{promoterData.experience}</td>
              <td colSpan={1}>{promoterData.score}</td>
              <td colSpan={1}>{promoterData.obligations}</td>
              <td colSpan={1}>
                <NomineeDetails nominee={promoterData.nomineeDetails} />
              </td>
              <td colSpan={1}>
                {
                  //@ts-ignore
                  <Percentage value={promoterData.sharePercentage} />
                }
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
