import {
  ManagementDetails,
  BusinessDetails,
  GeneralDetails,
  PersonalGuarantee,
} from "./componentBusiness";

export const UnsecuredBusiness = ({ data, others }) => {
  let {
    generalDetails,
    managementDetails,
    promotersDetails,
    addressDetails,
    businessOtherDetails,
    personalGuaranteeSecurity,
  } = data;

  return (
    <table className="page">
      <tbody>
        <GeneralDetails
          general={generalDetails}
          promoter={promotersDetails}
          address={addressDetails}
        />
        <BusinessDetails business={businessOtherDetails} />
        <ManagementDetails management={managementDetails} />
        <PersonalGuarantee personal={personalGuaranteeSecurity} />
      </tbody>
    </table>
  );
};
