import { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Ellipses } from "./index";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const ITEM_HEIGHT = 48;

export const BankCard = ({ bank, branch, columnName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Typography variant="h6" align="left">
        {bank}
      </Typography>
      <Typography
        variant="subtitle2"
        gutterBottom
        align="left"
        color="textSecondary"
      >
        {branch}
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
        open={open}
        onClose={closeMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem key={"termsheet"} onClick={closeMenu}>
          Termsheet
        </MenuItem>
        <MenuItem key={"stages"} onClick={closeMenu}>
          Bank Stages
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
