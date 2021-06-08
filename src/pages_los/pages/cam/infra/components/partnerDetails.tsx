import { NomineeDetails } from "./nomineeDetails";
import { Percentage, Default } from "pages_los/pages/cam/components";

export const PromoterDetails = ({ promoter }) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Partner Details"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Name" element="th" />
        <Default colspan={1} value="Experience" element="th" />
        <Default colspan={1} value="Credit Score" element="th" />
        <Default colspan={1} value="Obligations" element="th" />
        <Default colspan={2} value="Nominee" element="th" />
        <Default colspan={1} value="Share%" element="th" />
      </tr>
      {Array.isArray(promoter) &&
        promoter.map((promoterData, index) => {
          return (
            <>
              <tr key={index}>
                <Default colspan={1} value={index + 1} />
                <Default
                  colspan={2}
                  value={`${promoterData?.salutation} ${promoterData?.firstName} 
                ${promoterData?.middleName} ${promoterData?.lastName}`}
                />
                <Default colspan={1} value={promoterData?.experience} />
                <Default colspan={1} value={promoterData?.score} />
                <Default colspan={1} value={promoterData?.obligations} />
                <Default
                  colspan={2}
                  value={
                    <NomineeDetails nominee={promoterData.nomineeDetails} />
                  }
                />
                <Percentage colspan={1} value={promoterData.sharePercentage} />
              </tr>
            </>
          );
        })}
    </>
  );
};
