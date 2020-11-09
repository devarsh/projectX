import CoreProducts from "./coreProducts";
import BecomePartner from "./becomePartner";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  IndexPageNameProps,
  IndexPageStyleProps,
  indexPageStyle,
} from "./style";

const useStyles = makeStyles<Theme, IndexPageStyleProps>(indexPageStyle);

const Home = () => {
  const classes: IndexPageNameProps = useStyles({} as IndexPageStyleProps);
  return (
    <div className={classes.wrapper}>
      <CoreProducts />
      <BecomePartner />
    </div>
  );
};

export default Home;
