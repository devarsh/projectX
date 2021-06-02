import { Default, Amount } from "pages_los/pages/cam/components";
export const ProjectParticularDetails = ({ projectParticular }) => {
  if (!Array.isArray(projectParticular) || projectParticular.length <= 0) {
    return null;
  }
  const meansOfFiance = projectParticular.filter(
    (one) => one.particularType === "Total Means of Finance"
  );
  const costOfProject = projectParticular.filter(
    (one) => one.particularType === "Total Cost of Project"
  );
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Cost of the Project
        </th>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <th>Particulars</th>
        <th>Total Cost</th>
        <th>Cost Incurred</th>
        <th colSpan={2}>Cost per Sq. feet</th>
        <th colSpan={2}>% of Total Cost </th>
      </tr>
      {costOfProject.map((projectDetail, index) => (
        <tr key={index + 1}>
          <td colSpan={2}></td>
          <td>{<Default value={projectDetail.particulars} />}</td>
          <td>
            {
              //@ts-ignore
              <Amount value={projectDetail.totalCost} />
            }
          </td>
          <td>
            {
              //@ts-ignore
              <Amount value={projectDetail.costIncurred} />
            }
          </td>
          <td colSpan={2}>
            {
              //@ts-ignore
              <Amount value={projectDetail.costPerSquareFeet} />
            }
          </td>
          <td colSpan={2}>
            {
              //@ts-ignore
              <Amount value={projectDetail.totalCostPercentage} />
            }
          </td>
        </tr>
      ))}
      <MeansOfFinnaceProjectDetails projectParticular={meansOfFiance} />
    </>
  );
};

export const MeansOfFinnaceProjectDetails = ({ projectParticular }) => {
  if (!Array.isArray(projectParticular) || projectParticular.length <= 0) {
    return null;
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-sub-heading">
          Means of Finance
        </th>
      </tr>
      <tr>
        <th colSpan={2}></th>
        <th colSpan={1}>Particulars</th>
        <th colSpan={2}>Total Amount</th>
        <th colSpan={2}>Fund Infused</th>
        <th colSpan={2}>% of Total Cost</th>
      </tr>
      {projectParticular.map((projectDetail, index) => (
        <tr key={index}>
          <td colSpan={2}></td>
          <td colSpan={1}>
            {<Default value={projectDetail.meansOfFinanceParticulars} />}
          </td>
          <td colSpan={2}>
            {
              //@ts-ignore
              <Amount value={projectDetail.totalAmount} />
            }
          </td>
          <td colSpan={2}>
            {
              //@ts-ignore
              <Amount vaue={projectDetail.fundInfused} />
            }
          </td>
          <td colSpan={2}>
            {
              //@ts-ignore
              <Amount value={projectDetail.totalCostPercentage} />
            }
          </td>
        </tr>
      ))}
    </>
  );
};
