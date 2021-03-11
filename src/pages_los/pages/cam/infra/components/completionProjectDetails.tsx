import { OnGoingProjectDetails } from "./onGoingProjectDetails";
import { dateFormatter } from "pages_los/pages/cam/utils";

export const CompletionProjectDetails = ({ projectCompletion }) => {
  if (!Array.isArray(projectCompletion) || projectCompletion.length <= 0) {
    return null;
  }
  const completedProject = projectCompletion.filter(
    (one) => one.projectStatus === "Completed"
  );
  const onGoingProject = projectCompletion.filter(
    (one) => one.projectStatus === "Ongoing"
  );

  return (
    <>
      <tr>
        <th className="form-heading" colSpan={9}>
          List of Completed Projects by the Promoters / Group
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
      {completedProject.map((completedProjectDetails) => {
        return (
          <tr>
            <td>{completedProjectDetails.projectName}</td>
            <td>{completedProjectDetails.companyName}</td>
            <td>{completedProjectDetails.projectType}</td>
            <td>{completedProjectDetails.totalUnits}</td>
            <td>{completedProjectDetails.location}</td>
            <td>{completedProjectDetails.totalBuildUpArea}</td>
            <td>{dateFormatter({ val: completedProjectDetails.startDate })}</td>
            <td>
              {dateFormatter({ val: completedProjectDetails.completionDate })}
            </td>
            <td>{completedProjectDetails.groupName}</td>
          </tr>
        );
      })}

      <OnGoingProjectDetails onGoingProject={onGoingProject} />
    </>
  );
};
