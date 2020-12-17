import { useState } from "react";
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
    color: "#393939",
    "&:selected": {
      color: theme.palette.primary.main,
    },
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function CustomizedDividers() {
  const [status, setStatus] = useState(() => ["pending", "rejected"]);
  const [stages, setStages] = useState(() => [""]);
  const [productTypes, setProductTypes] = useState(() => [""]);

  const handleStageFilter = (
    event: React.MouseEvent<HTMLElement>,
    newStages: string[]
  ) => {
    setStages(newStages);
  };

  const handleStatusFilter = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string[]
  ) => {
    setStatus(newStatus);
  };

  const handleProductTypesFilter = (
    event: React.MouseEvent<HTMLElement>,
    newProductTypes: string[]
  ) => {
    setProductTypes(newProductTypes);
  };

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <StyledToggleButtonGroup
        size="small"
        value={status}
        onChange={handleStatusFilter}
        aria-label="text status"
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
        onChange={handleStageFilter}
        aria-label="text stage"
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
      <Divider flexItem orientation="vertical" className={classes.divider} />
      <StyledToggleButtonGroup
        size="small"
        value={productTypes}
        onChange={handleProductTypesFilter}
        aria-label="text productyypes"
      >
        <ToggleButton value="retail" aria-label="retail">
          Retail Leads
        </ToggleButton>
        <ToggleButton value="unsecured" aria-label="unsecured">
          Unsecured Leads
        </ToggleButton>
        <ToggleButton value="insurance" aria-label="insurance">
          Insurance Leads
        </ToggleButton>
        <ToggleButton value="all" aria-label="all">
          All
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
}
