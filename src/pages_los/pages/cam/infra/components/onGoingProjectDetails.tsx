import { Default, DateFormat } from "pages_los/pages/cam/components";

export const OnGoingProjectDetails = ({ onGoingProject }) => {
  if (!Array.isArray(onGoingProject) || onGoingProject.length <= 0) {
    return null;
  }
  return (
    <>
      <br />
      <br />
      <tr>
        <th className="form-heading" colSpan={9}>
          List of Ongoing Projects by the Promoters / Group
        </th>
      </tr>
      <tr>
        <th>Project Name</th>
        <th>Company Name</th>
        <th>Type of the Project</th>
        <th>Total Units</th>
        <th>Location</th>
        <th>Total Build Up Area (Sq. feet)</th>
        <th>Start Date</th>
        <th>Completion Date</th>
        <th>Name of the Group</th>
      </tr>
      {onGoingProject.map((onGoingProjectDetails) => {
        return (
          <tr>
            <td>{<Default value={onGoingProjectDetails.projectName} />}</td>
            <td>{<Default value={onGoingProjectDetails.companyName} />}</td>
            <td>{<Default value={onGoingProjectDetails.projectType} />}</td>
            <td>{<Default value={onGoingProjectDetails.totalUnits} />}</td>
            <td>{<Default value={onGoingProjectDetails.location} />}</td>
            <td>
              {<Default value={onGoingProjectDetails.totalBuildUpArea} />}
            </td>
            <td>{<DateFormat value={onGoingProjectDetails.startDate} />}</td>
            <td>
              {<DateFormat value={onGoingProjectDetails.completionDate} />}
            </td>
            <td>{<Default value={onGoingProjectDetails.groupName} />}</td>
          </tr>
        );
      })}
    </>
  );
};
