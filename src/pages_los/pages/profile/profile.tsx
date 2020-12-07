import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CP from "./changePassword";
import { TextField, InputAdornment } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import { useStyles } from "./style";

export const Profile = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-08-18T21:11:54")
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
        <Typography component="h3" className={classes.pageTitle}>
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
                InputProps={{
                  readOnly: true,
                }}
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
                InputProps={{
                  readOnly: true,
                }}
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
            <CP />
          </Dialog>
        </Box>
      </div>
    </Paper>
  );
};
