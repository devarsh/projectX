import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import { useStyles } from "./style";

function createData(label: string, value: any) {
  return {
    label,
    value,
  };
}

const rows = [
  createData("Name", "Mr. Firstname Middlename Lastname"),
  createData("Date of Birth", "12-12-1980"),
  createData("Email", "email@gmail.com"),
  createData("Mobile No", "+91 9898989898"),
  createData("Address", "K-701, Abcd, Address"),
  createData("Desired Loan Amount", <>&#x20B9; 1,00,00,000</>),
  createData("Health Check Score", "76% (Good)"),
  createData("Currently Employed", "Self Employed Professional"),
];

export const CustomerInformation = () => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="lead table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell component="th" className={classes.th}>
                {row.label}
              </TableCell>
              <TableCell component="td" align="left" className={classes.td}>
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
