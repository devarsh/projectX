import {
  Default,
  DateFormat,
  Amount,
  Percentage,
} from "pages_los/pages/cam/components";

export const NatureofFacilityPresentDetails = ({ natureOfFacilityPresent }) => {
  if (
    !Array.isArray(natureOfFacilityPresent) ||
    natureOfFacilityPresent.length <= 0
  ) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Present
        </th>
      </tr>
      <tr>
        <th style={{ textAlign: "center" }}>Sr.No</th>
        <th colSpan={2}>Nature of Facility</th>
        <th colSpan={2}>Name of Bank</th>
        <th colSpan={1}>Outstanding as on</th>
        <th colSpan={1}>Outstanding Amount As On</th>
        <th colSpan={2}>Rate of Interest</th>
      </tr>
      {natureOfFacilityPresent.map((presentDetails, index) => {
        return (
          <>
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td colSpan={2}>
                {<Default value={presentDetails.facilityName} />}
              </td>
              <td colSpan={2}>{<Default value={presentDetails.bankName} />}</td>
              <td colSpan={1}>
                {<DateFormat value={presentDetails.outstandingOn} />}
              </td>
              <td colSpan={1}>
                {
                  //@ts-ignore
                  <Amount value={presentDetails.outstandingBalance} />
                }
              </td>
              <td colSpan={2}>
                {
                  //@ts-ignore
                  <Percentage value={presentDetails.rateOfInterest} />
                }
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
