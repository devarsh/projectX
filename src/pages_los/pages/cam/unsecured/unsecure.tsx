import {
  BusinessDetails,
  GeneralDetailsPersonal,
  ManagementDetails,
  PersonalGuarantee,
  GeneralDetailsBusiness,
  FinancialRatios,
} from "./components";

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
            <GeneralDetailsBusiness
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
            <PersonalGuarantee personal={personalGuaranteeSecurity} />
          </>
        ) : (
          "No recoed found"
        )}
      </tbody>
    </table>
  );
};
