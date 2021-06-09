import { Default } from "pages_los/pages/cam/components";
export const NomineeDetails = ({ nominee }) => {
  return (
    <>
      {Array.isArray(nominee) &&
        nominee.map((nomineeData, index) => {
          return (
            <Default
              colspan={2}
              element="tr"
              value={`${nomineeData?.salutation} ${nomineeData?.firstName} 
                ${nomineeData?.middleName} ${nomineeData?.lastName}`}
            />
          );
        })}
    </>
  );
};
