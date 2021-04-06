export const SiteAreaDetails = ({ siteArea }) => {
  if (typeof siteArea !== "object") {
    return null;
  }

  const others = siteArea?.projectSiteAreaDetails;
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Site Area
        </th>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <td colSpan={6}>Land Area :(In Sq. feet)</td>
        <td colSpan={1}>{siteArea.landArea}</td>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <td colSpan={6}>
          Construction Area as per Commencement Certificate (CC):
        </td>
        <td colSpan={1}>{siteArea.commencementCertificate}</td>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <td colSpan={6}>Block:</td>
        <td colSpan={1}>{siteArea.siteBlock}</td>
      </tr>
      <br />
      <tr>
        <th colSpan={2}></th>
        <th>Sr. No.</th>
        <th>Floor</th>
        <th colSpan={2}>Build Up Area (In Sq. Feet)</th>
        <th>Usage</th>
        <th colSpan={2}>No. of Units</th>
      </tr>
      {others.map((projectDetail, index) => {
        return (
          <>
            <tr key={index}>
              <td colSpan={2}></td>
              <td>{index}</td>
              <td>{projectDetail.siteFloor}</td>
              <td colSpan={2}>{projectDetail.buildUpArea}</td>
              <td>{projectDetail.siteUsage}</td>
              <td colSpan={2}>{projectDetail.units}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};
