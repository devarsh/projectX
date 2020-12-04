import Container from "@material-ui/core/Container";
import { useStyles, ContentNameProps, ContentStyleProps } from "./style";
import ScrollBar from "react-perfect-scrollbar";

export const Content = ({ children }) => {
  const classes: ContentNameProps = useStyles({} as ContentStyleProps);
  return (
    <main className={classes.content}>
      <ScrollBar>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>{children}</Container>
      </ScrollBar>
    </main>
  );
};
