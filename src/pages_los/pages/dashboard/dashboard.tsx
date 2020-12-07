import clsx from "clsx";

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
import { useStyles } from "./style";
import { WelcomeText1, WelcomeText2, CardTitle, CardValue } from "./variants";

// const data = [
//   {
//     title: "Inquiries",
//     value: "5000",
//     icon: LiveHelpIcon,
//     informationBlocks: [
//       { label: "pending", value: "1500",status:'confirmed' },
//       { label: "rejected", value: " 500", status:'pending' },
//       { label: "confirmed", value: "3000", status:'rejected' },
//     ],
//   },
//   {
//     title: 'All Leads',
//     value:
//   }
// ];

// const DashLet = (data,classes) => {

//   return (
//   <Grid item xs={12} sm={6} md={3} lg={3}>
//         <Card>
//           <CardContent className={classes.cardContent}>
//             <div className={classes.content}>
//               <div>
//                 <CardTitle variant="h3">{data.title}</CardTitle>
//                 <CardValue variant="h4">{data.value}</CardValue>
//               </div>
//               <div className={classes.icon}>
//                 <data.icon/>
//               </div>
//             </div>
//             <div className={classes.status}>
//               {data.informationBlocks.map(block) => {
//                 const currentClass = block.status === 'confirmed' ? classes.confirmed :
//                 block.status === 'pending' ? classes.pending:
//                 block.status === 'rejected' ? classes.rejected : ""
//                 <Typography
//                 variant="subtitle2"
//                 className={clsx(currentClass, classes.statusText)}
//               >
//                 <span className={confirmedUnit}>3000</span>
//                 Confirmed
//               </Typography>
//               }}

//             </div>
//           </CardContent>
//         </Card>
//       </Grid>
//   )
// }

export const Dashboard = () => {
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
              <div>
                <CardTitle variant="h3">All Leads</CardTitle>
                <CardValue variant="h4">3,000</CardValue>
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
              <div>
                <CardTitle variant="h3">BD Leads</CardTitle>
                <CardValue variant="h4">800</CardValue>
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
              <div>
                <CardTitle variant="h3">Retail Leads</CardTitle>
                <CardValue variant="h4">1,000</CardValue>
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
              <div>
                <CardTitle variant="h3">Unsecured Leads</CardTitle>
                <CardValue variant="h4">600</CardValue>
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
              <div>
                <CardTitle variant="h3">Insurance Leads</CardTitle>
                <CardValue variant="h4">400</CardValue>
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
              <div>
                <CardTitle variant="h3">Customers</CardTitle>
                <CardValue variant="h4">300</CardValue>
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
              <div>
                <CardTitle variant="h3">Partners</CardTitle>
                <CardValue variant="h4">100</CardValue>
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
};
