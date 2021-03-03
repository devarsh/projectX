export const ProjectDetails = ({ project }) => {
  return (
    <>
      <tr>
        <th colSpan={9} className="form-heading">
          Project Details
        </th>
      </tr>
      {project.map((projectsData) => {
        return (
          <>
            <tr>
              <th colSpan={2}>Location of the project</th>
              <td colSpan={7}>{projectsData.landDetails}</td>
            </tr>
            <tr>
              <th colSpan={2}>Land Details</th>
              <td colSpan={7}>{projectsData.landLocation}</td>
            </tr>
            <tr>
              <th colSpan={2}>Area of the Project Land and approx valuation</th>
              <td colSpan={7}>{projectsData.landAreaApproxValuation}</td>
            </tr>
            <tr>
              <th colSpan={2}>Expected Date of Commencement (DCCO)</th>
              <td colSpan={7}>{projectsData.commencementDate}</td>
            </tr>
            <tr>
              <th colSpan={2}>Current Stage of Project</th>
              <td colSpan={7}>{projectsData.currentLandStage}</td>
            </tr>
            <tr>
              <th colSpan={2}>Moratorium</th>
              <td colSpan={7}>{projectsData.maratorium}</td>
            </tr>
            <tr>
              <th colSpan={2}>Equal Installments or Balloonig</th>
              <td colSpan={7}>{projectsData.installmentBallooning}</td>
            </tr>
            <tr>
              <th colSpan={2}>List of Machineries</th>
              <td colSpan={7}>{projectsData.machineryList}</td>
            </tr>
            <tr>
              <th colSpan={2}>Installed Capacity</th>
              <td colSpan={7}>{projectsData.installedCapacity}</td>
            </tr>
            <tr>
              <th colSpan={2}>Products to be manufactured</th>
              <td colSpan={7}>{projectsData.productManufactured}</td>
            </tr>
            <tr>
              <th colSpan={2}>Manufacturing Process</th>
              <td colSpan={7}>{projectsData.manufacturingProcess}</td>
            </tr>
            <tr>
              <th colSpan={2}>Requirement and arrangement of Power</th>
              <td colSpan={7}>{projectsData.reqArranPower}</td>
            </tr>
            <tr>
              <th colSpan={2}>Requirement and arrangement of Employees</th>
              <td colSpan={7}>{projectsData.reqArranEmployee}</td>
            </tr>
            <tr>
              <th colSpan={2}>Brief about Technical Person / Plant manager</th>
              <td colSpan={7}>{projectsData.brifTechPerson}</td>
            </tr>
            <tr>
              <th colSpan={2}>Unit Matrix</th>
              <td colSpan={7}>{projectsData.unitMatrix}</td>
            </tr>
            <tr>
              <th colSpan={2}>Projected Turnover & Profit</th>
              <td colSpan={7}>{projectsData.projectTurnover}</td>
            </tr>

            <ProjectParticulaDetails
              projectParticular={projectsData.projectParticularDetails}
            />
          </>
        );
      })}
    </>
  );
};

const ProjectParticulaDetails = ({ projectParticular }) => {
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Project Particular Details
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Project Type</th>
        <th colSpan={2}>Particulars</th>
        <th colSpan={2}>Total Amount (In Lacs)</th>
        <th colSpan={2}>Amount Incurred (In Lacs)</th>
      </tr>

      {projectParticular.map((projectParticularData) => {
        return (
          <>
            <tr>
              <td colSpan={2}>{projectParticularData.particularType}</td>
              <td colSpan={2}>{projectParticularData.particulars}</td>
              <td colSpan={2}>{projectParticularData.amount}</td>
              <td colSpan={2}>{projectParticularData.incurredAmount}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};
