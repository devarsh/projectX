export const BusinessDetails = ({ business }) => {
  return (
    <>
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
              <span className="content-text">
                {business[res?.name] ?? "N/A"}
              </span>
            </td>
          </tr>
        ) : null;
      }) ?? "No data found"}
    </>
  );
};

const businessDetailsLabels = [
  { label: "Brief history of the Company", name: "companyHistory" },
  {
    label: "Existing Products / Services of the company",
    name: "companyService",
  },
  { label: "End Use of the Products", name: "companyEndUseProducts" },
  { label: "Name of Raw Materials", name: "companyMaterialsName" },
  { label: "Name of Major Suppliers", name: "companySuppliersName" },
  {
    label: "Payment Terms with Suppliers",
    name: "companyPaymentTermSuppliers",
  },
  { label: "Name of Major Customers", name: "companyCustomersName" },
  { label: "Payment terms with Customers", name: "companyPaymentTerm" },
  {
    label: "Current Order Book Position ",
    name: "companyOrderBookPosition",
  },
  { label: "Marketing & Distribution Policy/Strategy", name: "companyPolicy" },
  {
    label: "Name of Competitors",
    name: "companyCompetitors",
  },
  {
    label: "Name of Major Countries where Exporting",
    name: "companyExportCountry",
  },
  {
    label: "Domestic and export sales ratio",
    name: "companyExportRatio",
  },
  {
    label: "No. of Employees",
    name: "companyEmployeeCount",
  },
  {
    label: "Other Industry specific approvals / license",
    name: "companyLicence",
  },
  {
    label: "Any awards / Recognition received",
    name: "companyAwards",
  },
];
