import { Default, Amount, Numeric } from "pages_los/pages/cam/components";

export const BriefAboutProjectSubDetails = ({ subProject }) => {
  return (
    <>
      <br />
      <br />
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={1} value="Particulars" element="th" />
        <Default colspan={1} value="No. of Units" element="th" />
        <Default
          colspan={2}
          value="Saleable Area (In Sq. Feet)"
          element="th"
          align="right"
        />
        <Default
          colspan={2}
          value="Carpet Area (In Sq. Feet)"
          element="th"
          align="right"
        />
        <Default
          colspan={2}
          value="Construction Area (In Sq. Feet)"
          element="th"
          align="right"
        />
      </tr>
      {Array.isArray(subProject) &&
        subProject.map((projectSubDetail, index) => {
          return (
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={1} value={projectSubDetail?.particulars} />
              <Default colspan={1} value={projectSubDetail?.units} />
              <Numeric colspan={2} value={projectSubDetail?.saleableArea} />
              <Numeric colspan={2} value={projectSubDetail?.carpetArea} />
              <Numeric colspan={2} value={projectSubDetail?.constructionArea} />
            </tr>
          );
        })}
    </>
  );
};
