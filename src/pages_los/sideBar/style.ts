import { Theme, makeStyles } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";
import { camelCase } from "lodash";

export interface SideBarStyleProps {
  root: BaseCSSProperties;
  drawer: BaseCSSProperties;
  item: BaseCSSProperties;
  button: BaseCSSProperties;
  btnRoot: BaseCSSProperties;
  subMenu: BaseCSSProperties;
  listIcon: BaseCSSProperties;
  lnk: BaseCSSProperties;
  faSmall: BaseCSSProperties;
  listItem: BaseCSSProperties;
  navLinks: BaseCSSProperties;
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
  subMenu: {
    paddingLeft: "50px ",
  },
  listIcon: {
    minWidth: "32px",
    color: "#0063A3",
    fontWeight: "700 ",
    fontSize: "1.25rem",
  },
  lnk: {
    color: "#0063A3",
    fontSize: "1.5rem ",
    fontWeight: "700 ",
  },
  faSmall: {
    fontSize: "13px ",
  },
});

export const useStyles = makeStyles<Theme, SideBarStyleProps>(sideBarStyles);
