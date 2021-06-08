import { Default, Amount } from "pages_los/pages/cam/components";
export const PersonalGuarantee = ({ personal }) => {
  return (
    <>
      <br />
      <tr>
        <Default
          colspan={9}
          value="PERSONAL GUARANTEE"
          className="form-heading"
          element="th"
          align="center"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={3} value="Name of Guarantor" element="th" />
        <Default colspan={2} value="PAN No" element="th" />
        <Default colspan={3} value="Net Worth" element="th" align="right" />
      </tr>
      {(Array.isArray(personal) &&
        personal?.map((personalData, index) => {
          return (
            <>
              <tr>
                <Default colspan={1} value={index + 1} />
                <Default colspan={3} value={personalData?.guarantorName} />
                <Default colspan={2} value={personalData?.panNumber} />
                <Amount colspan={3} value={personalData?.netWorth} />
              </tr>
            </>
          );
        })) ??
        ""}
    </>
  );
};
