import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import GroupIcon from "@material-ui/icons/Group";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

import {
  ConstructionFinanceIcon,
  RetailHomeLoanIcon,
  HealthInsuranceIcon,
  LiabilityInsuranceIcon,
} from "assets/icons/productIcons";
import { theme } from "app/crm/theme";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 160,
  },
  fixedHeightChart: {
    height: 240,
  },
  cardTitle: {
    fontWeight: "600",
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
  },
  cardContent: {
    padding: theme.spacing(1.5),
    paddingBottom: [theme.spacing(1.5), "!important"],
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(0, 0, 1, 0),
  },
  icon: {
    color: theme.palette.primary.main,
    "& svg": {
      fontSize: "40px",
      height: "40px",
      fontWeight: "400",
    },
  },
  status: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    "& h6": {
      padding: theme.spacing(1),
    },
  },
  statusText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: "13px",
    [theme.breakpoints.down("md")]: {
      fontSize: "11px",
      padding: theme.spacing(0.5),
    },
  },
  pending: {
    color: "#f1c232",
  },
  rejected: {
    color: "#cc0000",
  },
  confirmed: {
    color: theme.palette.secondary.main,
  },
  pendingBg: {
    backgroundColor: "#f1c232",
  },
  rejectedBg: {
    backgroundColor: "#cc0000",
  },
  confirmedBg: {
    backgroundColor: theme.palette.secondary.main,
  },
  hot: {
    color: "#db3001",
  },
  warm: {
    color: "#f58f14",
  },
  cold: {
    color: "#68b6ca",
  },
  hotBg: {
    backgroundColor: "#db3001",
  },
  warmBg: {
    backgroundColor: "#f58f14",
  },
  coldBg: {
    backgroundColor: "#68b6ca",
  },
  unit: {
    fontSize: "10px",
    color: "#fff",
    padding: theme.spacing(0.5),
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2px auto 4px",
  },
}));

const WelcomeText1 = withStyles({
  root: {
    fontSize: "1.5rem",
    fontWeight: "600",
    lineHeight: "1.2",
    color: theme.palette.secondary.main,
    fontFamily: '"Montserrat", Helvetica, Arial, Lucida, sans-serif',
  },
})(Typography);
const WelcomeText2 = withStyles({
  root: {
    fontSize: "13px",
    fontWeight: "500",
    color: theme.palette.secondary.main,
  },
})(Typography);
const CardTitle = withStyles({
  root: {
    fontSize: "1.2rem",
    fontWeight: "500",
    color: theme.palette.primary.main,
  },
})(Typography);
const CardValue = withStyles({
  root: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: theme.palette.secondary.main,
  },
})(Typography);

export default function EmployeeDashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart);

  const pendingUnit = clsx(classes.unit, classes.pendingBg);
  const rejectedUnit = clsx(classes.unit, classes.rejectedBg);
  const confirmedUnit = clsx(classes.unit, classes.confirmedBg);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <WelcomeText1>Welcome Employee,</WelcomeText1>
          <WelcomeText2>This is your Ratnaafin account.</WelcomeText2>
        </Paper>
      </Grid>

      {/* <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaperChart}></Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaperChart}></Paper>
      </Grid> */}

      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.info}>
                <CardTitle variant="h3" component="h2">
                  Inquiries
                </CardTitle>
                <CardValue variant="h4" component="h2">
                  5,000
                </CardValue>
              </div>
              <div className={classes.icon}>
                <LiveHelpIcon />
              </div>
            </div>
            <div className={classes.status}>
              <Typography
                variant="subtitle2"
                className={clsx(classes.pending, classes.statusText)}
              >
                <span className={pendingUnit}>1500</span>
                <span>Pending</span>
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.rejected, classes.statusText)}
              >
                <span className={rejectedUnit}>500</span>
                Rejected
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.confirmed, classes.statusText)}
              >
                <span className={confirmedUnit}>3000</span>
                Confirmed
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.info}>
                <CardTitle variant="h3" component="h2">
                  All Leads
                </CardTitle>
                <CardValue variant="h4" component="h2">
                  3,000
                </CardValue>
              </div>
              <div className={classes.icon}>
                <DataUsageIcon />
              </div>
            </div>
            <div className={classes.status}>
              <Typography
                variant="subtitle2"
                className={clsx(classes.hot, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.hotBg)}>1500</span>
                <span>Hot</span>
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.warm, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.warmBg)}>500</span>
                Warm
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.cold, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.coldBg)}>1000</span>
                Cold
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.info}>
                <CardTitle variant="h3" component="h2">
                  BD Leads
                </CardTitle>
                <CardValue variant="h4" component="h2">
                  800
                </CardValue>
              </div>
              <div className={classes.icon}>{ConstructionFinanceIcon}</div>
            </div>
            <div className={classes.status}>
              <Typography
                variant="subtitle2"
                className={clsx(classes.hot, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.hotBg)}>500</span>
                <span>Hot</span>
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.warm, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.warmBg)}>200</span>
                Warm
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.cold, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.coldBg)}>100</span>
                Cold
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.info}>
                <CardTitle variant="h3" component="h2">
                  Retail Leads
                </CardTitle>
                <CardValue variant="h4" component="h2">
                  1,000
                </CardValue>
              </div>
              <div className={classes.icon}>{RetailHomeLoanIcon}</div>
            </div>
            <div className={classes.status}>
              <Typography
                variant="subtitle2"
                className={clsx(classes.hot, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.hotBg)}>500</span>
                <span>Hot</span>
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.warm, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.warmBg)}>300</span>
                Warm
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.cold, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.coldBg)}>200</span>
                Cold
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.info}>
                <CardTitle variant="h3" component="h2">
                  Unsecured Leads
                </CardTitle>
                <CardValue variant="h4" component="h2">
                  600
                </CardValue>
              </div>
              <div className={classes.icon}>{LiabilityInsuranceIcon}</div>
            </div>
            <div className={classes.status}>
              <Typography
                variant="subtitle2"
                className={clsx(classes.hot, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.hotBg)}>300</span>
                <span>Hot</span>
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.warm, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.warmBg)}>100</span>
                Warm
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.cold, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.coldBg)}>2000</span>
                Cold
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.info}>
                <CardTitle variant="h3" component="h2">
                  Insurance Leads
                </CardTitle>
                <CardValue variant="h4" component="h2">
                  400
                </CardValue>
              </div>
              <div className={classes.icon}>{HealthInsuranceIcon}</div>
            </div>
            <div className={classes.status}>
              <Typography
                variant="subtitle2"
                className={clsx(classes.hot, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.hotBg)}>100</span>
                <span>Hot</span>
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.warm, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.warmBg)}>200</span>
                Warm
              </Typography>
              <Typography
                variant="subtitle2"
                className={clsx(classes.cold, classes.statusText)}
              >
                <span className={clsx(classes.unit, classes.coldBg)}>100</span>
                Cold
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.info}>
                <CardTitle variant="h3" component="h2">
                  Customers
                </CardTitle>
                <CardValue variant="h4" component="h2">
                  300
                </CardValue>
              </div>
              <div className={classes.icon}>
                <GroupIcon />
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.content}>
              <div className={classes.info}>
                <CardTitle variant="h3" component="h2">
                  Partners
                </CardTitle>
                <CardValue variant="h4" component="h2">
                  100
                </CardValue>
              </div>
              <div className={classes.icon}>
                <GroupWorkIcon />
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
