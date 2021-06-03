import { Default, Amount } from "pages_los/pages/cam/components";
export const PersonalGuarantee = ({ personal }) => {
  if (!Array.isArray(personal) || personal.length <= 0) {
    return null;
  }
  return (
    <>
      <br />
      <tr>
        <th colSpan={9} className="form-sub-heading">
          PERSONAL GUARANTE
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Name of Guarantor</th>
        <th colSpan={2}>PAN No.</th>
        <th colSpan={2}>Net Worth</th>
      </tr>
      {personal?.map((personalData) => {
        return (
          <>
            <tr>
              <td colSpan={2}>
                {<Default value={personalData?.guarantorName ?? ""} />}
              </td>
              <td colSpan={2}>
                {<Default value={personalData?.panNumber ?? ""} />}
              </td>
              <td colSpan={2}>
                {
                  //@ts-ignore
                  <Amount value={personalData?.netWorth ?? ""} />
                }
              </td>
            </tr>
          </>
        );
      }) ?? ""}
    </>
  );
};
