import { Default, Amount, Percentage } from "pages_los/pages/cam/components";
export const NatureofFacilityProposedDetails = ({
  natureOfFacilityProposed,
}) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          value="Nature of Facility Proposed"
          className="form-sub-heading"
          element="th"
          align="center"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Nature of Facility" element="th" />
        <Default colspan={2} value="New / Takeover" element="th" />
        <Default
          colspan={2}
          value="Requested ROI"
          element="th"
          align="center"
        />
        <Default colspan={2} value="Amount" element="th" align="center" />
      </tr>
      {Array.isArray(natureOfFacilityProposed) &&
        natureOfFacilityProposed.map((proposedDetails, index) => {
          return (
            <>
              <tr key={index}>
                <Default colspan={1} value={index + 1} />
                <Default colspan={2} value={proposedDetails?.facilityType} />
                <Default colspan={2} value={proposedDetails?.newTakeover} />
                <Percentage
                  colspan={2}
                  value={proposedDetails?.rateOfInterest}
                />
                <Amount colspan={2} value={proposedDetails?.amount} />
              </tr>
            </>
          );
        })}
    </>
  );
};
