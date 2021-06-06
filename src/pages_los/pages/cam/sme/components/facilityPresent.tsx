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
    return (
      <>
        <tr>
          <Default
            colspan={9}
            className="form-sub-heading"
            value="Nature of Facility Present"
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
          align="center"
          element="th"
          value="Nature of Facility Present"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Nature of Facility" element="th" />
        <Default colspan={2} value="Name of Bank" element="th" />
        <Default colspan={1} value="Outstanding as on" element="th" />
        <Default
          colspan={2}
          value="Outstanding Amount As On"
          element="th"
          align="right"
        />
        <Default
          colspan={1}
          value="Rate of Interest"
          element="th"
          align="right"
        />
      </tr>
      {natureOfFacilityPresent.map((presentDetails, index) => {
        return (
          <>
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={2} value={presentDetails?.facilityType} />
              <Default colspan={2} value={presentDetails?.bankName} />
              <DateFormat colspan={1} value={presentDetails.outstandingOn} />
              <Amount colspan={2} value={presentDetails?.outstandingBalance} />
              <Percentage colspan={1} value={presentDetails?.rateOfInterest} />
            </tr>
          </>
        );
      })}
    </>
  );
};
