import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import { format } from "date-fns";

export const Header = ({ headerDetail, closeDialog }) => {
  const classes = useStyles();
  let dateValue;
  try {
    dateValue = format(new Date(headerDetail[0]?.data?.tran_dt), "dd/MM/yyyy");
  } catch (e) {
    dateValue = "Invalid Date";
  }

  let currencyFormatter = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Cold Calling No.</div>
          <div className={classes.valueText}>
            {headerDetail[0]?.data?.tran_cd}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Product Category</div>
          <div className={classes.valueText}>
            {headerDetail[0]?.data?.category_id}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Generated On</div>
          <div className={classes.valueText}>{dateValue}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Loan Amount</div>
          <div className={classes.valueText}>
            {currencyFormatter.format(headerDetail[0]?.data?.loan_amt)}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Status</div>
          <div className={classes.valueText}>
            {headerDetail[0]?.data?.status}
          </div>
        </div>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={closeDialog}>Close</Button>
      </div>
    </div>
  );
};
