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
        <th colSpan={2}>Address of the Property</th>
        <th colSpan={2}>Area of the Property</th>
        <th colSpan={2}>Owner</th>
        <th colSpan={2}>Market Value (Rs. In Crore)</th>
      </tr>
      {primary?.map((primaryData) => {
        return (
          <>
            <tr>
              <td colSpan={2}>{primaryData.propertyAddress}</td>
              <td colSpan={2}>{primaryData.propertyArea}</td>
              <td colSpan={2}>{primaryData.owner}</td>
              <td colSpan={2}>{primaryData.marketValue}</td>
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
        <th colSpan={2}>Address of the Property</th>
        <th colSpan={2}>Area of the Property</th>
        <th colSpan={2}>Owner</th>
        <th colSpan={2}>Market Value (Rs. In Crore)</th>
      </tr>

      {collateral.map((collateralData) => {
        return (
          <>
            <tr>
              <td colSpan={2}>{collateralData.propertyAddress}</td>
              <td colSpan={2}>{collateralData.propertyArea}</td>
              <td colSpan={2}>{collateralData.owner}</td>
              <td colSpan={2}>{collateralData.marketValue}</td>
            </tr>
          </>
        );
      })}
      <tr>
        <th colSpan={7} style={{ textAlign: "end" }}>
          Collateral Coverage
        </th>
        <td>{collateral[0].collateralCoverage}</td>
      </tr>
      <tr>
        <th colSpan={7} style={{ textAlign: "end" }}>
          FACR
        </th>
        <td>{collateral[0].facr}</td>
      </tr>
      <tr>
        <th colSpan={7} style={{ textAlign: "end" }}>
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
              <td colSpan={2}>{personalData.netWorth}</td>
            </tr>
          </>
        );
      }) ?? ""}
    </>
  );
};
