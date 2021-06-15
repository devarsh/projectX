import {
  Default,
  Amount,
  Percentage,
  Numeric,
} from "pages_los/pages/cam/components";

export const CollateralDetails = ({ collateral }) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-heading"
          align="center"
          value="Collateral Details"
          element="th"
        />
      </tr>
      <CollateralSecurity collateral={collateral} />
    </>
  );
};

const CollateralSecurity = ({ collateral }) => {
  return (
    <>
      <tr>
        <Default colspan={3} value="Address of the Property" element="th" />
        <Default
          colspan={2}
          value="Area of the Property"
          element="th"
          align="right"
        />
        <Default colspan={2} value="Owner" element="th" />
        <Default colspan={2} value="Market Value" element="th" align="right" />
      </tr>

      {Array.isArray(collateral) &&
        collateral.map((collateralData) => {
          return (
            <>
              <tr>
                <Default colspan={3} value={collateralData?.propertyAddress} />
                <Numeric colspan={2} value={collateralData?.propertyArea} />
                <Default colspan={2} value={collateralData?.owner} />
                <Amount colspan={2} value={collateralData?.marketValue} />
              </tr>
            </>
          );
        })}
      <tr>
        <Default
          colspan={8}
          align="end"
          value="Collateral Coverage"
          element="th"
        />
        <Percentage colspan={1} value={collateral[0]?.collateralCoverage} />
      </tr>
      <tr>
        <Default colspan={8} align="end" value="FACR" element="th" />
        <Percentage colspan={1} value={collateral[0]?.facr} />
      </tr>
      <tr>
        <Default colspan={8} align="end" value="ACR" element="th" />
        <Percentage colspan={1} value={collateral[0]?.acr} />
      </tr>
    </>
  );
};
