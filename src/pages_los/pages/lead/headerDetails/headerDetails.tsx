import Box from "@material-ui/core/Box";
import { useStyles } from "./style";
import { format } from "date-fns";

export const HeaderDetails = ({ productData }) => {
  const classes = useStyles();
  let dateValue;
  try {
    dateValue = format(new Date(productData?.original?.tran_dt), "dd/MM/yyyy");
  } catch (e) {
    dateValue = "Invalid Date";
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      paddingLeft={4}
      paddingRight={4}
      paddingTop={1}
      paddingBottom={1}
      width={1}
    >
      <Box display="flex" flexDirection="row" width={1} mb={2}>
        <Box pr={3}>
          <div className={classes.labelText}>Lead No.</div>
          <div className={classes.valueText}>{productData?.id}</div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Product</div>
          <div className={classes.valueText}>
            {productData?.original?.product_cd}
          </div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Generated On</div>
          <div className={classes.valueText}>{dateValue}</div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Current Status</div>
          <div className={classes.valueText}>
            {productData?.original?.status}
          </div>
        </Box>
      </Box>
    </Box>
  );
};
