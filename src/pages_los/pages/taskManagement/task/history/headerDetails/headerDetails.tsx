import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import { format } from "date-fns";

const dateFormatter = (date, withTime) => {
  let formatStr = "dd/MM/yyyy";
  if (withTime) {
    formatStr = `${formatStr} HH:MM:SS`;
  }
  let dateValue;
  try {
    dateValue = format(new Date(date), formatStr);
  } catch (e) {
    dateValue = "";
  }
  return dateValue;
};

export const HeaderDetails = ({ rowData, handleDialogClose }) => {
  console.log(rowData);
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Task Type</div>
          <div className={classes.valueText}>{rowData?.task_type}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Subject</div>
          <div className={classes.valueText}>{rowData?.subject}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Started Date </div>
          <div className={classes.valueText}>
            {dateFormatter(rowData?.entered_date, true)}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Due Date</div>
          <div className={classes.valueText}>
            {dateFormatter(rowData?.due_date, true)}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Completion Date</div>
          <div className={classes.valueText}>
            {dateFormatter(rowData?.completion_date, true)}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Status</div>
          <div className={classes.valueText}>{rowData?.status}</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={handleDialogClose}>Close</Button>
      </div>
    </div>
  );
};
