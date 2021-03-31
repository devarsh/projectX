import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  submitBtn: {
    fontSize: "1.2rem",
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    border: 0,
    color: "#fff !important",
    fontWeight: 700,
    textTransform: "capitalize",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
    },
  },
}));
