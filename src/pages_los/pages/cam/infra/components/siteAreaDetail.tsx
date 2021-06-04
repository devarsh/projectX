import {
  Amount,
  Default,
  SquareFeetFormat,
} from "pages_los/pages/cam/components";
export const SiteAreaDetails = ({ siteArea }) => {
  if (typeof siteArea !== "object") {
    return null;
  }

  const others = siteArea?.projectSiteAreaDetails;
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Site Area"
          element="th"
        />
      </tr>
      <tr>
        <th colSpan={1} />
        <Default colspan={6} value="Land Area (In Sq. feet):" />
        <Amount colspan={2} skipSymbol={true} value={siteArea?.landArea} />
      </tr>
      <tr>
        <th colSpan={1} />
        <Default
          colspan={6}
          value="Construction Area as per Commencement Certificate (CC):"
        />
        <Amount
          colspan={2}
          skipSymbol={true}
          value={siteArea?.commencementCertificate}
        />
      </tr>
      <tr>
        <th colSpan={1} />
        <Default colspan={6} value="Block:" />
        <Amount colspan={2} skipSymbol={true} value={siteArea?.siteBlock} />
      </tr>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Project Details"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Floor" element="th" />
        <Default
          colspan={3}
          value="Build Up Area (In Sq. Feet)"
          element="th"
          align="right"
        />
        <Default colspan={1} value="Usage" element="th" />
        <Default colspan={2} value="No. of Units" element="th" />
      </tr>
      {others.map((projectDetail, index) => {
        return (
          <>
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={2} value={projectDetail?.siteFloor} />
              <Amount colspan={3} value={projectDetail?.buildUpArea} />
              <Default colspan={1} value={projectDetail?.siteUsage} />
              <Default colspan={2} value={projectDetail?.units} />
            </tr>
          </>
        );
      })}
    </>
  );
};
