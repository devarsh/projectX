import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import loaderGif from "assets/images/loader.gif";
import { APISDK } from "registry/fns/sdk";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import { useStyles } from "./style";
import Alert from "@material-ui/lab/Alert";

export const AssignEmpToConvertInquiryToLead = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [empListToAssignLead, setEmpListToAssignLead] = useState<any[]>([]);
  const [empIDToAssignLead, setEmpIDToAssignLead] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState(Boolean);

  let branchCode = "0";
  let refID = "1044";
  let inquiryStatus = "C";

  useEffect(() => {
    setLoading(true);
    const getLeadAssignEmployeeList = async () => {
      const result = await APISDK.getEmployeeListToAssignLead(branchCode);
      let employeeList: any = [];
      if (result.status === "success") {
        setLoading(false);
        for (let i = 0; i < result.data.length; i++) {
          employeeList.push({
            label: result.data[i].fullname,
            value: result.data[i].empID,
          });
        }
      } else {
        setLoading(false);
        setError(result.data.error_msg);
      }
      setEmpListToAssignLead(employeeList);
    };
    getLeadAssignEmployeeList();
  }, []);

  const toAssignLead = async () => {
    debugger;
    const result = await APISDK.inquiryAssignToLead(
      refID,
      empIDToAssignLead,
      inquiryStatus
    );
    if (result.status === "success") {
      setErrorType(false);
      setError(result.data.message);
    } else {
      setLoading(false);
      setErrorType(true);
      setError(result.data.error_msg);
    }
  };

  const result = loading ? (
    <img src={loaderGif} alt="loader" />
  ) : error !== "" ? (
    <Alert severity={errorType ? "error" : "success"}>{error}</Alert>
  ) : (
    <div>
      <h3>Assign Lead</h3>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6}>
          <TextField
            select
            label="Lead Assign to Employee"
            placeholder="Select Employee"
            fullWidth
            required
            name="leadAssign"
            autoComplete="off"
            onChange={(e) => setEmpIDToAssignLead(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            value={empIDToAssignLead}
          >
            <MenuItem value={0}>Select Employee</MenuItem>
            {empListToAssignLead.map((data) => {
              return <MenuItem value={data.value}>{data.label}</MenuItem>;
            })}
          </TextField>
        </Grid>
      </Grid>
      <Button color="primary" className={classes.backBtn}>
        Reject
      </Button>
      <Button
        color="primary"
        autoFocus
        className={classes.submit}
        onClick={toAssignLead}
      >
        Assign
      </Button>
    </div>
  );
  return result;
};
