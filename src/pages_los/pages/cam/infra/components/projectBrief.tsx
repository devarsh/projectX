import { BriefAboutProjectSubDetails } from "./subProjectBreif";
import { Default, Amount } from "pages_los/pages/cam/components";

export const BriefAboutProject = ({ project }) => {
  let projectSubDetailsArray: any = [];
  project?.map((data: any) => {
    data.projectOtherSubDtl?.map((newData) => {
      return projectSubDetailsArray.push(newData);
    });
  });

  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Brief About the Project"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={1} value="Particulars" element="th" />
        <Default colspan={1} value="No. of Units" element="th" align="right" />
        <Default
          colspan={1}
          value="Carpet Area(In Sq. Feet)"
          element="th"
          align="right"
        />
        <Default
          colspan={1}
          value="Salable Area / Super Build Up Area (In Sq. Feet)"
          element="th"
          align="right"
        />
        <Default
          colspan={2}
          value="Rate per Sq. Feet"
          element="th"
          align="right"
        />
        <Default colspan={2} value="Amount" element="th" align="right" />
      </tr>
      {Array.isArray(project) &&
        project.map((projectDetail, index) => {
          return (
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={1} value={projectDetail?.particulars} />
              <Amount
                colspan={1}
                value={projectDetail?.units}
                skipSymbol={true}
              />

              <Amount
                colspan={1}
                value={projectDetail.carpetArea}
                skipSymbol={true}
              />
              <Amount
                colspan={1}
                value={projectDetail?.saleableArea}
                skipSymbol={true}
              />
              <Amount colspan={2} value={projectDetail?.ratePerSquareFeet} />

              <Amount colspan={2} value={projectDetail.amount} />
            </tr>
          );
        })}
      <BriefAboutProjectSubDetails subProject={projectSubDetailsArray} />
    </>
  );
};
