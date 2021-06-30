import {
  GeneralDetails,
  ProjectDetails,
  CollateralDetails,
} from "./components";

export const Infra = ({ data, others }) => {
  let {
    generalDetails,
    promotersDetails,
    addressDetails,
    managementDetails,
    projectOthersDetails,
    projectParticularDetails,
    siteAreaDetails,
    projectDetails,
    collateralSecurity,
    primaryCollateralSecurity,
    personalGuaranteeSecurity,
  } = data;

  return (
    <table className="page">
      <tbody>
        <GeneralDetails
          general={generalDetails}
          promoter={promotersDetails}
          address={addressDetails}
          productCode={others}
          project={projectOthersDetails}
          projectParticular={projectParticularDetails}
          siteArea={siteAreaDetails}
        />
        <ProjectDetails projectCompletion={projectDetails} />
        <CollateralDetails collateral={collateralSecurity} />
      </tbody>
    </table>
  );
};
