import { Default, Amount, Percentage } from "pages_los/pages/cam/components";
export const NatureofFacilityProposedDetails = ({
  natureOfFacilityProposed,
}) => {
  if (
    !Array.isArray(natureOfFacilityProposed) ||
    natureOfFacilityProposed.length <= 0
  ) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Proposed
        </th>
      </tr>
      <tr>
        <th style={{ textAlign: "center" }}>Sr.No</th>
        <th colSpan={2}>Nature of Facility</th>
        <th colSpan={2}>New / Takeover</th>
        <th colSpan={2}>Requested ROI</th>
        <th colSpan={2}>Amount</th>
      </tr>
      {natureOfFacilityProposed.map((proposedDetails, index) => {
        return (
          <>
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td colSpan={2}>
                {<Default value={proposedDetails?.facilityType ?? ""} />}
              </td>
              <td colSpan={2}>
                {<Default value={proposedDetails?.newTakeover ?? ""} />}
              </td>
              <td colSpan={2}>
                {
                  //@ts-ignore
                  <Percentage value={proposedDetails?.rateOfInterest ?? ""} />
                }
              </td>
              <td colSpan={1}>
                {
                  //@ts-ignore
                  <Amount value={proposedDetails?.amount ?? ""} />
                }
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
