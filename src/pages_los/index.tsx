import { useState, Fragment } from "react";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import { Theme, makeStyles } from "@material-ui/core/styles";

import {
  WrapperStyleProps,
  WrapperStyleNamesProps,
  wrapperStyles,
} from "./style";

const useStyles = makeStyles<Theme, WrapperStyleProps>(wrapperStyles);

const IndexPage = () => {
  const classes: WrapperStyleNamesProps = useStyles({} as WrapperStyleProps);
  const [drawerOpen, setDrawerState] = useState(true);
  const handleDrawerOpen = () => setDrawerState(true);
  const handleDrawerClose = () => setDrawerState(false);
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar open={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
        <Drawer open={drawerOpen} handleDrawerClose={handleDrawerClose}>
          <MySideBar handleDrawerOpen={handleDrawerOpen} open={drawerOpen} />
        </Drawer>
        <main>
          <Content />
        </main>
      </div>
    </Fragment>
  );
};

export default IndexPage;
