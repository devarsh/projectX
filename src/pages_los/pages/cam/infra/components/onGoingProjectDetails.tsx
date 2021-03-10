import { dateFormatter } from "pages_los/pages/cam/utils";

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
            <td>{onGoingProjectDetails.projectName}</td>
            <td>{onGoingProjectDetails.companyName}</td>
            <td>{onGoingProjectDetails.projectType}</td>
            <td>{onGoingProjectDetails.totalUnits}</td>
            <td>{onGoingProjectDetails.location}</td>
            <td>{onGoingProjectDetails.totalBuildUpArea}</td>
            <td>{dateFormatter({ val: onGoingProjectDetails.startDate })}</td>
            <td>
              {dateFormatter({ val: onGoingProjectDetails.completionDate })}
            </td>
            <td>{onGoingProjectDetails.groupName}</td>
          </tr>
        );
      })}
    </>
  );
};
