import { Default } from "pages_los/pages/cam/components";
export const PromoterDetails = ({ promoter }) => {
  if (!Array.isArray(promoter) || promoter.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Promoter Details
        </th>
      </tr>
      <tr>
        <th style={{ textAlign: "center" }}>Sr.No</th>
        <th colSpan={2}>Salutation</th>
        <th colSpan={2}>First Name</th>
        <th colSpan={2}>Middle Name</th>
        <th colSpan={2}>Last Name</th>
      </tr>
      {promoter.map((promoterData, index) => {
        return (
          <>
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td colSpan={2}>{<Default value={promoterData.salutation} />}</td>
              <td colSpan={2}>{<Default value={promoterData.firstName} />}</td>
              <td colSpan={2}>{<Default value={promoterData.middleName} />}</td>
              <td colSpan={2}>{<Default value={promoterData.lastName} />}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};
