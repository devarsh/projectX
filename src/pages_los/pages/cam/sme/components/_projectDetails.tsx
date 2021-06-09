import { Default, DateFormat, Amount } from "pages_los/pages/cam/components";
export const ProjectDetails = ({ project }) => {
  if (!Array.isArray(project) || project.length <= 0) {
    return (
      <>
        <tr>
          <Default
            colspan={9}
            className="form-heading"
            align="center"
            value="Project Details"
            element="th"
          />
        </tr>
        <tr>
          <Default colspan={9} align="center" value="Not Available" />
        </tr>
      </>
    );
  }
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-heading"
          align="center"
          value="Project Details"
          element="th"
        />
      </tr>
      {project.map((projectsData) => {
        return (
          <>
            <br />
            <tr>
              <Default
                colspan={2}
                value="Location of the project"
                element="th"
              />
              <Default colspan={7} value={projectsData?.landDetails} />
            </tr>
            <tr>
              <Default colspan={2} value="Land Details" element="th" />
              <Default colspan={7} value={projectsData?.landLocation} />
            </tr>
            {projectsData?.landDetails === "O" ? (
              <>
                <tr>
                  <Default
                    colspan={2}
                    value="Name of the Promoter"
                    element="th"
                  />
                  <Default
                    colspan={7}
                    value={projectsData?.projectPromoterName}
                  />
                </tr>
                <tr>
                  <Default colspan={2} value="Name of the Firm" element="th" />
                  <Default colspan={7} value={projectsData?.projectFirmName} />
                </tr>
              </>
            ) : null}
            <tr>
              <Default
                colspan={2}
                value="Area of the Project Land"
                element="th"
              />
              <Amount
                colspan={7}
                skipSymbol={true}
                value={projectsData?.landAreaApproxValuation}
                align="left"
              />
            </tr>
            <tr>
              <Default colspan={2} value="Approximate valuation" element="th" />
              <Amount
                colspan={7}
                value={projectsData?.landAreaApproximateValuation}
                align="left"
              />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Expected Date of Commencement (DCCO)"
                element="th"
              />
              <DateFormat colspan={7} value={projectsData?.commencementDate} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Current Stage of Project"
                element="th"
              />
              <Default colspan={7} value={projectsData?.currentLandStage} />
            </tr>
            <tr>
              <Default colspan={2} value="Moratorium" element="th" />
              <Default colspan={7} value={projectsData?.maratorium} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Equal Installments or Balloonig"
                element="th"
              />
              <Default
                colspan={7}
                value={projectsData?.installmentBallooning}
              />
            </tr>
            <tr>
              <Default colspan={2} value="Installed Capacity" element="th" />
              <Default colspan={7} value={projectsData?.installedCapacity} />
            </tr>
            <tr>
              <Default colspan={2} value="Manufacturing Process" element="th" />
              <Default colspan={7} value={projectsData?.manufacturingProcess} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Requirement and arrangement of Power"
                element="th"
              />
              <Default colspan={7} value={projectsData?.reqArranPower} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Requirement and arrangement of Employees"
                element="th"
              />
              <Default colspan={7} value={projectsData?.reqArranEmployee} />
            </tr>
            <tr>
              <Default
                colspan={2}
                value="Brief about Technical Person / Plant manager"
                element="th"
              />
              <Default colspan={7} value={projectsData?.brifTechPerson} />
            </tr>
            <tr>
              <Default colspan={2} value="Unit Matrix" element="th" />
              <Default colspan={7} value={projectsData?.unitMatrix} />
            </tr>
            <tr>
              <Default colspan={2} value="Projected Turnover" element="th" />
              <Amount
                colspan={7}
                value={projectsData?.projectTurnover}
                align="left"
              />
            </tr>
            <tr>
              <Default colspan={2} value="Projected Profit" element="th" />
              <Amount
                colspan={7}
                value={projectsData?.projectProfit}
                align="left"
              />
            </tr>
            <ProjectParticulaDetails
              projectParticular={projectsData?.projectParticularDetails}
            />
            <Machieneries machieneries={projectsData.machieneries} />
            <ManufacturedProduct
              manufacturedProduct={projectsData.manufacturedProduct}
            />
          </>
        );
      })}
    </>
  );
};

const ProjectParticulaDetails = ({ projectParticular }) => {
  const costOfProject = projectParticular.filter(
    (one) => one.particularType === "Total Cost of Project"
  );

  const meansOfFinance = projectParticular.filter(
    (one) => one.particularType === "Total Means of Finance"
  );
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          value="Total Cost of Project"
          element="th"
          align="center"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Particulars" element="th" />
        <Default
          colspan={3}
          value="Total Amount (In Lacs)"
          element="th"
          align="right"
        />
        <Default
          colspan={3}
          value="Amount Incurred (In Lacs) "
          element="th"
          align="right"
        />
      </tr>

      {Array.isArray(costOfProject) &&
        costOfProject.map((projectParticularData, index) => {
          return (
            <>
              <tr key={index}>
                <Default colspan={1} value={index + 1} />
                <Default
                  colspan={2}
                  value={projectParticularData?.particulars}
                />
                <Amount colspan={3} value={projectParticularData?.amount} />
                <Amount
                  colspan={3}
                  value={projectParticularData?.incurredAmount}
                />
              </tr>
            </>
          );
        })}
      <MeansOfFinance meandOfFinanceDetails={meansOfFinance} />
      <br />
    </>
  );
};

export const MeansOfFinance = ({ meandOfFinanceDetails }) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Total Means of Finance"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={2} value="Particulars" element="th" />
        <Default
          colspan={3}
          value="Total Amount (In Lacs)"
          element="th"
          align="right"
        />
        <Default
          colspan={3}
          value="Amount Incurred (In Lacs)"
          element="th"
          align="right"
        />
      </tr>
      {Array.isArray(meandOfFinanceDetails) &&
        meandOfFinanceDetails.map((meansOfFinanceData, index) => {
          return (
            <tr>
              <Default colspan={1} value={index + 1} />
              <Default colspan={2} value={meansOfFinanceData?.particulars} />
              <Amount colspan={3} value={meansOfFinanceData?.amount} />
              <Amount colspan={3} value={meansOfFinanceData?.incurredAmount} />
            </tr>
          );
        })}
    </>
  );
};

export const Machieneries = ({ machieneries }) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="List of Machieneries"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default colspan={3} value="Machinery Name" element="th" />
        <Default colspan={2} value="Supplier Name" element="th" />
        <Default
          colspan={3}
          value="Application Area"
          element="th"
          align="right"
        />
      </tr>
      {Array.isArray(machieneries) &&
        machieneries.map((machieneriesDetails, index) => {
          return (
            <tr key={index}>
              <Default colspan={1} value={index + 1} />
              <Default colspan={3} value={machieneriesDetails?.machineryName} />
              <Default colspan={2} value={machieneriesDetails?.supplierName} />
              <Amount
                skipSymbol={true}
                colspan={3}
                value={machieneriesDetails?.applicationArea}
              />
            </tr>
          );
        })}
    </>
  );
};

export const ManufacturedProduct = ({ manufacturedProduct }) => {
  return (
    <>
      <tr>
        <Default
          colspan={9}
          className="form-sub-heading"
          align="center"
          value="Products to be Manufactured"
          element="th"
        />
      </tr>
      <tr>
        <Default colspan={1} value="Sr.No" element="th" />
        <Default
          colspan={8}
          value="Machinery Name"
          element="th"
          align="center"
        />
      </tr>
      {Array.isArray(manufacturedProduct) &&
        manufacturedProduct.map((manufacturedProducts, index) => {
          return (
            <tr>
              <Default colspan={1} value={index + 1} />
              <Default
                colspan={8}
                align="center"
                value={manufacturedProducts?.productName}
              />
            </tr>
          );
        })}
    </>
  );
};
