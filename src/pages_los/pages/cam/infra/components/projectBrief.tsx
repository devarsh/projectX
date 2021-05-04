import { BreifeAboutProjectSubDetails } from "./subProjectBreif";
import { convertIntoCurrency } from "pages_los/pages/cam/utils";

export const BreifeAboutProject = ({ project }) => {
  if (!Array.isArray(project) || project.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Brief About the Project
        </th>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <th>No. of Units</th>
        <th colSpan={2}>Carpet Area(In Sq. Feet)</th>
        <th colSpan={2}>Salable Area / Super Build Up Area (In Sq. feet)</th>
        <th>Rate per Sq. Feet </th>
        <th>Amount in Rs. Lakhs </th>
      </tr>
      {project.map((projectDetail, index) => {
        return (
          <>
            <tr key={index + 1}>
              <td colSpan={2}></td>
              <td>{projectDetail.units}</td>
              <td colSpan={2}>{projectDetail.carpetArea}</td>
              <td colSpan={2}>{projectDetail.saleableArea}</td>
              <td>{projectDetail.ratePerSquareFeet}</td>
              <td>
                {convertIntoCurrency({
                  amount: projectDetail.amount,
                })}
              </td>
            </tr>
            <BreifeAboutProjectSubDetails
              subProject={projectDetail.projectOtherSubDtl}
            />
          </>
        );
      })}
    </>
  );
};
