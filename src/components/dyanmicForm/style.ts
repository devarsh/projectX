import { Theme } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface FormStyleProps {
  title: BaseCSSProperties;
  subTitle: BaseCSSProperties;
  paper: BaseCSSProperties;
  form: BaseCSSProperties;
  submit: BaseCSSProperties;
}

export type FormStyleNamesProps = Record<keyof FormStyleProps, string>;

export const formStyle = (theme: Theme): any => ({
  title: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.75rem",
    //@ts-ignore
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  subTitle: {
    color: "#26A456",
    letterSpacing: "2px",
    fontSize: "1.25rem",
    //@ts-ignore
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    padding: "1rem 2rem",
    borderRadius: 4,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
