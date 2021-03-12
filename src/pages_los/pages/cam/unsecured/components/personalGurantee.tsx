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
              <td colSpan={2}>{personalData.guarantorName}</td>
              <td colSpan={2}>{personalData.panNumber}</td>
              <td colSpan={2}>{personalData.netWorth}</td>
            </tr>
          </>
        );
      }) ?? ""}
    </>
  );
};
