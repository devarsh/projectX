import { useState, FC } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

export interface TabFormPreviewProps {
  isOpen: boolean;
  setShowDialog: Function;
  submitProps: any;
}

export const TabFormPreview: FC<TabFormPreviewProps> = ({
  isOpen,
  setShowDialog,
  submitProps,
}) => {
  const [temp, setTemp] = useState({});
  const { values, submitEnd } = submitProps;
  if (typeof submitEnd !== "function" && typeof values !== "object") {
    return null;
  }

  const data = [
    {
      label: "Office Address",
      type: "text",
      name: "addOffice",
    },
    {
      label: "Date of Incorporation",
      type: "text",
      name: "inception_date",
    },
    {
      label: "Proposed Business",
      type: "text",
      name: "proposedBusiness",
    },
    {
      label: "External Credit Rating",
      type: "text",
      name: "externalCreditRating",
    },
    {
      label: "Desired Loan Amount",
      type: "text",
      name: "desired_loan_amt",
    },
    {
      label: "MSME",
      type: "text",
      name: "msme",
    },
    {
      label: "Udhyog Aadhar No:",
      type: "text",
      name: "udhyogAadharNumber",
    },
    {
      label: "Name of Promoters / Directors",
      type: "text",
      name: "promotersDirectorsName",
    },
    {
      label: "Loan amount (Rs.)",
      type: "text",
      name: "loanAmount",
    },
    {
      label: "Loan details",
      type: "text",
      name: "loanDetails",
    },
    {
      label: "Nature of Facility",
      type: "text",
      name: "natureOfFacilityforPresentProposed",
    },
    {
      label: "Name of Bank ",
      type: "text",
      name: "bankName",
    },
    {
      label: "O/s Amount as on",
      type: "text",
      name: "outstandingAmount",
    },
    {
      label: "Rate of Interest",
      type: "text",
      name: "rateOfInterest",
    },
    {
      label: "New / Takeover",
      type: "text",
      name: "newTakeover",
    },
    {
      label: "Requested ROI",
      type: "text",
      name: "requestedROI",
    },
    {
      label: "Amount",
      type: "text",
      name: "proposedAmount",
    },
    {
      label: "Comments",
      type: "text",
      name: "presentProposedLoancomments",
    },
    {
      label: "Purpose of Loan",
      type: "text",
      name: "loanPurpose",
    },
    {
      label: "Inward cheque bounces,if any and % of total Cheque bounce",
      type: "text",
      name: "chequeBounce",
    },
  ];

  setTemp({});
  console.log("tab demo values", values);
  return (
    <Dialog id="otp-dialog" open={isOpen} aria-labelledby="form-otp-dialog">
      <DialogTitle id="form-dialog-title">Verify OTP</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please confirm the details which you have entered in the form.
        </DialogContentText>
        <Grid container spacing={2}>
          {data.map((res) => {
            return temp[res.name] ? (
              <Grid item xs={12} sm={6} md={6}>
                <Paper>
                  <Box display="flex" flexDirection="row">
                    <Box width="40%">{res.label}:</Box>
                    <Box width="60%">{temp[res.name]}</Box>
                  </Box>
                </Paper>
              </Grid>
            ) : null;
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={(e) => setShowDialog(false)}>
          Cancel
        </Button>
        <Button color="primary">Verify</Button>
      </DialogActions>
    </Dialog>
  );
};
