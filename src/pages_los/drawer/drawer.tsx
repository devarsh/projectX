import Drawer from "@material-ui/core/Drawer";
import Logo from "assets/images/logo.svg";

import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

import { useStyles, DrawerNameProps, DrawerStyleProps } from "./style";

export const MyDrawer = ({ open, handleDrawerClose, children }) => {
  const classes: DrawerNameProps = useStyles({} as DrawerStyleProps);
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <a href="/">
          <img src={Logo} alt="Ratnaafin" className={classes.logo} />
        </a>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider className={classes.hrCSS} />
      {children}
    </Drawer>
  );
};
