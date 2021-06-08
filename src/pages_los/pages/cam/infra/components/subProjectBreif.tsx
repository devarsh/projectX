import { Default, Amount } from "pages_los/pages/cam/components";

export const BriefAboutProjectSubDetails = ({ subProject }) => {
  return (
    <>
      <br />
      <br />
      {/* <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Brief About the Project Sub Detail"
          element="th"
        />
      </tr> */}
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={1} value="Particulars" element="th" />
        <Default colspan={1} value="No. of Units" element="th" align="right" />
        <Default
          colspan={2}
          value="Saleable Area (In Sq. feet)"
          element="th"
          align="right"
        />
        <Default
          colspan={2}
          value="Carpet Area (In Sq. feet)"
          element="th"
          align="right"
        />
        <Default
          colspan={2}
          value="Construction Area (In Sq. feet)"
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
              <Amount
                colspan={2}
                skipSymbol={true}
                value={projectSubDetail?.saleableArea}
                align="right"
              />
              <Amount
                colspan={2}
                skipSymbol={true}
                value={projectSubDetail?.carpetArea}
                align="right"
              />
              <Amount
                colspan={2}
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
