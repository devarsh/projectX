import {
  ManagementDetails,
  FinancialRatios,
  CollateralDetails,
  BusinessDetails,
  GeneralDetails,
  ProjectDetails,
} from "./components";

export const SME = ({ data, others }) => {
  let {
    generalDetails,
    managementDetails,
    promotersDetails,
    addressDetails,
    businessOtherDetails,
    financialDetails,
    projectDetails,
    collateralSecurity,
    primaryCollateralSecurity,
    personalGuaranteeSecurity,
  } = data;
  let { productID } = others;

  return (
    <table className="page">
      <tbody>
        <GeneralDetails
          general={generalDetails}
          promoter={promotersDetails}
          address={addressDetails}
        />
        <BusinessDetails business={businessOtherDetails} />
        {productID === ("12300006" || "12300007") ? (
          <ProjectDetails project={projectDetails} />
        ) : null}
        <ManagementDetails management={managementDetails} />
        <FinancialRatios finance={financialDetails} />
        <CollateralDetails
          collateral={collateralSecurity}
          primary={primaryCollateralSecurity}
          personal={personalGuaranteeSecurity}
        />
      </tbody>
    </table>
  );
};
