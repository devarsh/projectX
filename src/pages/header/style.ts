import { Theme, makeStyles } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface HeaderStyleProps {
  navBarCSS: BaseCSSProperties;
  headerDropdown: BaseCSSProperties;
  navLinkHeader: BaseCSSProperties;
  productLink: BaseCSSProperties;
  font13: BaseCSSProperties;
  loginDropdown: BaseCSSProperties;
}

export type HeaderNameProps = Record<keyof HeaderStyleProps, string>;

export const headerStyle = (theme: Theme): any => ({
  navBarCSS: {
    padding: "4px 1rem !important",
    backgroundColor: "#fff !important",
    minHeight: "64px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
  },
  headerDropdown: {
    backgroundColor: "#fff",
    minWidth: "205px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    borderBottom: "3px solid  #26A456",
    marginTop: "0px",
  },
  navLinkHeader: {
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.2",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: ".5rem",
    paddingLeft: ".5rem",
    fontWeight: "600",
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",

    "& hover": {
      color: "#0b6fb8",
    },
  },
  productLink: {
    color: "#555",
    padding: "0 1rem 8px 1rem",
    display: "inline-block",
    verticalAlign: "middle",
    cursor: "pointer",
    textTransform: "capitalize",
  },
  font13: {
    fontSize: "13px",
  },
  loginDropdown: {
    width: "160px",
  },
});

export const useStyles = makeStyles<Theme, HeaderStyleProps>(headerStyle);
