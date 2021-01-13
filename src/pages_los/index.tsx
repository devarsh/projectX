import { useState, Fragment } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import Dashboard from "./pages/dashboard";
import { Profile } from "./pages/profile";
import { Inquiry } from "./pages/inquiry";
import Login from "./auth";
import LeadAction from "./pages/leadaction";
import View from "./pages/tabView";
import { useStyles } from "./style";
import { CC_ODFormWrapper } from "./pages/CAM/SMELoans/CC_OD/CC_ODFormWrapper";
import "react-perfect-scrollbar/dist/css/styles.css";
import Documents from "components/fileUpload";

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
            <Route path="/" element={<RedirectComponent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inquiries" element={<Inquiry />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cam" element={<CC_ODFormWrapper />} />
            {/*dummy routes*/}
            <Route path="/docs" element={<Documents />} />
            <Route path="/pages/:id" element={<Dummy />} />
            <Route path="/leadAction" element={<LeadAction />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Content>
      </div>
    </Fragment>
  );
};

const EntryPoint = () => (
  <Fragment>
    <Routes>
      <Route path="/*" element={<DashbordPages />} />
      <Route path="/auth" element={<Login />} />
    </Routes>
  </Fragment>
);

export default EntryPoint;

const RedirectComponent = () => {
  const navigate = useNavigate();
  setTimeout(() => navigate("./dashboard"), 1);
  return null;
};

function Dummy() {
  let { id } = useParams();
  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
