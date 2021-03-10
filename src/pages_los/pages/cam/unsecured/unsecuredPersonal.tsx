import {
  GeneralDetailsPersonal,
  PersonalGuarantee,
} from "./componentsPersonal";

export const UnsecuredPersonal = ({ data, others }) => {
  let { generalDetails, personalGuaranteeSecurity } = data;

  return (
    <table className="page">
      <tbody>
        <GeneralDetailsPersonal general={generalDetails} />
        <PersonalGuarantee personal={personalGuaranteeSecurity} />
      </tbody>
    </table>
  );
};
