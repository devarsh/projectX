import {
  dateFormatter,
  convertIntoPrcentage,
  convertIntoCurrency,
} from "../../utils";
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
              <td colSpan={2}>{presentDetails.facilityName}</td>
              <td colSpan={2}>{presentDetails.bankName}</td>
              <td colSpan={1}>
                {dateFormatter({ val: presentDetails.outstandingOn })}
              </td>
              <td colSpan={1}>
                {convertIntoCurrency({
                  amount: presentDetails.outstandingBalance,
                })}
              </td>
              <td colSpan={2}>
                {convertIntoPrcentage({
                  amount: presentDetails.rateOfInterest,
                })}
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};
