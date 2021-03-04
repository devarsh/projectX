import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

import { APISDK } from "registry/fns/sdk";
import { useStyles } from "./style";

interface AssignLeadType {
  refID: string;
  employeeID: string;
  inquiryStatus: string;
}

const assignLead = async ({
  refID,
  employeeID,
  inquiryStatus,
}: AssignLeadType) => {
  return await APISDK.inquiryAssignToLead(refID, employeeID, inquiryStatus);
};

export const AssignInquiry = ({ refID }) => {
  let branchCode = "0";
  let inquiryStatus = "C";
  const classes = useStyles();
  const [employeeID, setEmployeeID] = useState("");
  const [userMessage, setUserMessage] = useState<null | any>(null);

  useEffect(() => {
    if (userMessage !== null) {
      setTimeout(() => {
        setUserMessage(null);
      }, 4000);
    }
  }, [userMessage]);

  const employeeListQuery = useQuery(["employeeList", branchCode], () =>
    APISDK.getEmployeeListToAssignLead(branchCode)
  );
  let employeeListOptions: any = [];
  if (
    employeeListQuery.isLoading === false &&
    employeeListQuery.isError === false
  ) {
    employeeListOptions = transformOptions(employeeListQuery.data);
  }

  const mutation = useMutation(assignLead, {
    onError: (error: any) => {
      if (typeof error === "object") {
        setUserMessage({ type: "error", message: error?.error_msg });
      }
    },
    onSuccess: () => {
      setUserMessage({ type: "success", message: "Data Successfully saved" });
    },
  });

  return (
    <div>
      {userMessage !== null && (
        <Alert severity={userMessage.type}>{userMessage?.message}</Alert>
      )}
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
            onChange={(e) => setEmployeeID(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            value={employeeID}
            InputProps={{
              endAdornment: employeeListQuery.isLoading ? (
                <InputAdornment position="end">
                  <CircularProgress color="primary" variant="indeterminate" />
                </InputAdornment>
              ) : null,
            }}
            error={employeeListQuery.isError}
            helperText={
              employeeListQuery.isError ? "error loading options" : ""
            }
          >
            <MenuItem value={0}>Select Employee</MenuItem>
            {employeeListOptions.map((data) => {
              return (
                <MenuItem key={data.value} value={data.value}>
                  {data.label}
                </MenuItem>
              );
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
        onClick={() => mutation.mutate({ refID, employeeID, inquiryStatus })}
        endIcon={mutation.isLoading ? <CircularProgress size={20} /> : null}
      >
        Assign
      </Button>
    </div>
  );
};

const transformOptions = (options) => {
  if (Array.isArray(options)) {
    let result = options.map((one) => ({
      label: one.fullname,
      value: one.empID,
    }));
    return result;
  }
  return [];
};
