import { useState } from "react";
import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { useStyles, NavBarNameProps, NavBarStyleProps } from "./style";

//import MenuBar from "../sideBar/menuBar";

export const MyAppBar = ({ handleDrawerOpen, open }) => {
  const classes: NavBarNameProps = useStyles({} as NavBarStyleProps);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root + " DashboardHeader"}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <IconButton color="inherit" className="ml-2">
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <div className={classes.loggedInUser}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.nameClass}
            >
              <span className={classes.userName}>Employee Name</span>
              <ArrowDropDownIcon className={classes.dropDown} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={handleClose}>
                <a href="/EmployeeProfile">
                  <AccountCircleIcon color="primary" />
                  <span className={classes.vTop}>Profile</span>
                </a>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <a href="/EmployeeProfile">
                  <AccountCircleIcon color="primary" />
                  <span className={classes.vTop}>Report</span>
                </a>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <a>
                  <PowerSettingsNewIcon color="primary" />
                  <span className={classes.vTop}>Logout</span>
                </a>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
