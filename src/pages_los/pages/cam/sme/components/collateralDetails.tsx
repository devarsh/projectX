import { Default, Amount, Percentage } from "pages_los/pages/cam/components";

export const CollateralDetails = ({ collateral }) => {
  return (
    <>
      <br />
      <tr className="page-break">
        <th></th>
      </tr>
      <tr>
        <th colSpan={9} className="form-heading">
          Collateral Details
        </th>
      </tr>
      <CollateralSecurity collateral={collateral} />
    </>
  );
};

const CollateralSecurity = ({ collateral }) => {
  if (!Array.isArray(collateral) || collateral.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={2} className="form-sub-heading">
          COLLATERAL SECURITY
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Address of the Property</th>
        <th colSpan={2}>Area of the Property</th>
        <th colSpan={2}>Owner</th>
        <th colSpan={2}>Market Value (Rs. In Crore)</th>
      </tr>

      {collateral.map((collateralData) => {
        return (
          <>
            <tr>
              <td colSpan={2}>
                {<Default value={collateralData.propertyAddress} />}
              </td>
              <td colSpan={2}>
                {<Default value={collateralData.propertyArea} />}
              </td>
              <td colSpan={2}>{<Default value={collateralData.owner} />}</td>
              <td colSpan={2}>
                {
                  //@ts-ignore
                  <Amount value={collateralData.marketValue} />
                }
              </td>
            </tr>
          </>
        );
      })}
      <tr>
        <th colSpan={7} style={{ textAlign: "end" }}>
          Collateral Coverage
        </th>
        <td>
          {
            //@ts-ignore
            <Percentage value={collateral[0].collateralCoverage} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={7} style={{ textAlign: "end" }}>
          FACR
        </th>
        <td>
          {
            //@ts-ignore
            <Percentage value={collateral[0].facr} />
          }
        </td>
      </tr>
      <tr>
        <th colSpan={7} style={{ textAlign: "end" }}>
          ACR
        </th>
        <td>
          {
            //@ts-ignore
            <Percentage value={collateral[0].acr} />
          }
        </td>
      </tr>
    </>
  );
};
