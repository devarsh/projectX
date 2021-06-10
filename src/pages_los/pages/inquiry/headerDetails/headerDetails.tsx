import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import { format } from "date-fns";

export const HeaderDetails = ({ productData, handleDialogClose }) => {
  const classes = useStyles();
  let dateValue;
  try {
    dateValue = format(new Date(productData?.data?.tran_dt), "dd/MM/yyyy");
  } catch (e) {
    dateValue = "Invalid Date";
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Inquiry No</div>
          <div className={classes.valueText}>
            {productData?.data?.inquiry_no}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Branch</div>
          <div className={classes.valueText}>
            {productData?.data?.branch_name}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Product</div>
          <div className={classes.valueText}>
            {productData?.data?.product_cd}
          </div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Generated On</div>
          <div className={classes.valueText}>{dateValue}</div>
        </div>
        <div className={classes.spacing}>
          <div className={classes.labelText}>Current Status</div>
          <div className={classes.valueText}>{productData?.data?.status}</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={handleDialogClose}>Close</Button>
      </div>
    </div>
  );
};
