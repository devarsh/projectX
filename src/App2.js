import React from "react";
import {
  InputLabel,
  FormControl,
  FormLabel,
  TextField,
  Button,
  Select,
  Menu,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  TextareaAutosize,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#26A456",
    },
    secondary: {
      main: "#736f6f",
    },
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      text: {
        background:
          "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
        borderRadius: 4,
        border: 0,
        color: "white",
        height: 40,
        padding: ".5rem .75rem",
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
    },

    root: {
      text: {
        "&.MuiToggleButtonGroup-groupedHorizontal": {
          borderColor: "#8C8C8C",
          transition: "border 0.3s ease-in",
          borderRadius: "8px",
          color: "red",
          backgroundColor: "red",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background:
      "linear-gradient(0deg, rgba(94,231,131,1) 0%, rgba(70,199,165,1) 44%, rgba(33,150,218,1) 100%)",
    minHeight: "100vh",
  },
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
  label: {
    color: "#736f6f",
    fontWeight: "600",
    textTransform: "capitalize",
    fontSize: "1rem",
    marginBottom: "0.5 rem",
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
      marginBottom: "0.5 rem",
    },

    "& label.Mui-focused": {
      color: "#26A456",
    },
    "& .MuiInputBase-root": {
      border: "1px solid #BABABA",
      marginTop: "26px",
      borderRadius: 5,
      backgroundColor: "#fff",
      padding: "0 0 0 1rem",

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
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px) scale(1)",
    },

    "& .MuiToggleButton": {
      borderColor: "#8C8C8C",
      transition: "border 0.3s ease-in",
      borderRadius: "8px",
      color: "red",
      backgroundColor: "red",
      height: "400px !imortant",
    },
  },
})(TextField);

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderColor: "#8C8C8C",
    transition: "border 0.3s ease-in",
    borderRadius: "8px",
    textTransform: "capitalize",
    color: "#727272",
    fontWeight: "700",
    padding: "4px 10px",
    "&:not(:first-child)": {
      borderRadius: "8px",
      borderLeft: "1px solid #8C8C8C",
    },
    "&:first-child": {
      borderRadius: "8px",
    },
    "&.Mui-selected": {
      border: "1px solid #57D3C3",
      background:
        "linear-gradient(0deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 10%, rgba(33,150,218,1) 100%)",
      color: "white",
    },
    "& label": {
      color: "#736f6f",
      fontWeight: "600",
      textTransform: "capitalize",
      fontSize: "1rem",
      marginBottom: "0.5 rem",
    },
    "& .MuiSvgIcon-root": {
      maxHeight: "20px",
    },
  },
}))(ToggleButtonGroup);

function getSteps() {
  return ["Personal Details", "Contact Details"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Personal Details";
    case 1:
      return "Contact Details";
    default:
      return "Unknown stepIndex";
  }
}

export default function Profile() {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(true);

  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [state, setState] = React.useState({
    checkedG: true,
  });
  const GreenCheckbox = withStyles({
    root: {
      color: "#0063A3",
      "&$checked": {
        color: "#26A456",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box width={1} display="flex" className={classes.wrapper}>
        <Container component="main">
          <div className={classes.paper}>
            <Typography component="h3" className={classes.title}>
              Sign up
            </Typography>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="label" className={classes.label}>
                      Partner Type
                    </FormLabel>
                    <StyledToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      label="Partner Type"
                      type="radio"
                    >
                      <ToggleButton
                        name="partner"
                        value="I"
                        aria-label="Individual"
                      >
                        <PersonIcon />
                        <span>Individual</span>
                      </ToggleButton>
                      <ToggleButton
                        name="partner"
                        value="C"
                        aria-label="Corporate"
                      >
                        <BusinessIcon />
                        <span>Corporate</span>
                      </ToggleButton>
                    </StyledToggleButtonGroup>
                  </FormControl>
                </Grid>

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
                <Grid item xs={12} sm={6} md={4}>
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        checked={state.checkedG}
                        onChange={handleChange}
                        name="checkedG"
                      />
                    }
                    label="I agree with the Terms and Conditions. "
                  />
                </Grid>
              </Grid>

              <Box width={1} display="flex" justifyContent="flex-end">
                <Button type="submit" className={classes.submit}>
                  Next
                </Button>
              </Box>
            </form>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
