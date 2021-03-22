import { Fragment, FC } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useStyles } from "pages_los/common/style";
import { YearlyTargetGridCRUD as YearlyTargetGrid } from "./targetYearGridCRUD";
import {
  YearlyTargetCRUDContextProvider,
  YearlyTargetAPICrudProviderGenerator,
} from "./context";

export const YearlyGridCRUD: FC<{
  moduleType: string;
  productType?: string;
  userId?: string;
  onClose?: any;
}> = ({ moduleType, productType, userId, onClose }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box display="flex">
        {typeof onClose === "function" ? (
          <>
            <Box flexGrow={1} />
            <Button variant="text" onClick={onClose}>
              Close
            </Button>
          </>
        ) : null}
      </Box>
      <Box py={2} className={classes.tabPanel}>
        <YearlyTargetCRUDContextProvider
          key={"yearlyTarget"}
          {...YearlyTargetAPICrudProviderGenerator(
            moduleType,
            "yearlyTarget",
            userId
          )}
        >
          <YearlyTargetGrid />
        </YearlyTargetCRUDContextProvider>
      </Box>
    </Fragment>
  );
};
