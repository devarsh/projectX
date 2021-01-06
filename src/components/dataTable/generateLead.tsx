import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { APISDK } from "registry/fns/sdk";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";

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
    fontWeight: 600,
  },
  formValue: {
    fontWeight: 500,
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
    fontWeight: 700,
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
    fontWeight: 700,
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
    fontWeight: 700,
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
  const [temp, setTemp] = useState({});
  const [assignemployeeList, setAssignEmployeeList] = useState<any[]>([]);
  const [employeevalue, setEmployeeValue] = useState("");

  let refID = row;

  const data = [
    {
      label: "Product Type",
      type: "text",
      name: "productType",
    },
    {
      label: "Cutomer Name",
      type: "text",
      name: "name",
    },
    {
      label: "Gender",
      type: "text",
      name: "gender",
    },
    {
      label: "Date of Birth",
      type: "text",
      name: "birth_dt",
    },
    {
      label: "Desired Loan Amount",
      type: "text",
      name: "desired_loan_amt",
    },
    {
      label: "Email",
      type: "text",
      name: "email",
    },
    {
      label: "Mobile No",
      type: "text",
      name: "phoneNumber",
    },
    {
      label: "Currently Employed",
      type: "text",
      name: "employementStatus",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
    },
    {
      label: "Lead Status",
      type: "text",
      name: "inquiry_status",
    },
  ];

  useEffect(() => {
    const fetcher = async () => {
      const result = await APISDK.getInquiryDataToConvertIntoLead(refID);
      try {
        if (result.status === "success") {
          let editableData = result.data;
          setTemp({
            productType: editableData.productID,
            name:
              editableData.firstName +
              " " +
              editableData.middleName +
              " " +
              editableData.lastName,
            gender: editableData.gender,
            birth_dt: editableData.dob,
            desired_loan_amt: editableData.loanAmount,
            email: editableData.email,
            phoneNumber: editableData.mobileNo,
            employementStatus: editableData.employementStatus,
            address: editableData.location,
            inquiry_status: editableData.status,
          });
        }
      } catch (e) {
        console.log("in catch");
      }
    };
    fetcher();
    getLeadAssignEmployeeList();
  }, []);

  const getLeadAssignEmployeeList = async () => {
    const result = await APISDK.getTeamLeaList();
    let employeeList = [] as any;
    for (let i = 0; i < result.data.length; i++) {
      employeeList.push({
        label: result.data[i].fullname,
        value: result.data[i].empID,
      });
    }
    setAssignEmployeeList(employeeList);
  };

  return (
    <div>
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
              {data.map((res) => {
                return temp[res.name] ? (
                  <Grid item xs={12} sm={6} md={6}>
                    <Paper className={classes.paper}>
                      <Box display="flex" flexDirection="row">
                        <Box width="40%" className={classes.formLabel}>
                          {res.label}:
                        </Box>
                        <Box width="60%" className={classes.formValue}>
                          {temp[res.name]}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ) : null;
              })}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    select
                    label="Lead Assign to Employee"
                    placeholder="Select Employee"
                    fullWidth
                    required
                    name="leadtatus"
                    autoComplete="off"
                    onChange={(e) => setEmployeeValue(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={employeevalue}
                  >
                    <MenuItem value={0}>Select Employee</MenuItem>
                    {assignemployeeList.map((data) => {
                      return (
                        <MenuItem value={data.value}>{data.label}</MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
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
            // onClick={onClose}
            color="primary"
            autoFocus
            className={classes.submit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
