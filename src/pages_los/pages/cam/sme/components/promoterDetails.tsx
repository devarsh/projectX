import { Default } from "pages_los/pages/cam/components";
export const PromoterDetails = ({ promoter }) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Promoter Details"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Salutation" element="th" />
        <Default colspan={2} value="First Name" element="th" />
        <Default colspan={2} value="Middle Name" element="th" />
        <Default colspan={2} value="Last Name" element="th" />
      </tr>
      {Array.isArray(promoter) &&
        promoter.map((promoterData, index) => {
          return (
            <>
              <tr key={index}>
                <Default colspan={1} value={index + 1} />
                <Default colspan={2} value={promoterData?.salutation} />
                <Default colspan={2} value={promoterData?.firstName} />
                <Default colspan={2} value={promoterData?.middleName} />
                <Default colspan={2} value={promoterData?.lastName} />
              </tr>
            </>
          );
        })}
    </>
  );
};
