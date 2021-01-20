import { makeStyles } from "@material-ui/core/styles";

export const useFolderStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    margin: theme.spacing(1),
  },
  iconMargin: {
    padding: theme.spacing(1),
  },
  typoMargin: {
    padding: theme.spacing(1),
    paddingLeft: 0,
  },
  fullHeight: {
    height: "100%",
  },
  chip: {
    borderRadius: 0,
    border: "0px",
    fontWeight: "bold",
  },
  rejected: {
    color: "#dc3545",
  },
  pending: {
    color: "#007bff",
  },
  verified: {
    color: "#26a456",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));
