import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigationFlow } from "../utils/navHelpers";
import { useStyles } from "./style";
import ReactSpeedometer from "react-d3-speedometer";
import { useEffect, useState } from "react";
import { APISDK } from "registry/fns/sdk";
import loaderGif from "assets/images/loader.gif";

export const Equifax = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const [error, setError] = useState(false);
  const [retailAccountsSummary, setRetailAccountsSummary] = useState({});
  const [retailAccountsDetails, setRetailAccountsDetails] = useState({});

  let retailAccountDetailsFormLabel = {};
  // let RetailAccountsSummary = {};

  const [
    flowExist,
    // refID,
    nextURL,
    nextFlowNavigationProps,
  ] = useNavigationFlow(location, "/thankyou");
  let refID = "0";
  useEffect(() => {
    setLoading(true);
    const getEquifaxDetails = async () => {
      try {
        const result = await APISDK.getHealthCheckScore(refID);
        if (result.status === "success") {
          setLoading(false);
          let score =
            result.data.CIRReportDataLst[0].CIRReportData.ScoreDetails[0].Value;
          setRetailAccountsSummary(
            transformCustomerData(
              result.data.CIRReportDataLst[0].CIRReportData
                .RetailAccountsSummary
            )
          );
          setRetailAccountsDetails(
            result.data.CIRReportDataLst[0].CIRReportData.RetailAccountDetails
          );
          setHealthScore(score);
        } else {
          setError(result.data.Error.ErrorMessage);
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
  ) : (
    <Box
      className={classes.wrapper}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Box className={classes.center}>
        <h3 className="theme-color2">
          <b>Your Current EQUIFAX Score is</b>
        </h3>
        {healthScore !== null ? (
          <>
            <ReactSpeedometer
              value={healthScore}
              minValue={300}
              maxValue={900}
              segments={4}
              currentValueText={`${healthScore}`}
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
            <TableContainer className={classes.tableContainer}>
              <Table
                className={classes.table}
                size="small"
                aria-label="lead table"
              >
                <TableBody>
                  {RetailAccountsSummaryFormLabel.map((res) => {
                    return retailAccountsSummary[res.name] ? (
                      <TableRow key={res.label}>
                        <TableCell component="th" className={classes.th}>
                          {res.label}:
                        </TableCell>
                        <TableCell
                          component="td"
                          align="left"
                          className={classes.td}
                        >
                          {retailAccountsSummary[res.name] ?? "N/A"}
                        </TableCell>
                      </TableRow>
                    ) : null;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <div>We are not able to find your score</div>
        )}
      </Box>
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
    </Box>
  );
  return renderResult;
};

const transformCustomerData = (retailAccountSummaryData: any) => {
  if (typeof retailAccountSummaryData === "object") {
    return {
      avgOpenBalance: retailAccountSummaryData.AverageOpenBalance,
      noOfAccounts: retailAccountSummaryData.NoOfAccounts,
      noOfActiveAccounts: retailAccountSummaryData.NoOfActiveAccounts,
      noOfPastDueAccounts: retailAccountSummaryData.NoOfPastDueAccounts,
      noOfWriteOffs: retailAccountSummaryData.NoOfWriteOffs,
      noOfZeroBalanceAccounts: retailAccountSummaryData.NoOfZeroBalanceAccounts,
      oldestAccount: retailAccountSummaryData.OldestAccount,
      recentAccount: retailAccountSummaryData.RecentAccount,
      singleHighestBalance: retailAccountSummaryData.SingleHighestBalance,
      singleHighestCredit: retailAccountSummaryData.SingleHighestCredit,
      singleHighestSanctionAmount:
        retailAccountSummaryData.SingleHighestSanctionAmount,
      totalBalanceAmount: retailAccountSummaryData.TotalBalanceAmount,
      totalCreditLimit: retailAccountSummaryData.TotalCreditLimit,
      totalHighCredit: retailAccountSummaryData.TotalHighCredit,
      totalMonthlyPaymentAmount:
        retailAccountSummaryData.TotalMonthlyPaymentAmount,
      totalPastDue: retailAccountSummaryData.TotalPastDue,
      totalSanctionAmount: retailAccountSummaryData.TotalSanctionAmount,
    };
  } else {
    return {};
  }
};

const RetailAccountsSummaryFormLabel = [
  { label: "AverageOpenBalance", name: "avgOpenBalance" },
  { label: "NoOfAccounts", name: "noOfAccounts" },
  { label: "NoOfActiveAccounts", name: "noOfActiveAccounts" },
  { label: "NoOfPastDueAccounts", name: "noOfPastDueAccounts" },
  { label: "NoOfWriteOffs", name: "noOfWriteOffs" },
  { label: "NoOfZeroBalanceAccounts", name: "noOfZeroBalanceAccounts" },
  { label: "OldestAccount", name: "oldestAccount" }, //currently not coming from API
  { label: "RecentAccount", name: "recentAccount" },
  { label: "SingleHighestBalance", name: "singleHighestBalance" },
  { label: "SingleHighestCredit", name: "singleHighestCredit" },
  { label: "SingleHighestSanctionAmount", name: "singleHighestSanctionAmount" },
  { label: "TotalBalanceAmount", name: "totalBalanceAmount" },
  { label: "TotalCreditLimit", name: "totalCreditLimit" },
  { label: "TotalHighCredit", name: "totalHighCredit" },
  { label: "TotalMonthlyPaymentAmount", name: "totalMonthlyPaymentAmount" },
  { label: "TotalPastDue", name: "totalPastDue" },
  { label: "TotalSanctionAmount", name: "totalSanctionAmount" },
];
