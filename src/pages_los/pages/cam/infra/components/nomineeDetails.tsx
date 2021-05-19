export const NomineeDetails = ({ nominee }) => {
  if (!Array.isArray(nominee) || nominee.length <= 0) {
    return null;
  }
  return (
    <>
      {nominee.map((nomineeData, index) => {
        return (
          <>
            <tr key={index}>
              {index + 1}
              {nomineeData.salutation} {nomineeData.firstName}{" "}
              {nomineeData.middleName} {nomineeData.lastName}
            </tr>
          </>
        );
      })}
    </>
  );
};
