export const FinancialRatios = () => {
  return (
    <>
      <tr>
        <th colSpan={9} className="form-heading">
          D.Financial Ratios
        </th>
      </tr>
      <tr>
        <th colSpan={2}>Particulars</th>
        <th colSpan={2}>FY __</th>
        <th colSpan={2}>FY Previous to latets Financial Year</th>
        <th colSpan={2}>FY Latest Financial Year</th>
      </tr>
      {financialRatiosLabel.map((financialRatioLable) => {
        return (
          <>
            <tr>
              {financialRatioLable.title ? (
                <th colSpan={2}>{financialRatioLable?.title}</th>
              ) : (
                <td colSpan={2}>{financialRatioLable?.label}</td>
              )}
              {financialRatioLable?.values?.map((financialRatioValues) => {
                return <td colSpan={2}>{financialRatioValues}</td>;
              })}
            </tr>
          </>
        );
      })}
    </>
  );
};

const financialRatiosLabel = [
  { title: "PROFIT & LOSS DETAILS", values: ["ABC", "def", "ghi"] },
  { label: "Revenue", values: ["ABC", "def", "ghi"] },
  { title: "EBITDA", values: ["ABC", "def", "ghi"] },
  { label: "Depreciation", values: ["ABC", "def", "ghi"] },
  { label: "Interest Expenses", values: ["ABC", "def", "ghi"] },
  { title: "EBIT", values: ["ABC", "def", "ghi"] },
  { label: "Tax", values: ["ABC", "def", "ghi"] },
  { title: "PAT", values: ["ABC", "def", "ghi"] },
  { title: "Cash Profit", values: ["ABC", "def", "ghi"] },
  { label: "EBITDA (%)", values: ["ABC", "def", "ghi"] },
  { label: "EBT (%)", values: ["ABC", "def", "ghi"] },
  { label: "PAT (%)", values: ["ABC", "def", "ghi"] },
  { label: "Cash Profit (%)", values: ["ABC", "def", "ghi"] },
  { label: "Directors / Partners Remuneration", values: ["ABC", "def", "ghi"] },
  { label: "Interest on Capital", values: ["ABC", "def", "ghi"] },
  { title: "Adjusted PAT", values: ["ABC", "def", "ghi"] },
  { title: "Adjusted Cash Profit", values: ["ABC", "def", "ghi"] },
  { label: "Adjusted PAT (%)", values: ["ABC", "def", "ghi"] },
  { label: "Adjusted Cash Profit (%)", values: ["ABC", "def", "ghi"] },
  { label: "DSCR", values: ["ABC", "def", "ghi"] },
  { title: "BALANCE SHEET DETAILS" },
  { label: "Share Capital", values: ["ABC", "def", "ghi"] },
  { label: "Net Worth (Quasi)", values: ["ABC", "def", "ghi"] },
  { label: "Long Term Debt Fund", values: ["ABC", "def", "ghi"] },
  { label: "Short Term Debt Fund", values: ["ABC", "def", "ghi"] },
  { title: "Long Term Debt / Equity", values: ["ABC", "def", "ghi"] },
  { title: "TOL / TNW", values: ["ABC", "def", "ghi"] },
  { label: "Current Assets", values: ["ABC", "def", "ghi"] },
  { label: "Current Liabilities", values: ["ABC", "def", "ghi"] },
  { title: "Current Ratio", values: ["ABC", "def", "ghi"] },
  { title: "Operating cycle days", values: ["ABC", "def", "ghi"] },
];
