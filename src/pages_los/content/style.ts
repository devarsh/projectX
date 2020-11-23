import { Theme, makeStyles } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface ContentStyleProps {
  appBarSpacer: BaseCSSProperties;
  content: BaseCSSProperties;
  container: BaseCSSProperties;
}

export type ContentNameProps = Record<keyof ContentStyleProps, string>;

const contentStyles = (theme: Theme): any => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

export const useStyles = makeStyles<Theme, ContentStyleProps>(contentStyles);
