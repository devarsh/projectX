import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "left",
  },
  drawer: {
    paddingTop: "64px",
    width: "240px",
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: "1px solid #ddd",
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
    justifyContent: "left !important",
  },
  subMenu: {
    paddingLeft: "50px !important",
  },
  ListIcon: {
    minWidth: "32px",
    color: "#0063A3",
    fontWeight: "700 !important",
    fontSize: "1.25rem",
  },
  sidebarLnk: {
    color: "#0063A3 !important",
    fontSize: "1.5rem !important",
    fontWeight: "700 !important",
  },
  faSmall: {
    fontSize: "13px !important",
  },
}));

export default useStyles;
