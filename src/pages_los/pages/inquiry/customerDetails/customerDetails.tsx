import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import loaderGif from "assets/images/loader.gif";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "./style";
import { LOSSDK } from "registry/fns/los";
import { useQuery } from "react-query";

export const CustomerDetails = ({ refID, moduleType, productType }) => {
  const classes = useStyles();

  const result = useQuery(
    ["getViewData", productType, refID],
    () => LOSSDK.getFormData({ moduleType, productType, refID }),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  //@ts-ignore
  let customerDetails = {};
  if (result.isSuccess) {
    customerDetails = transformCustomerData(result.data);
  }

  const renderResult = result.isLoading ? (
    <img src={loaderGif} alt="loader" />
  ) : result.isError ? (
    //@ts-ignore
    <span>{result.error?.error_msg ?? "unnknown error occured"}</span>
  ) : (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="lead table">
        <TableBody>
          {formLabel.map((res) => {
            return customerDetails[res.name] ? (
              <TableRow key={res.label}>
                <TableCell component="th" className={classes.th}>
                  {res.label}:
                </TableCell>
                <TableCell component="td" align="left" className={classes.td}>
                  {customerDetails[res.name] ?? "N/A"}
                </TableCell>
              </TableRow>
            ) : null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return renderResult;
};

const transformCustomerData = (customerData: any) => {
  if (typeof customerData === "object") {
    return {
      name: [
        customerData?.salutation ?? "",
        customerData.firstName ?? "",
        customerData?.middleName ?? "",
        customerData.lastName ?? "",
      ].join(" "),
      dob: customerData?.dob,
      email: customerData?.email,
      mobileNo: customerData?.mobileNo,
      address: [
        customerData?.landmark ?? "",
        customerData?.location ?? "",
        customerData?.city ?? "",
        customerData?.pincode ?? "",
      ].join(""),

      desiredLoanAmount: new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
        style: "currency",
        currency: "INR",
      }).format(Number(customerData.loanAmount)),
      employementStatus: customerData.employementStatus,
    };
  } else {
    return {};
  }
};

const formLabel = [
  { label: "Name", name: "name" },
  { label: "Date of Birth", name: "dob" },
  { label: "Email", name: "email" },
  { label: "Mobile No", name: "mobileNo" },
  { label: "Address", name: "address" },
  { label: "Desired Loan Amount", name: "desiredLoanAmount" },
  { label: "Health Check Score", name: "healthCheckScore" }, //currently not coming from API
  { label: "Currently Employed", name: "employementStatus" },
];
