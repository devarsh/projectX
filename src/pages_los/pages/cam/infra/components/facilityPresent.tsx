import {
  Default,
  DateFormat,
  Amount,
  Percentage,
  NotAvailable,
} from "pages_los/pages/cam/components";
import { CalculateTotal } from "../../utils";

export const NatureofFacilityPresentDetails = ({ natureOfFacilityPresent }) => {
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
        <Default colspan={1} value="Nature of Facility" element="th" />
        <Default colspan={1} value="Name of Bank" element="th" />
        <Default
          colspan={1}
          value="Sanction Amount"
          element="th"
          align="right"
        />
        <Default colspan={2} value="Outstanding as on" element="th" />
        <Default
          colspan={2}
          value="Outstanding Amount As On"
          element="th"
          align="right"
        />
        <Default colspan={1} value="Rate of Interest" element="th" />
      </tr>
      {Array.isArray(natureOfFacilityPresent) ? (
        natureOfFacilityPresent.map((presentDetails, index) => {
          return (
            <>
              <tr key={index}>
                <Default colspan={1} value={index + 1} />
                <Default colspan={1} value={presentDetails?.facilityType} />
                <Default colspan={1} value={presentDetails?.bankName} />
                <Amount colspan={1} value={presentDetails?.sanctionAmount} />
                <DateFormat colspan={2} value={presentDetails.outstandingOn} />
                <Amount
                  colspan={2}
                  value={presentDetails?.outstandingBalance}
                />
                <Percentage
                  colspan={1}
                  value={presentDetails?.rateOfInterest}
                />
              </tr>
            </>
          );
        })
      ) : (
        <NotAvailable />
      )}
      <tr>
        <Default colspan={6} value="Total" />
        <Amount
          colspan={2}
          value={CalculateTotal({
            obj: natureOfFacilityPresent,
            key: "outstandingBalance",
          })}
        />
      </tr>
    </>
  );
};
