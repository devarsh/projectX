import React from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: "wrap",
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
  })
);

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function CustomizedDividers() {
  const [status, setStatus] = React.useState(() => [
    "pending",
    "rejected",
    "confirmed",
  ]);
  const [stages, setStages] = React.useState(() => ["italic"]);

  const handleStage = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setStages(newFormats);
  };

  const handleStatusFilter = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string[]
  ) => {
    setStatus(newStatus);
  };

  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          value={status}
          onChange={handleStatusFilter}
          aria-label="text alignment"
        >
          <ToggleButton value="pending" aria-label="pending">
            Pending
          </ToggleButton>
          <ToggleButton value="rejected" aria-label="rejected">
            Rejected
          </ToggleButton>
          <ToggleButton value="confirmed" aria-label="confirmed">
            Confirmed
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <StyledToggleButtonGroup
          size="small"
          value={stages}
          onChange={handleStage}
          aria-label="text formatting"
        >
          <ToggleButton value="hot" aria-label="hot">
            Hot
          </ToggleButton>
          <ToggleButton value="warm" aria-label="warm">
            Warm
          </ToggleButton>
          <ToggleButton value="cold" aria-label="cold">
            Cold
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
