import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigationFlow } from "../utils/navHelpers";
import { useStyles } from "./style";
import ReactSpeedometer from "react-d3-speedometer";
import { useEffect, useState } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";
import Alert from "@material-ui/lab/Alert";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const Equifax = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [equifaxScore, setEquifaxScore] = useState(0);
  const [error, setError] = useState("");
  const [retailAccountsDetails, setRetailAccountsDetails] = useState<any[]>([]);

  const [
    flowExist,
    // refID,
    nextURL,
    nextFlowNavigationProps,
  ] = useNavigationFlow(location, "/thankyou");
  let refID = "0"; // for successfull response and to test error use 1044

  useEffect(() => {
    setLoading(true);
    const getEquifaxDetails = async () => {
      try {
        const result = await APISDK.getHealthCheckScore(refID);
        if (result.status === "success") {
          setLoading(false);
          let resultData = result?.data?.CIRReportDataLst[0] ?? "N/A";
          if (resultData?.Error) {
            setError(resultData.Error.ErrorDesc);
          } else {
            let retailAccDtls = resultData.CIRReportData.RetailAccountDetails;
            let score = resultData.CIRReportData.ScoreDetails[0].Value;
            let renderRetailAccDetails = retailAccDtls.map((data) => {
              return (
                <Grid item sm={4}>
                  <LoansDetailsDisplay data={data} />
                </Grid>
              );
            });
            setEquifaxScore(score);
            setRetailAccountsDetails(renderRetailAccDetails);
          }
        } else {
          setLoading(false);
          setError(result?.data?.error_msg ?? "No data found");
        }
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    getEquifaxDetails();
  }, []);

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : error ? (
    <Alert severity={"error"}>{error}</Alert>
  ) : (
    <>
      <h3 className="theme-color2">
        <b>Your Current EQUIFAX Score is</b>
      </h3>
      {equifaxScore !== null ? (
        <>
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Box className={classes.center}>
              <ReactSpeedometer
                value={equifaxScore}
                minValue={300}
                maxValue={900}
                segments={4}
                currentValueText={`${equifaxScore}`}
                customSegmentLabels={[
                  {
                    text: "Poor",
                    color: "#e53834",
                  },
                  {
                    text: "Average",
                    color: "#ef6c00",
                  },
                  {
                    text: "Good",
                    color: "#cddc39",
                  },
                  {
                    text: "Excellent",
                    color: "#8cc24a",
                  },
                ]}
              />
            </Box>
          </Box>
          <Box width="100%" display="flex">
            <h3 style={{ paddingBottom: "10px", textAlign: "center" }}>
              Account Details
            </h3>
          </Box>
          <Grid container spacing={3}>
            {retailAccountsDetails}
          </Grid>
        </>
      ) : (
        <span>We are not able to find your Equifax score..!!</span>
      )}
      <Box
        className="links"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        mb={3}
      >
        <Button
          className={classes.continueBtn}
          onClick={(e) => {
            e.preventDefault();
            navigate(nextURL, nextFlowNavigationProps);
          }}
        >
          Continue
        </Button>
      </Box>
    </>
  );
  return renderResult;
};

const LoansDetailsDisplay = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((old) => !old);
  return (
    <>
      <Paper>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>Acct:</label>
              </div>
              <div className={classes.accDetailsValue}>
                {data.AccountNumber}
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>Institution:</label>
              </div>
              <div className={classes.accDetailsValue}>{data.Institution}</div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>Type:</label>
              </div>
              <div className={classes.accDetailsValue}>{data.AccountType}</div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>
                  Ownership Type:
                </label>
              </div>
              <div className={classes.accDetailsValue}>
                {data.OwnershipType}
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>Balance:</label>
              </div>
              <div className={classes.accDetailsValue}>
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                  style: "currency",
                  currency: "INR",
                }).format(Number(data.Balance))}
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>Last Payment:</label>
              </div>
              <div className={classes.accDetailsValue}>{data.LastPayment}</div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>Open:</label>
              </div>
              <div className={classes.accDetailsValue}>{data.Open}</div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>
                  Last Payment Date:
                </label>
              </div>
              <div className={classes.accDetailsValue}>
                {data.LastPaymentDate}
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>
                  Sanction Amount:
                </label>
              </div>
              <div className={classes.accDetailsValue}>
                {data.SanctionAmount}
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>
                  Date Reported:
                </label>
              </div>
              <div className={classes.accDetailsValue}>{data.DateReported}</div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <div>
                <label className={classes.accDetailsLabel}>Date Opened:</label>
              </div>
              <div className={classes.accDetailsValue}>{data.DateOpened}</div>
            </Box>
          </Grid>

          <Grid item xs={5}>
            <Box>
              <div>
                <LoanHistoryDetails
                  history={data.History48Months}
                  expanded={expanded}
                  handleChange={toggle}
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

const LoanHistoryDetails = ({ history, expanded, handleChange }) => {
  const classes = useStyles();
  return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          style={{ boxShadow: "unset" }}
        >
          History of 48 Months
        </AccordionSummary>
        <Table style={{ width: "100%" }} size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ lineHeight: 1 }}>Payment Status</TableCell>
              <TableCell style={{ lineHeight: 1 }}>
                Asset Classification Status
              </TableCell>
              <TableCell style={{ lineHeight: 1 }}>SuitFiled Status</TableCell>
              <TableCell style={{ lineHeight: 1 }}>key</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((items) => {
              return (
                <TableRow>
                  <TableCell align="center">{items.PaymentStatus}</TableCell>
                  <TableCell align="center">
                    {items.AssetClassificationStatus}
                  </TableCell>
                  <TableCell align="center">{items.SuitFiledStatus}</TableCell>
                  <TableCell align="center">{items.key}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Accordion>
    </div>
  );
};
