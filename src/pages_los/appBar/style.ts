import { Theme, makeStyles } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface NavBarStyleProps {
  root: BaseCSSProperties;
  loggedInUser: BaseCSSProperties;
  nameClass: BaseCSSProperties;
  userName: BaseCSSProperties;
  dropDown: BaseCSSProperties;
  branchName: BaseCSSProperties;
  vTop: BaseCSSProperties;
  common: BaseCSSProperties;
  toolbar: BaseCSSProperties;
  appBar: BaseCSSProperties;
  appBarShift: BaseCSSProperties;
  menuButton: BaseCSSProperties;
  menuButtonHidden: BaseCSSProperties;
  title: BaseCSSProperties;
  info: BaseCSSProperties;
  appBarSpacer: BaseCSSProperties;
  content: BaseCSSProperties;
  paper: BaseCSSProperties;
  fixedHeight: BaseCSSProperties;
  search: BaseCSSProperties;
  searchIcon: BaseCSSProperties;
  inputRoot: BaseCSSProperties;
  inputInput: BaseCSSProperties;
  sectionDesktop: BaseCSSProperties;
  sectionMobile: BaseCSSProperties;
}

export type NavBarNameProps = Record<keyof NavBarStyleProps, string>;

const drawerWidth = 250;
const navBarStyles = (theme: Theme): any => ({
  root: {
    display: "flex",
    backgroundColor: "#FAFAFA",
    themecolor1: "#0063A3",
    themecolor2: "#26A456",
  },
  loggedInUser: {
    marginLeft: theme.spacing(2),
  },
  nameClass: {
    color: "#0063A3",
    fontWeight: "600",
    textTransform: "capitalize !important",
    lineHeight: "1.4",
    textAlign: "left",
  },
  userName: {
    color: "#0063A3",
    fontWeight: "600",
    textTransform: "capitalize !important",
    lineHeight: "1.4",
    textAlign: "left",
    fontSize: "14px",
  },
  dropDown: {
    fontSize: "2rem",
  },
  branchName: {
    color: "#26A456",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "12px",
  },
  vTop: {
    verticalAlign: "top",
    paddingLeft: "4px",
  },
  common: {
    themecolor1: "#0063A3",
    themecolor2: "#26A456",
    white: "#FFFFFF",
  },
  toolbar: {
    paddingRight: 24,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fff",
    color: "#0063A3",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  info: {
    fontSize: "11px",
    color: theme.palette.secondary.main,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },

  search: {
    position: "relative",
    borderRadius: "40px",
    backgroundColor: "rgba(255, 255, 255,0.15)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255,0.25)",
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

export const useStyles = makeStyles<Theme, NavBarStyleProps>(navBarStyles);
