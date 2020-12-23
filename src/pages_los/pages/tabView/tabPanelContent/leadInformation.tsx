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
  createData("Lead No.", 123890),
  createData("Product", "Retail LAP : Commercial Property Purchase"),
  createData("Genertaed On", "21-11-2020"),
  createData("Health Check Score", "76% (Good)"),
  createData("Current Status", "Pending"),
  createData("Current Priority", "Warm"),
];

export const LeadInformation = () => {
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
