import { convertIntoCurrency } from "pages_los/pages/cam/utils";

export const CollateralDetails = ({ primary, collateral, personal }) => {
  if (!Array.isArray(primary) || primary.length <= 0) {
    return null;
  }
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
      <tr>
        <th colSpan={2} className="form-sub-heading">
          PRIMARY SECURITY
        </th>
      </tr>
      <tr>
        <th colSpan={3}>Address of the Property</th>
        <th colSpan={2}>Area of the Property</th>
        <th colSpan={2}>Owner</th>
        <th colSpan={2}>Market Value (Rs. In Crore)</th>
      </tr>
      {primary?.map((primaryData) => {
        return (
          <>
            <tr>
              <td colSpan={3}>{primaryData.propertyAddress}</td>
              <td colSpan={2}>{primaryData.propertyArea}</td>
              <td colSpan={2}>{primaryData.owner}</td>
              <td>
                {convertIntoCurrency({
                  amount: primaryData.marketValue,
                })}
              </td>
            </tr>
          </>
        );
      }) ?? ""}
      <CollateralSecurity collateral={collateral} />
      <PersonalGuarantee personal={personal} />
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
        <th colSpan={3}>Address of the Property</th>
        <th colSpan={2}>Area of the Property</th>
        <th colSpan={2}>Owner</th>
        <th colSpan={2}>Market Value (Rs. In Crore)</th>
      </tr>

      {collateral.map((collateralData) => {
        return (
          <>
            <tr>
              <td colSpan={3}>{collateralData.propertyAddress}</td>
              <td colSpan={2}>{collateralData.propertyArea}</td>
              <td colSpan={2}>{collateralData.owner}</td>
              <td>
                {convertIntoCurrency({
                  amount: collateralData.marketValue,
                })}
              </td>
            </tr>
          </>
        );
      })}
      <tr>
        <th colSpan={8} style={{ textAlign: "end" }}>
          Collateral Coverage
        </th>
        <td>{collateral[0].collateralCoverage}</td>
      </tr>
      <tr>
        <th colSpan={8} style={{ textAlign: "end" }}>
          FACR
        </th>
        <td>{collateral[0].facr}</td>
      </tr>
      <tr>
        <th colSpan={8} style={{ textAlign: "end" }}>
          ACR
        </th>
        <td>{collateral[0].acr}</td>
      </tr>
    </>
  );
};

const PersonalGuarantee = ({ personal }) => {
  if (!Array.isArray(personal) || personal.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={2} className="form-sub-heading">
          PERSONAL GUARANTE
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Name of Guarantor</th>
        <th colSpan={2}>PAN No.</th>
        <th colSpan={2}>Net Worth</th>
      </tr>
      {personal?.map((personalData) => {
        return (
          <>
            <tr>
              <td colSpan={2}>{personalData.guarantorName}</td>
              <td colSpan={2}>{personalData.panNumber}</td>
              <td>
                {convertIntoCurrency({
                  amount: personalData.netWorth,
                })}
              </td>
            </tr>
          </>
        );
      }) ?? ""}
    </>
  );
};
