import { Default, DateFormat, Amount } from "pages_los/pages/cam/components";

export const ProjectDetails = ({ projectCompletion }) => {
  const completedProject = projectCompletion.filter(
    (one) => one.projectType === "Completed"
  );
  const onGoingProject = projectCompletion.filter(
    (one) => one.projectType === "Ongoing"
  );

  return (
    <>
      <ProjectDetailsRenderer
        projectDetails={completedProject}
        completed={true}
      />
      <ProjectDetailsRenderer
        projectDetails={onGoingProject}
        completed={false}
      />
    </>
  );
};

export const ProjectDetailsRenderer = ({
  projectDetails,
  completed = false,
}: any) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-heading"
          align="center"
          value={`List of ${
            completed ? "Completed" : "Ongoing"
          } Projects by the Promoters / Group`}
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Project Name" element="th" />
        <Default colspan={1} value="Company Name" element="th" />
        <Default colspan={1} value="Type of the Project" element="th" />
        <Default colspan={1} value="Total Units" element="th" />
        <Default colspan={1} value="Location" element="th" />
        <Default
          colspan={1}
          value="Total Build Up Area (In Sq. Feet)"
          element="th"
          align="right"
        />
        <Default colspan={1} value="Start Date" element="th" />
        <Default colspan={1} value="Completion Date" element="th" />
        <Default colspan={1} value="Name of the Group" element="th" />
      </tr>
      {Array.isArray(projectDetails) &&
        projectDetails.map((projectDetail) => {
          return (
            <tr>
              <Default colspan={1} value={projectDetail?.projectName} />
              <Default colspan={1} value={projectDetail?.companyName} />
              <Default colspan={1} value={projectDetail?.projectType} />
              <Default colspan={1} value={projectDetail?.totalUnits} />
              <Default colspan={1} value={projectDetail?.location} />
              <Amount
                colspan={1}
                skipSymbol={true}
                value={projectDetail?.totalBuildUpArea}
              />
              <DateFormat colspan={1} value={projectDetail?.startDate} />
              <DateFormat colspan={1} value={projectDetail?.completionDate} />
              <DateFormat colspan={1} value={projectDetail?.groupName} />
            </tr>
          );
        })}
    </>
  );
};
