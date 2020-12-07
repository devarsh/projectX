import { makeStyles } from "@material-ui/core/styles";

export const becomePartnerUseStyle = makeStyles((theme) => ({
  wrapper: {
    maxWidth: "1260px",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.06)",
    marginTop: "10px",
    padding: "10px 20px",
    marginBottom: "30px",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  BecomePartnerCover: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  content: {
    padding: "0 2rem 0 4rem",
    lineHeight: "1.6",
    [theme.breakpoints.down("md")]: {
      padding: "0 2rem 0 2rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2rem 0",
    },
  },
  BecomePartnerImg: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  infoText: {
    fontSize: "1.25rem",
  },
  applyButton: {
    color: "#42C2AB !important",
    fontWeight: "bolder",
    fontSize: "1.125rem",
    padding: ".5rem .75rem",
    textTransform: "capitalize",
    textAlign: "center",
    background: "#fff",
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
}));
