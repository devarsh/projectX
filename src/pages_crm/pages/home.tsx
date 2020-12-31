import { makeStyles } from "@material-ui/core/styles";
import CoreProducts from "./coreProducts";
import BecomePartner from "./becomePartner";

export const useStyleHome = makeStyles(() => ({
  wrapper: {
    minHeight: "calc(100vh - 45px)",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 15px",
  },
}));

const Home = () => {
  const classes = useStyleHome();
  return (
    <div className={classes.wrapper}>
      <CoreProducts />
      <BecomePartner />
    </div>
  );
};

export default Home;
