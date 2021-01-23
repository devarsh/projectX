import { useState, Fragment } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import Dashboard from "./pages/dashboard";
import { Profile } from "./pages/profile";
import { Inquiry } from "./pages/inquiry";
import { useStyles } from "./style";
import { Documents } from "pages_los/pages/inquiry/documents";
import CAM from "./pages/cam";
import { AuthProvider, AuthLoginController, AuthenticatedRoutes } from "./auth";
import "react-perfect-scrollbar/dist/css/styles.css";

// import { CCOD } from "./pages/cam/sme";

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
            <Route path="/docs" element={<Documents />} />
            <Route path="/cam" element={<CAM />} />
            {/*dummy routes*/}
            <Route path="/pages/:id" element={<Dummy />} />
            {/* <Route path="/camPreview" element={<CCOD />} /> */}
          </Routes>
        </Content>
      </div>
    </Fragment>
  );
};

const EntryPoint = () => (
  <Fragment>
    <AuthProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthenticatedRoutes unauthenticatedRoute="./auth/login/customer">
              <DashbordPages />
            </AuthenticatedRoutes>
          }
        />
        <Route path="/auth/login/:type" element={<AuthLoginController />} />
      </Routes>
    </AuthProvider>
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
