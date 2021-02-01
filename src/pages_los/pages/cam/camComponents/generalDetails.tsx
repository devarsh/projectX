export const GeneralDetails = () => {
  return (
    <>
      <tr>
        <th className="form-heading" colSpan={9}>
          A. General Details
        </th>
      </tr>
      {generalDetailsLabels.map((generalDetails) => {
        return (
          <tr>
            <th colSpan={2}>{generalDetails.label}</th>
            <td colSpan={7}>{generalDetails.value}</td>
          </tr>
        );
      })}
      <BankingArrangementsDetails />
      <LoanAmountDetails />
      <GeneralDetailsPartTwo />
    </>
  );
};

const generalDetailsLabels = [
  { label: "Name of the Unit:", value: "Aayesha" },
  { label: "Constitution of Business:", value: "AAAAA1111A" },
  { label: "Registered Address:", value: "1111 1111 1111" },
  { label: "Works Address:", value: "Null" },
  { label: "Ownership of Factory / Business Premises", value: "25" },
  { label: "Date of incorporation:", value: "B.E" },
  { label: "Existing Type of Industry:", value: "5+ years" },
  { label: "Nature of Existing Business:", value: "Acute" },
  {
    label: "Proposed business:",
    value: "5%",
  },
  { label: "External credit rating:", value: "26.55" },
  {
    label: "MSME",
    value: "Null",
  },
  { label: "PAN No:", value: "720" },
  {
    label: "Udhyam No:",
    value: "Null",
  },
  {
    label: "CMR Ranking :",
    value: "Null",
  },
  {
    label: "RF Rating :",
    value: "Null",
  },
  {
    label: "Name of Promoters / Directors",
    value: "Null",
  },
];

export const BankingArrangementsDetails = () => {
  return (
    <>
      <tr>
        <th className="form-heading" colSpan={9}>
          Banking Arrangements
        </th>
      </tr>
      <tr>
        {bankingArrangementsLabel?.label?.map((bankingArrangementsSubLabel) => {
          return <th colSpan={2}>{bankingArrangementsSubLabel}</th>;
        })}
      </tr>
      <tr>
        {bankingArrangementsLabel?.value?.map(
          (bankingArrangementsSubValues) => {
            return <td colSpan={2}>{bankingArrangementsSubValues}</td>;
          }
        )}
      </tr>
    </>
  );
};

const bankingArrangementsLabel = {
  label: ["Name of Bank", "Branch", "Current A/C No", "Average Bank Balance "],
  value: ["Axis Bank", "Shivrnjani", "12345678912456", "100.00"],
};

export const LoanAmountDetails = () => {
  return (
    <>
      <tr>
        <th className="form-heading" colSpan={9}>
          Loan amount (Rs.)
        </th>
      </tr>
      {loanAmountLabels?.map((loanAmount) => {
        return (
          <>
            <tr>
              <th colSpan={9} className="form-heading">
                {loanAmount.title}
              </th>
            </tr>
            <tr>
              {loanAmount.subLabels?.map((bankingArrangementsSubLabels) => {
                return <th colSpan={2}>{bankingArrangementsSubLabels}</th>;
              })}
            </tr>
            <tr>
              {loanAmount.subValues?.map((bankingArrangementsSubValues) => {
                return <td colSpan={2}>{bankingArrangementsSubValues}</td>;
              })}
            </tr>
            <tr>
              <th style={{ textAlign: "end" }} colSpan={6}>
                {loanAmount.label}
              </th>
              <td>{loanAmount.value}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};

const loanAmountLabels = [
  { title: "Present:" },
  {
    subLabels: [
      "Nature of Facility",
      "Name of Bank",
      "O/s Amount as on",
      "Rate of Interest",
    ],
  },
  {
    subValues: ["Nature", "BOI", "500.00", "2%"],
  },
  { label: "Total", value: "5665" },
  { title: "Proposed:" },
  {
    subLabels: [
      "Nature of Facility",
      "New / Takeover",
      "Requested ROI",
      "Amount",
    ],
  },
  {
    subValues: ["Nature", "2000", "500", "100.00"],
  },
  { label: "Total", value: "5665" },
];

export const GeneralDetailsPartTwo = () => {
  return (
    <>
      {generalDetailsPartTwoLabels?.map((generalDetails) => {
        return (
          <>
            <tr>
              <th colSpan={9}></th>
            </tr>
            <tr>
              <th colSpan={2}>{generalDetails.label}</th>
              <td colSpan={7}>{generalDetails.value}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};

const generalDetailsPartTwoLabels = [
  { label: "Purpose of loan:", value: "Aayesha" },
  { label: "Turnover in current financial year", value: "AAAAA1111A" },
  {
    label:
      "Last 12 Months average Bank Balance & Average Utilisation  of Working Capital Limits",
    value: "1111 1111 1111",
  },
  { label: "Credit Summation in Bank in Last 12 months", value: "Null" },
  {
    label: "Inward cheque bounces, if any and % of total Cheque bounce",
    value: "25",
  },
];
