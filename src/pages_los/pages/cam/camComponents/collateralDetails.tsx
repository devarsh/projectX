export const CollateralDetails = () => {
  return (
    <>
      <tr>
        <th colSpan={9} className="form-heading">
          F.Collateral Details
        </th>
      </tr>
      {collateralDetailsLables.map((collateralDetails) => {
        return (
          <>
            <tr>
              <th colSpan={9}>{collateralDetails.title}</th>
            </tr>
            {collateralDetails?.subLabel?.map((label) => {
              return <th colSpan={2}>{label}</th>;
            })}
            {collateralDetails?.values?.map((values) => {
              return <td colSpan={2}>{values}</td>;
            })}
            <tr>
              <th style={{ textAlign: "end" }} colSpan={6}>
                {collateralDetails.label}
              </th>
              <td colSpan={2}>{collateralDetails.value}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};

const subLabel = [
  "Address of the Property ",
  "Area of the Property",
  "Owner",
  "Market Value (Rs. In Crore)",
];

const collateralDetailsLables = [
  { title: "PRIMARY SECURITY" },
  {
    subLabel: subLabel,
  },
  {
    values: [
      "B-204, Atlanta Tower, Gulbai Tekra",
      "3000 sq. feet",
      "N/A",
      "3.5 Crores",
    ],
  },
  { label: "Total", value: "3.5 crores" },
  { title: "COLLATERAL SECURITY" },
  {
    subLabel: subLabel,
  },
  {
    values: [
      "B-203, Atlanta Tower, Gulbai Tekra",
      "3001 sq. feet",
      "N/A",
      "4 Crores",
    ],
  },
  { label: "Total", value: "4 crores" },
  { label: "Collateral Coverage", value: "2.5 sq.feet" },
  { label: "FACR", value: "N/A" },
  { label: "ACR", value: "Null" },
  { title: "PERSONAL GUARANTE" },

  { subLabel: ["Name of Guarantor", "PAN No.", "Net Worth "] },
  { values: ["abc", "AAAAA1111A", "2.5"] },
];
