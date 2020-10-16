import React from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.75rem",
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    padding: "1rem 2rem",
    borderRadius: 4,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "#736f6f",
      fontWeight: "600",
      textTransform: "capitalize",
      fontSize: "1rem",
    },
    "& label.Mui-focused": {
      color: "#26A456",
    },
    "& .MuiInputBase-root": {
      border: "1px solid #BABABA",
      marginTop: "26px",
      borderRadius: 5,
      backgroundColor: "#fff",
      padding: "0 1rem",

      "& input": {
        padding: "6px 0 7px ",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #3f51b5",
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottom: "0",
    },
  },
})(TextField);

export default function Profile() {
  const classes = useStyles();

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h3" className={classes.title}>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <CssTextField
                label="First Name"
                placeholder="First Name"
                fullWidth
                required
                name="firstName"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CssTextField
                label="Middle Name"
                placeholder="Middle Name"
                fullWidth
                name="middleName"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CssTextField
                label="Last Name"
                placeholder="Last Name"
                fullWidth
                required
                name="lastName"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CssTextField
                label="password"
                required
                fullWidth
                name="password"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CssTextField
                select
                label="Select Channel Type"
                placeholder="Select Channel Type"
                fullWidth
                required
                name="channelType"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value={0}>--Select Channel Type--</MenuItem>
                <MenuItem value={1}>Ten</MenuItem>
                <MenuItem value={2}>Twenty</MenuItem>
                <MenuItem value={3}>Thirty</MenuItem>
              </CssTextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CssTextField
                label="Address"
                placeholder="Address"
                fullWidth
                required
                multiline
                rows={3}
                name="address"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
