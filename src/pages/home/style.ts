import { Theme } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface IndexPageStyleProps {
  wrapper: BaseCSSProperties;
}
export type IndexPageNameProps = Record<keyof IndexPageStyleProps, string>;

export const indexPageStyle = (theme: Theme): any => ({
  wrapper: {
    minHeight: "calc(100vh - 45px)",
    alignItems: "center !important",
    display: "flex !important",
    flexDirection: "column !important",
    justifyContent: "center !important",
  },
});

export interface BecomePartnerStyleProps {
  wrapper: BaseCSSProperties;
  content: BaseCSSProperties;
  applyButton: BaseCSSProperties;
}

export type BecomePartnerNameProps = Record<
  keyof BecomePartnerStyleProps,
  string
>;

export const becomePartnerStyle = (theme: Theme): any => ({
  wrapper: {
    maxWidth: "1260px",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.06)",
    marginTop: "10px",
    padding: "10px 20px",
    marginBottom: "30px",
  },
  content: {
    padding: "0 2rem 0 4rem",
    lineHeight: "1.6",
  },
  applyButton: {
    color: "#42C2AB !important",
    fontWeight: "700",
    fontSize: "1.125rem",
    padding: ".5rem .75rem",
    textTransform: "capitalize",
    textAlign: "center",
    background: "#fff",
    //@ts-ignore
    border: "1px solid #42C2AB",
    borderRadius: "24px",
    minWidth: "145px",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    "&:hover": {
      color: "#0b6fb8 !important",
      border: "1px solid #0b6fb8",
      background: "#fff",
    },
  },
});

export interface CoreProductsStyleProps {
  wrapper: BaseCSSProperties;
  customCol: BaseCSSProperties;
  productName: BaseCSSProperties;
  productWrapper: BaseCSSProperties;
  productTag: BaseCSSProperties;
}

export type CoreProductsNameProps = Record<
  keyof CoreProductsStyleProps,
  string
>;

export const coreProductsStyle = (theme: Theme): any => ({
  wrapper: {
    marginTop: "120px",
    maxWidth: "1260px",
  },
  customCol: {
    minWidth: "16.66%",
    paddingRight: "10px",
    paddingLeft: "10px",
  },
  productName: {
    color: "#555",
    fontSize: "1.15rem",
    fontWeight: "700",
    marginTop: "20px",
    minHeight: "40px",
    marginBottom: "4px",
  },
  productWrapper: {
    maxWidth: "218px",
    minHeight: "180px",
    padding: "10px 4px",
    backgroundColor: "#fff",
    border: "1px solid #E8FFF1",
    borderRadius: "20px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    "&:hover": {
      boxShadow: "0 5px 10px rgba(38,164,86,0.9)",
    },
  },
  productTag: {
    width: "150px",
    height: "30px",
    lineHeight: "30px",
    paddingLeft: "15px",
    position: "absolute",
    left: "-8px",
    bottom: "8px",
    background: "#E8894A",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    "&::before": {
      content: "''",
      position: "absolute",
      height: "0",
      width: "0",
      top: "-8.5px",
      left: "0.1px",
      borderBottom: "9px solid #E8894A",
      borderLeft: "9px solid transparent",
    },
  },
});
