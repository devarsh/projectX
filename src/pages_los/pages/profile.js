import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import { TextField, InputAdornment } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  PageTitle: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.75rem",
    fontWeight: "700",
    alignSelf: "flex-start",
    marginBottom: "20px",
  },

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
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

export default function EmployeeProfile() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [openD, setOpenD] = React.useState(false);

  const handleClickOpen = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  return (
    <Paper className={classes.paper}>
      <div className={classes.paper}>
        <Typography component="h3" className={classes.PageTitle}>
          Profile
        </Typography>

        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="User Name"
                placeholder="User Name"
                fullWidth
                required
                name="firstName"
                value="uname"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="First Name"
                placeholder="First Name"
                fullWidth
                required
                name="firstName"
                value="First Name"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Middle Name"
                placeholder="Middle Name"
                fullWidth
                name="middleName"
                value="Middle Name"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Last Name"
                placeholder="Last Name"
                fullWidth
                required
                name="lastName"
                value="Last Name"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  id="date-picker-dialog"
                  label="Date of Birth"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Mobile Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 10,
                }}
                placeholder="Enter mobile number to get OTP"
                fullWidth
                className="mobileNumber"
                type="number"
                name="phoneNumber"
                value="9898989898"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                placeholder="Email"
                fullWidth
                name="email"
                InputLabelProps={{
                  shrink: true,
                }}
                value="abc@abc.com"
                autoComplete="off"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Address"
                placeholder="Address"
                fullWidth
                required
                multiline
                rows={3}
                name="address"
                value="Address1 Address2"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Branch"
                placeholder="Branch"
                fullWidth
                required
                name="branch"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
                value="2"
              >
                <MenuItem value={0}>Select Branch</MenuItem>
                <MenuItem value={1}>Ahmedabad</MenuItem>
                <MenuItem value={2}>Surat</MenuItem>
                <MenuItem value={3}>Rajkot</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Designation"
                placeholder="Designation"
                fullWidth
                required
                name="designation"
                value="BDM"
                readonly="true"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Department"
                placeholder="Department"
                fullWidth
                required
                name="department"
                value="Business_Development"
                readonly="true"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Box width={1} display="flex" justifyContent="flex-end">
            <Button type="submit" className={classes.submit + " btn1 minW"}>
              Update
            </Button>
          </Box>
        </form>
        <Box width={1} display="flex" justifyContent="flex-start">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
            className="linkBtn"
          >
            Change Password
          </Button>
          <Dialog
            open={openD}
            onClose={handleCloseD}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Password must be 8-16 characters and include both numbers and
                letters.
              </DialogContentText>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label="Current Password"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    placeholder="Current Password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label="New Password"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    placeholder="New Password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label="Confirm Password"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    placeholder="Confirm Password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="mb-30">
              <Button
                onClick={handleCloseD}
                color="primary"
                className={classes.backBtn}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCloseD}
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </Paper>
  );
}
