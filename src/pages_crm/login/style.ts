import { Theme } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface LoginPageStyleProps {
  wrapper: BaseCSSProperties;
  loginLeft: BaseCSSProperties;
  loginRight: BaseCSSProperties;
  loginBtn: BaseCSSProperties;
  loginImg: BaseCSSProperties;
  formWrap: BaseCSSProperties;
  OTPTimer: BaseCSSProperties;
  resendLink: BaseCSSProperties;
}

export type LoginPageNameProps = Record<keyof LoginPageStyleProps, string>;

export const loginPageStyle = (theme: Theme): any => ({
  wrapper: {
    marginTop: "102px",
    minHeight: "calc(100vh - 187px)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 200px)",
    },
  },
  loginLeft: {
    display: "flex",
    justifyContent: "center",
    background:
      "linear-gradient(0deg, rgba(94,231,131,1) 0%, rgba(70,199,165,1) 44%, rgba(33,150,218,1) 100%)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  loginRight: {
    background: "#fff",
    padding: theme.spacing(2, 4),
    display: "flex",
    maxWidth: "400px",
    margin: "auto",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  loginImg: {
    // maxHeight: "40vh",
  },
  formWrap: {
    marginTop: theme.spacing(2),
  },
  loginBtn: {
    minWidth: "100% !important",
    margin: theme.spacing(2, 0),
    fontSize: "1rem",
    padding: "10px .75rem",
  },
  OTPTimer: {
    marginTop: "10px",
    color: theme.palette.primary.main,
    fontWeight: "600",
  },
  resendLink: {
    marginTop: "10px",
    cursor: "pointer",
    color: theme.palette.secondary.main,
    fontWeight: "600",
    fontSize: "0.875 rem",
  },
});
