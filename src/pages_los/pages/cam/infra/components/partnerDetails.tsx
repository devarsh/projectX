import { NomineeDetails } from "./nomineeDetails";

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
        <th colSpan={2}>Name</th>
        <th colSpan={3}>Nominee</th>
        <th colSpan={1}>Share%</th>
      </tr>
      {promoter.map((promoterData, index) => {
        return (
          <>
            <tr key={index}>
              <td colSpan={2}></td>
              <td colSpan={1} style={{ textAlign: "center" }}>
                {index}
              </td>
              <td colSpan={2}>
                {promoterData.salutation} {promoterData.firstName}{" "}
                {promoterData.middleName} {promoterData.lastName}
              </td>
              <td colSpan={3}>
                <NomineeDetails nominee={promoterData.nomineeDetails} />
              </td>
              <td colSpan={1}> {promoterData.sharePercentage}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};
