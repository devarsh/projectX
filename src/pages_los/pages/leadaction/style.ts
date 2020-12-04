import { Theme } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface LeadStyleProps {
  paper: BaseCSSProperties;
}

export type LeadNameProps = Record<keyof LeadStyleProps, string>;

export const leadStyle = (theme: Theme): any => ({
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
});
