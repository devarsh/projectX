import { Default, Amount, Percentage } from "pages_los/pages/cam/components";
export const NatureofFacilityProposedDetails = ({
  natureOfFacilityProposed,
}) => {
  if (
    !Array.isArray(natureOfFacilityProposed) ||
    natureOfFacilityProposed.length <= 0
  ) {
    return (
      <>
        <tr>
          <Default
            colspan={9}
            className="form-sub-heading"
            value="Nature of Facility Proposed"
            align="center"
            element="th"
          />
        </tr>
        <tr>
          <Default colspan={9} value="Not Available" align="center" />
        </tr>
      </>
    );
  }
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          value="Nature of Facility Proposed"
          align="center"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Nature of Facility" element="th" />
        <Default colspan={2} value="New / Takeover" element="th" />
        <Default colspan={2} value="equested ROI" element="th" align="right" />
        <Default colspan={2} value="Amount" element="th" align="right" />
      </tr>
      {natureOfFacilityProposed.map((proposedDetails, index) => {
        return (
          <>
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={2} value={proposedDetails?.facilityType} />
              <Default colspan={2} value={proposedDetails?.newTakeover} />
              <Percentage colspan={2} value={proposedDetails?.rateOfInterest} />
              <Amount colspan={2} value={proposedDetails?.amount} />
            </tr>
          </>
        );
      })}
    </>
  );
};
