import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import loaderGif from "assets/images/loader.gif";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "./style";
import { APISDK } from "registry/fns/sdk";

//for labels
const formLabel = [
  { label: "Name", name: "customerName" },
  { label: "Date of Birth", name: "customerDOB" },
  { label: "Email", name: "customerEmail" },
  { label: "Mobile No", name: "customerMobileNo" },
  { label: "Address", name: "customerAddress" },
  { label: "Desired Loan Amount", name: "ustomerDesiredLoanAmount" },
  { label: "Health Check Score", name: "custpmerHealthCheckScore" }, //currently not coming from API
  { label: "Currently Employed", name: "currentlyEmployed" },
];

export const CustomerDetails = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerDetails, setCustomerDetails] = useState({});

  let refID = "1113";
  let inquiryType = "inquiry";

  useEffect(() => {
    setLoading(true);
    const fetcher = async () => {
      const result = await APISDK.getInquiryFormDisplayData(refID, inquiryType);
      try {
        if (result.status === "success") {
          setCustomerDetails({
            customerName:
              result.data.salutation +
              "" +
              result.data.firstName +
              " " +
              result.data.middleName +
              " " +
              result.data.lastName,
            customerDOB: result.data.dob,
            customerEmail: result.data.email,
            customerMobileNo: result.data.mobileNo,
            customerAddress:
              result.data.landmark +
              "," +
              result.data.location +
              "," +
              result.data.city +
              "," +
              result.data.pincode,
            ustomerDesiredLoanAmount: "₹" + result.data.loanAmount,
            currentlyEmployed: result.data.employementStatus,
          });
          setLoading(false);
        } else {
          setLoading(false);
          setError(result.data.error_msg);
        }
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetcher();
  }, []);

  const result = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : Boolean(error) ? (
    <span>"Error loading customer details"</span>
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
                  {customerDetails[res.name]}
                </TableCell>
              </TableRow>
            ) : null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return result;
};
