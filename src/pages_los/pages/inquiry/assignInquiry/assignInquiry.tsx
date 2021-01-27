import { useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { useStyles } from "./style";

const inititalState = {
  assignLeadRemarks: "",
  assignEmployee: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setAssignEmployee": {
      return { ...state, assignEmployee: action.payload };
    }
    case "setAssignLeadRemarks": {
      return { ...state, assignLeadRemarks: action.payload };
    }
    default: {
      return state;
    }
  }
};

// interface AssignLeadType {
//   inquiryID: string;
//   employeeID: string;
//   inquiryStatus: string;
// }

export const AssignInquiryToEmployee = ({ inquiryID }) => {
  const classes = useStyles();
  const [assignToLeadStates, dispatch] = useReducer(reducer, inititalState);

  return (
    <div>
      <h3>Assign Lead</h3>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <TextField
            select
            label="Lead Assign to Employee"
            placeholder="Select Employee"
            fullWidth
            required
            name="leadAssign"
            autoComplete="off"
            value={assignToLeadStates.assignEmployee}
            onChange={(e) =>
              dispatch({ type: "setAssignEmployee", payload: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem value={0}>Select Employee</MenuItem>
            <MenuItem value="1">Sanjay</MenuItem>
            <MenuItem value="2">Milan</MenuItem>
            <MenuItem value="3">Krupa</MenuItem>
            <MenuItem value="4">Devarsh</MenuItem>
            <MenuItem value="5">Raveena</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Box mt={2}>
            <TextField
              required
              label="Remarks"
              placeholder="Remarks"
              fullWidth
              name="leadAssignRemarks"
              value={assignToLeadStates.assignLeadRemarks}
              autoComplete="off"
              onChange={(e) =>
                dispatch({
                  type: "setAssignLeadRemarks",
                  payload: e.target.value,
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Button color="primary" className={classes.backBtn}>
        Reject
      </Button>
      <Button color="primary" autoFocus className={classes.submit}>
        Assign
      </Button>
    </div>
  );
};
