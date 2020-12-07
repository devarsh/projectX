import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStyles } from "./style";

export default function ChangePassword() {
  const classes = useStyles();

  const [openD, setOpenD] = React.useState(false);

  const handleCloseD = () => {
    setOpenD(false);
  };
  return (
    <>
      <DialogTitle id="form-dialog-title">
        Change Password fsdfdsffs
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Password must be 8-16 characters and include both numbers and letters.
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
    </>
  );
}
