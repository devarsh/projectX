import Box from "@material-ui/core/Box";
import { useStyles } from "./style";
import { SelectRenderOnly as Select } from "components/common/select";

const options = [
  { label: "Default", value: 1 },
  { label: "Lac", value: 100000 },
  { label: "Crore", value: 10000000 },
];

export const HeaderDetails = ({ rowData, setAmountIn, amountIn }) => {
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
          <Box px={1}>
            <div className={classes.labelText}>Sub Product2 Name</div>
            <div className={classes.valueText}>{rowData?.subProduct2Name}</div>
          </Box>
        ) : null}

        <Box pl={1} style={{ width: "100px" }}>
          <Select
            label="Amount In"
            size="small"
            touched={true}
            error={""}
            value={amountIn}
            handleChange={(e) => setAmountIn(e.target.value)}
            handleBlur={() => true}
            options={options}
            _optionsKey={"amountIn"}
            fullWidth={true}
            selectVariant="regular"
          />
        </Box>
      </Box>
    </Box>
  );
};
