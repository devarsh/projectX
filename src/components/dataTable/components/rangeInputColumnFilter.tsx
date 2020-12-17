import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./style";

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      border: "1px solid #BABABA",
      marginTop: "0 !important",
      borderRadius: 5,
      backgroundColor: "#fff",
      padding: "0 0",
      "& input": {
        padding: "4px 38px 4px 6px",
        marginTop: "0 !important",
        fontSize: "12px",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #26A456",
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px) scale(1)",
    },
    "& .MuiSelect-selectMenu": {
      minHeight: "18px",
      lineHeight: "18px",
      fontSize: 12,
    },
  },
})(TextField);

export const RangeInputColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const classes = useStyles();

  return (
    <Box style={{ maxWidth: "360px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mt={2}
        width={1}
      >
        <Box width="45%">
          <CssTextField placeholder="Min(0)" fullWidth />
        </Box>
        <Box width="10%" textAlign="center">
          to
        </Box>
        <Box width="45%">
          <CssTextField placeholder="Max(30)" fullWidth />
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" px={2} width={1}>
        <Button className={classes.applyBtn}>Apply Filter</Button>
      </Box>
    </Box>
  );
};
