import { OnGoingProjectDetails } from "./onGoingProjectDetails";
import {
  Default,
  DateFormat,
  SquareFeetFormat,
} from "pages_los/pages/cam/components";

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
            <td>{<Default value={completedProjectDetails.projectName} />}</td>
            <td>{<Default value={completedProjectDetails.companyName} />}</td>
            <td>{<Default value={completedProjectDetails.projectType} />}</td>
            <td>{<Default value={completedProjectDetails.totalUnits} />}</td>
            <td>{<Default value={completedProjectDetails.location} />}</td>
            <td>
              {
                //@ts-ignore
                <SquareFeetFormat
                  value={completedProjectDetails.totalBuildUpArea}
                />
              }
            </td>
            <td>{<DateFormat value={completedProjectDetails.startDate} />}</td>
            <td>
              {<DateFormat value={completedProjectDetails.completionDate} />}
            </td>
            <td>{<Default value={completedProjectDetails.groupName} />}</td>
          </tr>
        );
      })}

      <OnGoingProjectDetails onGoingProject={onGoingProject} />
    </>
  );
};
