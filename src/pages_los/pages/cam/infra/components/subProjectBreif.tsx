import { Default, Amount } from "pages_los/pages/cam/components";

export const BriefAboutProjectSubDetails = ({ subProject }) => {
  if (!Array.isArray(subProject) || subProject.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Brief About the Project Sub Detail"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={3} value="Particulars" element="th" />
        <Default colspan={1} value="No. of Units" element="th" align="right" />
        <Default
          colspan={2}
          value="Saleable Area (In Sq. feet)"
          element="th"
          align="right"
        />
        <Default
          colspan={1}
          value="Carpet Area (In Sq. feet)"
          element="th"
          align="right"
        />
        <Default
          colspan={1}
          value="Construction Area (In Sq. feet)"
          element="th"
          align="right"
        />
      </tr>
      {subProject.map((projectSubDetail, index) => {
        return (
          <tr key={index}>
            <Default colspan={1} value={index + 1} />
            <Default colspan={3} value={projectSubDetail?.particulars} />
            <Default colspan={1} value={projectSubDetail?.units} />
            <Amount
              colspan={2}
              skipSymbol={true}
              value={projectSubDetail?.saleableArea}
              align="right"
            />
            <Amount
              colspan={1}
              skipSymbol={true}
              value={projectSubDetail?.carpetArea}
              align="right"
            />
            <Amount
              colspan={1}
              skipSymbol={true}
              value={projectSubDetail?.constructionArea}
              align="right"
            />
          </tr>
        );
      })}
    </>
  );
};
