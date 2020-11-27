import { Theme, makeStyles } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface SideBarStyleProps {
  root: BaseCSSProperties;
  drawer: BaseCSSProperties;
  item: BaseCSSProperties;
  button: BaseCSSProperties;
  btnRoot: BaseCSSProperties;
  subMenu: BaseCSSProperties;
  listIcon: BaseCSSProperties;
  link: BaseCSSProperties;
  faSmall: BaseCSSProperties;
  listItem: BaseCSSProperties;
  navLinks: BaseCSSProperties;
  nestedMenuLevel1: BaseCSSProperties;
  nestedMenuLevel2: BaseCSSProperties;
  openList: BaseCSSProperties;
  openCurrent: BaseCSSProperties;
}

export type SideBarNameProps = Record<keyof SideBarStyleProps, string>;

const sideBarStyles = (theme: Theme): any => ({
  root: {
    justifyContent: "left",
  },
  drawer: {
    paddingTop: "70px",
    width: "240px",
  },
  item: {
    display: "flex",
    borderBottom: "1px solid #ddd",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    "& svg": {
      color: theme.palette.primary.main,
    },
  },
  button: {
    color: "#0063A3",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    textAlign: "left",
  },
  btnRoot: {
    paddingLeft: "24px",
    justifyContent: "left ",
  },
  navLinks: {
    height: "calc(100vh - 71px)",
    overflowY: "auto",
    overflowX: "hidden",
  },
  nestedMenuLevel1: {
    paddingLeft: "20px",
    paddingRight: theme.spacing(3),
    fontSize: "13px",
    "& div > svg": {
      fontSize: "11px",
    },
  },
  nestedMenuLevel2: {
    paddingLeft: "24px",
    fontSize: "12px",
    "& div > svg": {
      fontSize: "9px",
    },
  },
  listIcon: {
    minWidth: "32px",
    color: "#0063A3",
    fontWeight: "700 ",
    fontSize: "1.25rem",
  },
  link: {
    color: "#0063A3",
    fontSize: "1rem ",
    marginTop: "2px",
    marginBottom: "2px",
    "& span": {
      fontWeight: "500",
    },
  },
  faSmall: {
    fontSize: "13px ",
  },
  openList: {
    "& > div": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    "&  *": {
      color: theme.palette.secondary.main,
    },
  },
  openCurrent: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    "&  *": {
      color: theme.palette.secondary.main,
    },
  },
});

export const useStyles = makeStyles<Theme, SideBarStyleProps>(sideBarStyles);
