import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  loginBanner: {
    //backgroundImage: "url(https://source.unsplash.com/user/quentin)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  loginControllerContainer: {
    display: "flex",
    margin: theme.spacing(4, 4),
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", //fix IE 11 issue,
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  linearProgress: {
    width: "100%",
  },
  disableLink: {
    pointerEvents: "none",
  },
  link: {
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
