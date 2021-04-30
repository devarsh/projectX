import Box from "@material-ui/core/Box";
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
        <Box pr={2}>
          <div className={classes.labelText}>Lead No.</div>
          <div className={classes.valueText}>{rowData?.id}</div>
        </Box>
        <Box pr={2}>
          <div className={classes.labelText}>Branch </div>
          <div className={classes.valueText}>{rowData?.data?.branch_name}</div>
        </Box>
        <Box px={2}>
          <div className={classes.labelText}>Category</div>
          <div className={classes.valueText}>{rowData?.data?.category_id}</div>
        </Box>
        <Box px={2}>
          <div className={classes.labelText}>Product</div>
          <div className={classes.valueText}>{rowData?.data?.product_cd}</div>
        </Box>
        <Box px={2}>
          <div className={classes.labelText}>Generated On</div>
          <div className={classes.valueText}>{dateValue}</div>
        </Box>
        <Box px={2}>
          <div className={classes.labelText}>Current Stage</div>
          <div className={classes.valueText}>{rowData?.data?.stage_cd}</div>
        </Box>
        <Box px={2}>
          <div className={classes.labelText}>Current Sub Stage</div>
          <div className={classes.valueText}>{rowData?.data?.sub_stage_cd}</div>
        </Box>
        <Box flexGrow={1} />
        <Button onClick={handleDialogClose}>Close</Button>
      </Box>
    </Box>
  );
};
