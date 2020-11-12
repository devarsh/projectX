import { Theme, makeStyles } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface DrawerStyleProps {
  drawerPaper: BaseCSSProperties;
  drawerPaperClose: BaseCSSProperties;
  hrCls: BaseCSSProperties;
  toolbarIcon: BaseCSSProperties;
}

export type DrawerNameProps = Record<keyof DrawerStyleProps, string>;

const drawerWidth = 250;
const drawerStyles = (theme: Theme): any => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    zIndex: "9999",
    ...theme.mixins.toolbar,
  },
  hrCls: {
    zIndex: "9999",
  },
});

export const useStyles = makeStyles<Theme, DrawerStyleProps>(drawerStyles);
