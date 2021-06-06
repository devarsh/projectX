import { Default, Amount, Percentage } from "pages_los/pages/cam/components";

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
  if (!Array.isArray(collateral) || collateral.length <= 0) {
    return (
      <>
        <tr>
          <Default colspan={9} align="center" value="Not Available" />
        </tr>
      </>
    );
  }
  return (
    <>
      <tr>
        <Default colspan={2} value="Address of the Property" element="th" />
        <Default colspan={2} value="Area of the Property" element="th" />
        <Default colspan={2} value="Owner" element="th" />
        <Default colspan={2} value="Market Value (Rs. In Crore)" element="th" />
      </tr>

      {collateral.map((collateralData) => {
        return (
          <>
            <tr>
              <Default colspan={2} value={collateralData?.propertyAddress} />
              <Amount
                colspan={2}
                skipSymbol={true}
                value={collateralData?.propertyArea}
              />
              <Default colspan={2} value={collateralData?.owner} />
              <Amount colspan={2} value={collateralData?.marketValue} />
            </tr>
          </>
        );
      })}
      <tr>
        <Default
          colspan={7}
          align="end"
          value="Collateral Coverage"
          element="th"
        />
        <Percentage colspan={1} value={collateral[0]?.collateralCoverage} />
      </tr>
      <tr>
        <Default colspan={7} align="end" value="FACR" element="th" />
        <Percentage colspan={1} value={collateral[0]?.facr} />
      </tr>
      <tr>
        <Default colspan={7} align="end" value="ACR" element="th" />
        <Percentage colspan={1} value={collateral[0]?.acr} />
      </tr>
    </>
  );
};
