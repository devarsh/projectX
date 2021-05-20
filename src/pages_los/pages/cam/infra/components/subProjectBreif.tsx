import { Default } from "pages_los/pages/cam/components";

export const BreifeAboutProjectSubDetails = ({ subProject }) => {
  if (!Array.isArray(subProject) || subProject.length <= 0) {
    return null;
  }
  return (
    <>
      <br />
      <br />
      <tr>
        <th colSpan={2}></th>
        <th style={{ textAlign: "center" }}>Sr.No</th>
        <th>Particulars</th>
        <th>No. of Units</th>
        <th colSpan={2}>Saleable Area (In Sq. feet)</th>
        <th>Carpet Area (In Sq. feet)</th>
        <th>Construction Area (In Sq. feet)</th>
      </tr>
      {subProject.map((projectSubDetail, index) => {
        return (
          <>
            <tr key={index + 1}>
              <td colSpan={2}></td>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td>{<Default value={projectSubDetail.particulars} />}</td>
              <td>{<Default value={projectSubDetail.units} />}</td>
              <td colSpan={2}>
                {<Default value={projectSubDetail.saleableArea} />}
              </td>
              <td>{<Default value={projectSubDetail.carpetArea} />}</td>
              <td>{<Default value={projectSubDetail.constructionArea} />}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};
