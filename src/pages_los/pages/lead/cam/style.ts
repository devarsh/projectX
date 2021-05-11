import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  labelText: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#393939",
  },
  valueText: {
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "1px",
    color: theme.palette.secondary.main,
  },
  printLayout: {
    width: "210mm",
    margin: "0mm auto",
    border: "1px #D3D3D3 solid",
    borderRadius: "5px",
    background: "#fff",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
}));
