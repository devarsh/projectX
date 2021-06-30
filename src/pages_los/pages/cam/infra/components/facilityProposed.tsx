import {
  Default,
  Amount,
  Percentage,
  NotAvailable,
} from "pages_los/pages/cam/components";
import { CalculateTotal } from "../../utils";

export const NatureofFacilityProposedDetails = ({
  natureOfFacilityProposed,
  productName,
}) => {
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
        <Default colspan={1} value="New / Takeover" element="th" />
        <Default colspan={2} value="Requested ROI" element="th" />
        <Default colspan={2} value="Amount" element="th" align="right" />
        <Default colspan={1} value="Tenure in Months" element="th" />
      </tr>
      {Array.isArray(natureOfFacilityProposed) ? (
        natureOfFacilityProposed.map((proposedDetails, index) => {
          return (
            <>
              <tr key={index}>
                <Default colspan={1} value={index + 1} />
                <Default colspan={2} value={productName?.subProduct1Name} />
                <Default colspan={1} value={proposedDetails?.newTakeover} />
                <Percentage
                  colspan={2}
                  value={proposedDetails?.rateOfInterest}
                />
                <Amount colspan={2} value={proposedDetails?.amount} />
                <Default colspan={1} value={proposedDetails?.tenure} />
              </tr>
            </>
          );
        })
      ) : (
        <NotAvailable />
      )}
      <tr>
        <Default colspan={6} value="Total" align="right" />
        <Amount
          colspan={2}
          value={CalculateTotal({
            obj: natureOfFacilityProposed,
            key: "amount",
          })}
        />
      </tr>
    </>
  );
};
