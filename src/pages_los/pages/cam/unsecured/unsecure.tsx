import { GeneralDetailsPersonal, ManagementDetails } from "./components";

import {
  FinancialRatios,
  BusinessDetails,
  GeneralDetails,
  CollateralDetails,
} from "pages_los/pages/cam/sme/components";

export const Unsecured = ({ data, others }) => {
  let {
    generalDetails,
    managementDetails,
    promotersDetails,
    addressDetails,
    businessOtherDetails,
    financialDetails,
    personalGuaranteeSecurity,
  } = data;

  let { productID } = others;

  return (
    <table className="page">
      <tbody>
        {productID === "123000013" ? (
          <>
            <GeneralDetails
              general={generalDetails}
              promoter={promotersDetails}
              address={addressDetails}
            />
            <BusinessDetails business={businessOtherDetails} />
            <ManagementDetails management={managementDetails} />
            <FinancialRatios finance={financialDetails} />
          </>
        ) : productID === "123000014" ? (
          <>
            <GeneralDetailsPersonal general={generalDetails} />
            <CollateralDetails collateral={personalGuaranteeSecurity} />
          </>
        ) : (
          "No recoed found"
        )}
      </tbody>
    </table>
  );
};
