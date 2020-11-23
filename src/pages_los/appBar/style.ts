import { Theme, makeStyles } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles/colorManipulator";

export interface NavBarStyleProps {
  appBar: BaseCSSProperties;
  appBarShift: BaseCSSProperties;
  toolbar: BaseCSSProperties;
  menuButton: BaseCSSProperties;
  menuButtonHidden: BaseCSSProperties;
  title: BaseCSSProperties;
  searchRoot: BaseCSSProperties;
  search: BaseCSSProperties;
  inputRoot: BaseCSSProperties;
  inputInput: BaseCSSProperties;
  loggedInUser: BaseCSSProperties;
  nameClass: BaseCSSProperties;
  userName: BaseCSSProperties;
  dropDown: BaseCSSProperties;
  vTop: BaseCSSProperties;
}

export type NavBarNameProps = Record<keyof NavBarStyleProps, string>;

const drawerWidth = 250;
const navBarStyles = (theme: Theme): any => ({
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
  toolbar: {
    paddingRight: 24,
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
  searchRoot: {
    fontFamily: theme.typography.fontFamily,
    position: "relative",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    "& $inputInput": {
      transition: theme.transitions.create("width"),
      width: 120,
      "&:focus": {
        width: 170,
      },
    },
  },
  search: {
    width: theme.spacing(6),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    marginTop: 0,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
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
  vTop: {
    verticalAlign: "top",
    paddingLeft: "4px",
  },
});

export const useStyles = makeStyles<Theme, NavBarStyleProps>(navBarStyles);
