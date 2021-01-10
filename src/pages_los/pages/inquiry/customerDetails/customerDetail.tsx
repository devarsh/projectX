import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import loaderGif from "assets/images/loader.gif";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "./style";
import { APISDK } from "registry/fns/sdk";
import { useQuery } from "react-query";

export const CustomerDetails = ({ inquiryID, inquiryType }) => {
  const classes = useStyles();

  const result = useQuery(
    ["viewFormData", inquiryType, inquiryID],
    () => APISDK.getInquiryFormDisplayData(inquiryID, inquiryType),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? ""}`;
  let error = result.isError;
  let customerDetails = {};
  if (result.isLoading === false && error === false) {
    customerDetails = transformCustomerData(result.data);
    if (Object.keys(customerDetails).length <= 0) {
      error = true;
      errorMsg = "Error loading customer Information";
    }
  }

  const renderResult = result.isLoading ? (
    <img src={loaderGif} alt="loader" />
  ) : error ? (
    <span>{errorMsg}</span>
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
