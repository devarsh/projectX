import { Default, DateFormat } from "pages_los/pages/cam/components";
export const BusinessDetails = ({ business }) => {
  if (typeof business === "object") {
    return (
      <>
        <br />
        <tr className="page-break">
          <th></th>
        </tr>
        <tr>
          <th colSpan={9} className="form-heading">
            Business Details
          </th>
        </tr>
        {businessDetailsLabels?.map((res) => {
          return business[res?.name] ? (
            <tr>
              <th colSpan={2}>{res?.label ?? "N/A"}</th>
              <td colSpan={7}>
                {res?.componentType === "dateFormat" ? (
                  <DateFormat value={business[res?.name]} />
                ) : (
                  <Default value={business[res?.name]} />
                )}
              </td>
            </tr>
          ) : null;
        }) ?? "No data found"}
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

const businessDetailsLabels = [
  {
    label: "Brief history of the Company",
    name: "companyHistory",
    componentType: "default",
  },
  {
    label: "Existing Products / Services of the company",
    name: "companyService",
    componentType: "default",
  },
  {
    label: "End Use of the Products",
    name: "companyEndUseProducts",
    componentType: "default",
  },
  {
    label: "Name of Raw Materials",
    name: "companyMaterialsName",
    componentType: "default",
  },
  {
    label: "Name of Major Suppliers",
    name: "companySuppliersName",
    componentType: "default",
  },
  {
    label: "Payment Terms with Suppliers",
    name: "companyPaymentTermSuppliers",
    componentType: "default",
  },
  {
    label: "Name of Major Customers",
    name: "companyCustomersName",
    componentType: "default",
  },
  {
    label: "Payment terms with Customers",
    name: "companyPaymentTerm",
    componentType: "default",
  },
  {
    label: "Current Order Book Position",
    name: "companyOrderBookPosition",
    componentType: "default",
  },
  {
    label: "Marketing & Distribution Policy/Strategy",
    name: "companyPolicy",
    componentType: "default",
  },
  {
    label: "Name of Competitors",
    name: "companyCompetitors",
    componentType: "default",
  },
  {
    label: "Name of Major Countries where Exporting",
    name: "companyExportCountry",
    componentType: "default",
  },
  {
    label: "Domestic and export sales ratio",
    name: "companyExportRatio",
    componentType: "default",
  },
  {
    label: "No. of Employees",
    name: "companyEmployeeCount",
    componentType: "default",
  },
  {
    label: "Other Industry specific approvals / license",
    name: "companyLicence",
    componentType: "default",
  },
  {
    label: "Any awards / Recognition received",
    name: "companyAwards",
    componentType: "default",
  },
];
