import Box from "@material-ui/core/Box";
import { useStyles } from "./style";

export const HeaderDetails = ({ rowData }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      paddingTop={1}
      paddingBottom={1}
      width={1}
    >
      <Box display="flex" flexDirection="row" width={1} mb={2}>
        <Box pr={1}>
          <div className={classes.labelText}>LeadNo</div>
          <div className={classes.valueText}>{rowData?.leadNo}</div>
        </Box>
        <Box px={1}>
          <div className={classes.labelText}>Category Name</div>
          <div className={classes.valueText}>{rowData?.categoryName}</div>
        </Box>
        <Box px={1}>
          <div className={classes.labelText}>Product Name</div>
          <div className={classes.valueText}>{rowData?.productName}</div>
        </Box>
        {rowData?.subProduct1Name !== "" ? (
          <Box px={1}>
            <div className={classes.labelText}>Sub Product1 Name</div>
            <div className={classes.valueText}>{rowData?.subProduct1Name}</div>
          </Box>
        ) : null}
        {rowData?.subProduct2Name !== "" ? (
          <Box pl={1}>
            <div className={classes.labelText}>Sub Product2 Name</div>
            <div className={classes.valueText}>{rowData?.subProduct2Name}</div>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
