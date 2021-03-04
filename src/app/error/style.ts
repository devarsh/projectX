import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: "120px",
    minHeight: "calc(100vh - 165px)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
  },
  successImg: {
    maxHeight: "calc(100vh - 400px)",
  },
  center: {
    textAlign: "center",
  },
}));
