import Box from "@material-ui/core/Box";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./style";

export const LeadForm = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6}>
        <Box mt={2}>
          <TextField
            select
            label="Change Status"
            fullWidth
            required
            name="leadtatus"
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            value="1"
          >
            <MenuItem value={0}>Select New Status</MenuItem>
            <MenuItem value={1}>Pending</MenuItem>
            <MenuItem value={2}>Rejected</MenuItem>
            <MenuItem value={3}>Confirmed</MenuItem>
          </TextField>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Box mt={2}>
          <TextField
            select
            label="Change Priority"
            fullWidth
            required
            name="leadtatus"
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            value="1"
          >
            <MenuItem value={0}>Select Priority</MenuItem>
            <MenuItem value={1}>Hot</MenuItem>
            <MenuItem value={2}>Warm</MenuItem>
            <MenuItem value={3}>Cold</MenuItem>
          </TextField>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Box mt={2}>
          <TextField
            select
            label="Assign to Employee"
            placeholder="Select Employee"
            fullWidth
            required
            name=""
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            value="1"
          >
            <MenuItem value={0}>Select Employee</MenuItem>
            <MenuItem value={1}>Employee 1</MenuItem>
            <MenuItem value={2}>Employee 2</MenuItem>
            <MenuItem value={3}>Employee 3</MenuItem>
          </TextField>
        </Box>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Box mt={2}>
          <TextField
            label="Remarks"
            placeholder="Remarks"
            fullWidth
            name="remarks"
            InputLabelProps={{
              shrink: true,
            }}
            autoComplete="off"
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box display="flex" flexDirection="row" width={1 / 2} mt={2}>
          <Button autoFocus color="primary" className={classes.backBtn}>
            Cancel
          </Button>
          <Button color="primary" autoFocus className={classes.submitBtn}>
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
