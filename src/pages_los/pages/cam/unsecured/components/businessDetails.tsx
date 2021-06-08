import { Default } from "pages_los/pages/cam/components";
export const BusinessDetails = ({ business = {} }: any) => {
  if (typeof business === "object") {
    return (
      <>
        <tr>
          <Default
            colspan={9}
            value="Business Details"
            className="form-heading"
            element="th"
            align="center"
          />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Brief history of the Company"
            element="th"
          />
          <Default colspan={7} value={business?.companyHistory} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Existing Products / Services of the company"
            element="th"
          />
          <Default colspan={7} value={business?.companyService} />
        </tr>
        <tr>
          <Default colspan={2} value="End Use of the Products" element="th" />
          <Default colspan={7} value={business?.companyEndUseProducts} />
        </tr>
        <tr>
          <Default colspan={2} value="Name of Raw Materials" element="th" />
          <Default colspan={7} value={business?.companyMaterialsName} />
        </tr>
        <tr>
          <Default colspan={2} vaue="Name of Major Suppliers" element="th" />
          <Default colspan={7} value={business?.companySuppliersName} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Payment Terms with Suppliers"
            element="th"
          />
          <Default colspan={7} value={business?.companyPaymentTermSuppliers} />
        </tr>
        <tr>
          <Default colspan={2} value="Name of Major Customers" element="th" />
          <Default colspan={7} value={business?.companyCustomersName} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Payment terms with Customers"
            element="th"
          />
          <Default colspan={7} value={business?.companyPaymentTerm} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Current Order Book Position"
            element="th"
          />
          <Default colspan={7} value={business?.companyOrderBookPosition} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Marketing & Distribution Policy/Strategy"
            element="th"
          />
          <Default colspan={7} value={business?.companyPolicy} />
        </tr>
        <tr>
          <Default colspan={2} value="Name of Competitors" element="th" />
          <Default colspan={7} value={business?.companyCompetitors} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Name of Major Countries where Exporting"
            element="th"
          />
          <Default colspan={7} value={business?.companyExportCountry} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Domestic and export sales ratio"
            element="th"
          />
          <Default colspan={7} value={business?.companyExportRatio} />
        </tr>
        <tr>
          <Default colspan={2} value="No. of Employees" element="th" />
          <Default colspan={7} value={business?.companyEmployeeCount} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Other Industry specific approvals / license"
            element="th"
          />
          <Default colspan={7} value={business?.companyLicence} />
        </tr>
        <tr>
          <Default
            colspan={2}
            value="Any awards / Recognition received"
            element="th"
          />
          <Default colspan={7} value={business?.companyAwards} />
        </tr>
      </>
    );
  }
  return null;
};
