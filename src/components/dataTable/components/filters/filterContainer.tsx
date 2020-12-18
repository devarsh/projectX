import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useStyles } from "./style";

export const FilterContainer = ({
  children,
  setFilterValue,
  filterActionLabel = "Apply",
  width = 360,
}) => {
  const classes = useStyles();
  return (
    <Box style={{ width: `${width}px` }}>
      {typeof children === "function" ? children(classes) : children}
      <Box display="flex" justifyContent="flex-end" px={2} width={1}>
        <Button className={classes.applyBtn} onClick={() => setFilterValue()}>
          {filterActionLabel}
        </Button>
      </Box>
    </Box>
  );
};
