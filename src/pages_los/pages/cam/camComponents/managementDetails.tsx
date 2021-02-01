export const ManagementDetails = () => {
  return (
    <>
      <tr>
        <th colSpan={9} className="form-heading">
          C. Management Details
        </th>
      </tr>
      {managementDetailsLabels.map((managmntDetails, i) => {
        return (
          <>
            <tr>
              <th colSpan={2}>{managmntDetails.label}</th>
              <td colSpan={6}>{managmntDetails.value}</td>
            </tr>
            <tr>
              {managmntDetails?.subLabel?.map((managmntDetailsSubLabel) => {
                return <th colSpan={2}>{managmntDetailsSubLabel}</th>;
              })}
            </tr>
            <tr>
              {managmntDetails?.subValues?.map((managmntDetailsSubValues) => {
                return <td colSpan={2}>{managmntDetailsSubValues}</td>;
              })}
            </tr>
          </>
        );
      })}
    </>
  );
};

const managementDetailsLabels = [
  { label: "Name of the Partner/Director", value: "Aayesha" },
  { label: "PAN No.", value: "AAAAA1111A" },
  { label: "Aadhar No.", value: "1111 1111 1111" },
  { label: "DIN / LLPIN No.", value: "Null" },
  { label: "Age", value: "25" },
  { label: "Educational Qualification", value: "B.E" },
  { label: "Experience", value: "5+ years" },
  { label: "Associate Companies", value: "Acute" },
  {
    label: "Profit Sharing / Shareholding %",
    value: "5%",
  },
  { label: "Networth", value: "26.55" },
  {
    label: "Resposnibilities Handled in the Comapany",
    value: "Null",
  },
  { label: "Credit Score", value: "720" },
  {
    label: "Last three years Income Summary",
  },
  {
    subLabel: ["FY __1", "FY __2", "FY __3", "FY __4"],
  },
  {
    subValues: ["2016-2017", "2017-2018", "2018-2019", "2019-2020"],
  },
];
