import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import { format } from "date-fns";

export const HeaderDetails = ({ rowData, handleDialogClose }) => {
  const classes = useStyles();
  let dateValue;
  try {
    dateValue = format(new Date(rowData?.data?.generation_dt), "dd/MM/yyyy");
  } catch (e) {
    dateValue = "Invalid Date";
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Lead No.</div>
          <div className={classes.valueText}>{rowData?.id}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Branch </div>
          <div className={classes.valueText}>{rowData?.data?.branch_name}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Category</div>
          <div className={classes.valueText}>{rowData?.data?.category_id}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Product</div>
          <div className={classes.valueText}>{rowData?.data?.product_cd}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Generated On</div>
          <div className={classes.valueText}>{dateValue}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Current Stage</div>
          <div className={classes.valueText}>{rowData?.data?.stage_cd}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Current Sub Stage</div>
          <div className={classes.valueText}>{rowData?.data?.sub_stage_cd}</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={handleDialogClose}>Close</Button>
      </div>
    </div>
  );
};
