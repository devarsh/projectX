import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import { ManagementDetails } from "./managementDetails";
import { FinancialRatios } from "./financialRatios";
import { CollateralDetails } from "./collateralDetails";
import { BusinessDetails } from "./businessDetails";
import { GeneralDetails } from "./generalDetails";
import { ProjectDetails } from "./ProjectDetails";
import { LOSSDK } from "registry/fns/los";

export const CAMWrapper = () => {
  let camType = "smeCCOD" || "smeTermLoan" || "smeTermLoanCCOD" || "smeNFB";

  const result = useQuery(
    ["getViewData", "lead", "cam"],
    () => LOSSDK.getCAMData("89"),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  console.log(result);

  let managementDetails,
    camDetails,
    promoterDetails,
    addressDetails,
    businessDetails,
    financialDetails,
    projectDetails,
    collateralSecurity,
    primarySecurity,
    personalGurantee: any = [];

  let error = result.isError;
  //@ts-ignore
  let errorMsg = result.error?.error_msg ?? "Unknown error occured";
  if (result.isLoading === false && error === false) {
    camDetails = result.data.generalDetails;
    managementDetails = result.data.managementDetails;
    promoterDetails = result.data.promotersDetails;
    addressDetails = result.data.addressDetails;
    businessDetails = result.data.businessOtherDetails;
    financialDetails = result.data.financialDetails;
    projectDetails = result.data.projectDetails;
    collateralSecurity = result.data.collateralSecurity;
    primarySecurity = result.data.primaryCollateralSecurity;
    personalGurantee = result.data.personalGuaranteeSecurity;
  }

  const renderResult = result.isLoading ? (
    <img src={loaderGif} alt="loader" />
  ) : error ? (
    <span>{errorMsg}</span>
  ) : (
    <>
      <table className="page">
        <tbody>
          <GeneralDetails
            general={camDetails}
            promoter={promoterDetails}
            address={addressDetails}
          />
          <BusinessDetails business={businessDetails} />
          <ProjectDetails project={projectDetails} />
          <ManagementDetails management={managementDetails} />
          <FinancialRatios finance={financialDetails} />
          <CollateralDetails
            collateral={collateralSecurity}
            primary={primarySecurity}
            personal={personalGurantee}
          />
        </tbody>
      </table>
    </>
  );
  return renderResult;
};
