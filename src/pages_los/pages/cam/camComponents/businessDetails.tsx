export const BusinessDetails = () => {
  return (
    <>
      <tr>
        <th colSpan={9} className="form-heading">
          B. Business Details
        </th>
      </tr>
      {businessDetailsLabels.map((businessDetails) => {
        return (
          <tr>
            <th colSpan={2}>{businessDetails.label}</th>
            <td colSpan={7}>{businessDetails.value}</td>
          </tr>
        );
      })}
    </>
  );
};

const businessDetailsLabels = [
  { label: "Brief history of the Company", value: "Aayesha" },
  { label: "Existing Products / Services of the company", value: "AAAAA1111A" },
  { label: "End Use of the Products", value: "1111 1111 1111" },
  { label: "Name of Raw Materials", value: "Null" },
  { label: "Name of Major Suppliers", value: "25" },
  { label: "Payment Terms with Suppliers", value: "B.E" },
  { label: "Name of Major Customers", value: "5+ years" },
  { label: "Payment terms with Customers", value: "Acute" },
  {
    label: "Current Order Book Position ",
    value: "5%",
  },
  { label: "Marketing & Distribution Policy/Strategy", value: "26.55" },
  {
    label: "Name of Competitors",
    value: "Null",
  },
  { label: "Name of Major Countries where Exporting", value: "720" },
  {
    label: "Domestic and export sales ratio",
    value: "",
  },
  {
    label: "No. of Employees",
    value: "250+",
  },
  {
    label: "Other Industry specific approvals / license",
    value: "",
  },
  {
    label: "Any awards / Recognition received",
    value: "",
  },
];
