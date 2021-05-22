import { Default } from "pages_los/pages/cam/components";
export const BusinessDetails = ({ business }) => {
  if (typeof business === "object") {
    return (
      <>
        <tr>
          <th colSpan={9} className="form-heading">
            Business Details
          </th>
        </tr>
        <tr>
          <th colSpan={2}>Brief history of the Company</th>
          <td colSpan={7}>{<Default value={business.companyHistory} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Existing Products / Services of the company</th>
          <td colSpan={7}>{<Default value={business.companyService} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>End Use of the Products</th>
          <td colSpan={7}>
            {<Default value={business.companyEndUseProducts} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Name of Raw Materials</th>
          <td colSpan={7}>
            {<Default value={business.companyMaterialsName} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Name of Major Suppliers</th>
          <td colSpan={7}>
            {<Default value={business.companySuppliersName} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Payment Terms with Suppliers</th>
          <td colSpan={7}>
            {<Default value={business.companyPaymentTermSuppliers} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Name of Major Customers</th>
          <td colSpan={7}>
            {<Default value={business.companyCustomersName} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Payment terms with Customers</th>
          <td colSpan={7}>{<Default value={business.companyPaymentTerm} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Current Order Book Position</th>
          <td colSpan={7}>
            {<Default value={business.companyOrderBookPosition} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Marketing & Distribution Policy/Strategy</th>
          <td colSpan={7}>{<Default value={business.companyPolicy} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Name of Competitors</th>
          <td colSpan={7}>{<Default value={business.companyCompetitors} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Name of Major Countries where Exporting</th>
          <td colSpan={7}>
            {<Default value={business.companyExportCountry} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Domestic and export sales ratio</th>
          <td colSpan={7}>{<Default value={business.companyExportRatio} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>No. of Employees</th>
          <td colSpan={7}>
            {<Default value={business.companyEmployeeCount} />}
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Other Industry specific approvals / license</th>
          <td colSpan={7}>{<Default value={business.companyLicence} />}</td>
        </tr>
        <tr>
          <th colSpan={2}>Any awards / Recognition received</th>
          <td colSpan={7}>{<Default value={business.companyAwards} />}</td>
        </tr>
      </>
    );
  }
  return (
    <>
      <tr>
        <th colSpan={9} className="form-heading">
          Business Details
        </th>
      </tr>
      <tr>
        <th>Invalid data</th>
      </tr>
    </>
  );
};
