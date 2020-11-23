import { useState, Fragment } from "react";
import { Routes, Route, useParams } from "react-router-dom";
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

import Dashboard from "./pages/dashboard";
import Lead from "./pages/lead";
import Profile from "./pages/profile";

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
        <Content>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Lead />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pages/:id" element={<Child />} />
          </Routes>
        </Content>
      </div>
    </Fragment>
  );
};

export default IndexPage;
