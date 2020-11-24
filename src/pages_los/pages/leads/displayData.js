import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import { APISDK } from "registry/fns/sdk";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  fixedHeight: {
    height: 240,
  },

  formLabel: {
    fontWeight: "600",
  },
  formValue: {
    fontWeight: "500",
    color: "#0063A3",
  },
  marginSet: {
    margin: theme.spacing(3, 0),
  },

  DialogTitle: {
    color: "#0063A3",
    borderBottom: "1px solid #ddd",
  },
  DetailsTitle: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.2rem",
    fontWeight: "700",
    alignSelf: "flex-start",
    margin: "0",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.2rem",
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    border: 0,
    color: "#fff !important",
    padding: "4px .75rem",
    fontWeight: "700",
    minWidth: "120px",
    letterSpacing: "0.02857em",
    boxShadow: "none",
    textTransform: "capitalize",
    borderRadius: "24px",
    alignSelf: "flex-end",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
      boxShadow: "none",
    },
  },
  backBtn: {
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    background: "#e0e0e0",
    color: "#0b6fb8 !important",
    margin: theme.spacing(3, 2, 2),
    fontSize: "1.2rem",
    borderRadius: "24px",
    fontWeight: "700",
    minWidth: "120px",
    letterSpacing: "0.02857em",
    padding: "4px .75rem",
    textTransform: "capitalize",
    "&:hover": {
      color: "#0b6fb8 !important",
      background: "#e0e0e0",
      boxShadow:
        "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
  },
}));

export const DisplayData = ({ onClose, open, row }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [InquiryDetailsData, setInquiryDetailsData] = useState([]);

  let inquiryCode = row;
  //   console.log("inquiryCode", inquiryCode);

  useEffect(() => {
    const fetcher = async () => {
      // debugger;
      const result = await APISDK.getDashdoardDisplayEmpDetails(inquiryCode);
      // console.log("result", result.data);
      try {
        if (result.status === "success") {
          let editableData = result.data;
          setInquiryDetailsData(editableData);
          // console.log("InquiryDetailsData", InquiryDetailsData);
        }
      } catch (e) {
        console.log("in catch");
      }
    };
    fetcher();
  });

  return (
    <div>
      {InquiryDetailsData.map((edit) => {
        return (
          <Dialog
            fullScreen={fullScreen}
            maxWidth="md"
            open={open}
            onClose={onClose}
            aria-labelledby="Details"
          >
            <DialogTitle id="Details" className={classes.DialogTitle}>
              Convert to Lead
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h3 className={classes.DetailsTitle}>
                      Retail LAP (Loan Against Property)
                    </h3>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Product Type:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.product_type}
                          {/* Commercial Property Purchase */}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Cutomer Name:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.customer_name}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Gender:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.gender}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Date of Birth:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.birth_dt}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Desired Loan Amount:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          &#x20B9; {edit.desired_loan_amt}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Email:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.email_id}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Mobile No:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.mobile_no}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Currently Employed:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.employeed_type}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Address:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.address}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          Health Check Score:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {edit.health_score}
                          {/* <small>Good</small> */}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <hr className={classes.marginSet}></hr>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      select
                      label="Lead Status"
                      placeholder="Change Status"
                      fullWidth
                      required
                      name="leadtatus"
                      autoComplete="off"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value="1"
                      display={true}
                    >
                      {/* <MenuItem value={1}>{edit.inquiry_status}</MenuItem> */}
                      <MenuItem value={1}>Pending</MenuItem>
                      <MenuItem value={2}>Rejected</MenuItem>
                      <MenuItem value={3}>Confirmed</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      select
                      label="Lead Assign to Employee"
                      placeholder="Select Employee"
                      fullWidth
                      required
                      name="leadtatus"
                      autoComplete="off"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value="1"
                    >
                      <MenuItem value={0}>Select Employee</MenuItem>
                      <MenuItem value={1}>Employee 1</MenuItem>
                      <MenuItem value={2}>Employee 2</MenuItem>
                      <MenuItem value={3}>Employee 3</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions className="mb-30">
              <Button
                autoFocus
                onClick={onClose}
                color="primary"
                className={classes.backBtn}
              >
                Cancel
              </Button>
              <Button
                onClick={onClose}
                color="primary"
                autoFocus
                className={classes.submit}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        );
      })}
    </div>
  );
};
