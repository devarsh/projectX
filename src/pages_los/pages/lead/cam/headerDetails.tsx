import Box from "@material-ui/core/Box";
import { useStyles } from "./style";

export const HeaderDetails = ({ rowData }) => {
  const classes = useStyles();

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
          <div className={classes.labelText}>LeadNo</div>
          <div className={classes.valueText}>{rowData?.refID}</div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Category Name</div>
          <div className={classes.valueText}>{rowData?.categoryName}</div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Product Name</div>
          <div className={classes.valueText}>{rowData?.productName}</div>
        </Box>
        {rowData?.subProduct1Name !== "" ? (
          <Box px={3}>
            <div className={classes.labelText}>Sub Product1 Name</div>
            <div className={classes.valueText}>{rowData?.subProduct1Name}</div>
          </Box>
        ) : null}
        {rowData?.subProduct2Name !== "" ? (
          <Box px={3}>
            <div className={classes.labelText}>Sub Product2 Name</div>
            <div className={classes.valueText}>{rowData?.subProduct2Name}</div>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
