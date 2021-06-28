import { Fragment, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import { InvalidAction } from "pages_los/common/invalidAction";
import { Ellipses } from "./components";
import { BankStage } from "../stages";

const ITEM_HEIGHT = 48;

export const Card = ({
  bankName,
  branchName,
  columnName,
  stageName,
  subStageName,
  id,
  refID,
  query,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentAction, setCurrentAction] = useState<any>(null);
  const isDataChangedRef = useRef(false);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const selectAction = (actionName) => () => {
    setCurrentAction({
      name: actionName,
      refID: refID,
      id: id,
      bankName: `${bankName}-${branchName}`,
    });
    setAnchorEl(null);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const closeAction = () => {
    if (isDataChangedRef.current === true) {
      query?.refetch();
    }
    isDataChangedRef.current = false;
    setCurrentAction(null);
  };

  return (
    <Fragment>
      <Typography variant="h6" align="left">
        {bankName}
      </Typography>
      <Typography
        variant="subtitle2"
        gutterBottom
        align="left"
        color="textSecondary"
      >
        {branchName}
      </Typography>
      <Typography
        variant="subtitle2"
        gutterBottom
        align="left"
        color="textSecondary"
      >
        {stageName}
        {"/"}
        {subStageName}
      </Typography>

      {columnName !== "selection" ? (
        <Ellipses>
          <IconButton onClick={openMenu}>
            <MoreVertIcon />
          </IconButton>
        </Ellipses>
      ) : null}
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem key={"termsheet"} onClick={selectAction("termsheet")}>
          Termsheet
        </MenuItem>
        <MenuItem key={"stages"} onClick={selectAction("bankStages")}>
          Bank Stages
        </MenuItem>
      </Menu>
      <DialogPicker
        currentAction={currentAction}
        closeDialog={closeAction}
        isDataChangedRef={isDataChangedRef}
      />
    </Fragment>
  );
};

const DialogPicker = ({ currentAction, closeDialog, isDataChangedRef }) => {
  return (
    <Dialog
      open={Boolean(currentAction)}
      key={currentAction?.name ?? "NO_ACTION"}
      fullScreen
    >
      {(() => {
        switch (currentAction?.name) {
          // case "termsheet": {
          //   return null;
          // }
          case "bankStages": {
            return (
              <BankStage
                key="bankStages"
                refID={currentAction?.refID}
                branchID={currentAction?.id}
                isDataChangedRef={isDataChangedRef}
                closeDialog={closeDialog}
                gridTitle={`Bank Stages: ${currentAction?.bankName}`}
              />
            );
          }
          default: {
            return <InvalidAction closeDialog={closeDialog} />;
          }
        }
      })()}
    </Dialog>
  );
};
