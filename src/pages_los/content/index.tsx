import Container from "@material-ui/core/Container";
import { useStyles, ContentNameProps, ContentStyleProps } from "./style";

export const Content = ({ children }) => {
  const classes: ContentNameProps = useStyles({} as ContentStyleProps);
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </main>
  );
};
