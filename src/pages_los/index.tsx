import { useState, Fragment } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import Dashboard from "./pages/dashboard";
import Lead from "./pages/lead";
import Profile from "./pages/profile";
import Iframe from "./pages/iframe";
import { ParentGridWrapper } from "components/dataTable";
import { APITest } from "./pages/api";
import Login from "./pages/login";
import DynamicLead from "./pages/leads";
import LeadAction from "./pages/leadaction";
import { useStyles } from "./style";
import "react-perfect-scrollbar/dist/css/styles.css";

const DashbordPages = () => {
  const classes = useStyles();
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
            <Route path="/iframe" element={<Iframe />} />
            <Route path="/dgrid" element={<ParentGridWrapper />} />
            <Route path="/api" element={<APITest />} />
            <Route path="/cam" element={<DynamicLead />} />
            <Route path="/pages/:id" element={<Dummy />} />
            <Route path="/leadAction" element={<LeadAction />} />
          </Routes>
        </Content>
      </div>
    </Fragment>
  );
};

const IndexPage = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/*" element={<DashbordPages />} />
        <Route path="/auth" element={<Login />} />
      </Routes>
    </Fragment>
  );
};

export default IndexPage;

function Dummy() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
