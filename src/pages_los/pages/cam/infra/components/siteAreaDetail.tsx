import { Default, Numeric } from "pages_los/pages/cam/components";
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
        <Default colspan={6} value="Land Area (In Sq. Feet):" />
        <Numeric colspan={2} value={siteArea?.landArea} />
      </tr>
      <tr>
        <th colSpan={1} />
        <Default
          colspan={6}
          value="Construction Area as per Commencement Certificate (CC):"
        />
        <Numeric colspan={2} value={siteArea?.commencementCertificate} />
      </tr>
      <tr>
        <th colSpan={1} />
        <Default colspan={6} value="Block:" />
        <Numeric colspan={2} value={siteArea?.siteBlock} />
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
          colspan={2}
          value="Build Up Area (In Sq. Feet)"
          element="th"
          align="right"
        />
        <Default colspan={2} value="Carpet Area (In Sq. Feet)" element="th" />
        <Default colspan={2} value="No. of Units" element="th" />
      </tr>
      {others.map((projectDetail, index) => {
        return (
          <>
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={2} value={projectDetail?.siteFloor} />
              <Numeric colspan={2} value={projectDetail?.buildUpArea} />
              <Numeric colspan={2} value={projectDetail?.siteUsage} />
              <Default colspan={2} value={projectDetail?.units} />
            </tr>
          </>
        );
      })}
      <br />
    </>
  );
};
