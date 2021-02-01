import { ManagementDetails } from "./managementDetails";
import { FinancialRatios } from "./financialRatios";
import { CollateralDetails } from "./collateralDetails";
import { BusinessDetails } from "./businessDetails";
import { GeneralDetails } from "./generalDetails";

export const CAMWrapper = () => {
  return (
    <table>
      <tbody>
        <GeneralDetails />
        <BusinessDetails />
        <ManagementDetails />
        <FinancialRatios />
        <CollateralDetails />
      </tbody>
    </table>
  );
};
