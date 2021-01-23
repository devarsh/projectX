import { useReducer } from "react";
import Box from "@material-ui/core/Box";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./style";

const inititalState = {
  remarks: "",
  leadPriority: "",
};

const reducer = (state, action) => {
  debugger;
  switch (action.type) {
    case "setLeadPriority": {
      return { ...state, leadPriority: action.payload };
    }
    case "setRemarks": {
      return { ...state, remarks: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const MoveToLead = () => {
  const classes = useStyles();
  const [moveToLeadStates, dispatch] = useReducer(reducer, inititalState);

  return (
    <Box display="flex" flexDirection="column" width={1}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Box mt={2}>
            <TextField
              select
              label="Change Priority"
              fullWidth
              required
              name="leadPriority"
              autoComplete="off"
              value={moveToLeadStates.leadPriority}
              onChange={(e) =>
                dispatch({ type: "setLeadPriority", payload: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value={0}>Select Priority</MenuItem>
              <MenuItem value="H">Hot</MenuItem>
              <MenuItem value="W">Warm</MenuItem>
              <MenuItem value="C">Cold</MenuItem>
            </TextField>
          </Box>
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
              name="remarks"
              value={moveToLeadStates.remarks}
              onChange={(e) =>
                dispatch({ type: "setRemarks", payload: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="off"
            />
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="row" width={1 / 2} mt={4}>
        <Button color="primary" autoFocus className={classes.submitBtn}>
          Move To Lead
        </Button>
      </Box>
    </Box>
  );
};
