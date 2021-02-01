import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Logo from "assets/images/logo.svg";
import { useStyles } from "./style";
import { AuthContext } from "auth";

export const MyAppBar = ({ handleDrawerOpen, open }) => {
  const authController = useContext(AuthContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const desktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        {open !== true ? (
          <img
            src={Logo}
            alt="Ratnaafin"
            className={classes.logo}
            onClick={(e) => {
              e.preventDefault();
              navigate("./");
            }}
          />
        ) : null}

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          LOS: Loan Origination System
          <Typography variant="caption" display="block" color="secondary">
            Branch: {authController?.authState?.user?.branch ?? ""}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            color="secondary"
            gutterBottom
          >
            Last Login:{" "}
            {checkDateAndDisplay(
              authController?.authState?.user?.lastLogin ?? ""
            )}
          </Typography>
        </Typography>

        <div
          className={classes.searchRoot}
          style={{ display: desktop ? "flex" : "none" }}
        >
          <Input
            disableUnderline
            placeholder="Search.."
            type="search"
            id="docsearch-input"
            inputRef={inputRef}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
          <div className={classes.search}>
            <SearchIcon />
          </div>
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
            <span className={classes.userName}>
              {`${authController?.authState?.user?.firstName ?? ""} ${
                authController?.authState?.user?.lastName
              }`}
            </span>
            <ArrowDropDownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/los/profile");
                handleClose();
              }}
            >
              <AccountCircleIcon color="primary" />
              <span className={classes.vTop}>Profile</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/los/iframe");
                handleClose();
              }}
            >
              <AccountCircleIcon color="primary" />
              <span className={classes.vTop}>Iframe</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                authController?.logout();
                handleClose();
              }}
            >
              <PowerSettingsNewIcon color="primary" />
              <span className={classes.vTop}>Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const checkDateAndDisplay = (dateStr: string) => {
  const dt = new Date(dateStr);
  //@ts-ignore
  if (dt instanceof Date && !isNaN(dt)) {
    return dt.toDateString();
  }
  return "N/A";
};
