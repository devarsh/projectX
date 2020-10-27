import { Theme } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface FooterStyleProps {
  footerBackground: BaseCSSProperties;
  footerContent: BaseCSSProperties;
  textRight: BaseCSSProperties;
  h3Class: BaseCSSProperties;
  followLink: BaseCSSProperties;
  followLinks: BaseCSSProperties;
}

export type FooterNameProps = Record<keyof FooterStyleProps, string>;

export const footerStyle = (theme: Theme): any => ({
  footerBackground: {
    background:
      "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
  },
  footerContent: {
    height: "54px",
  },
  textRight: {
    textAlign: "right",
  },
  h3Class: {
    fontWeight: "400",
    fontSize: "1.5rem",
    color: "#fff",
    margin: 0,
  },
  followLinks: {
    maxWidth: "225px",
  },
  followLink: {
    width: "37px",
    height: "37px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
