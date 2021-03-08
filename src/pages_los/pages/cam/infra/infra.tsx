import {
  GeneralDetails,
  AddressDetails,
  PromoterDetails,
  BankDetails,
  SiteAreaDetails,
} from "./components";

export const Infra = ({ data, others }) => {
  let {
    generalDetails,
    promotersDetails,
    addressDetails,
    projectDetails,
    siteAreaDetails,
    managementDetails,
  } = data;
  let { productID } = others;

  return (
    <table className="page">
      <tbody>
        <GeneralDetails
          general={generalDetails}
          promoter={promotersDetails}
          address={addressDetails}
          bank={managementDetails}
        />
        <SiteAreaDetails siteArea={siteAreaDetails} />
      </tbody>
    </table>
  );
};
