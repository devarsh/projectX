import { useState, Fragment } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import { Dashboard } from "./pages/dashboard";
import { Profile } from "./pages/profile";
import { Product } from "./pages/product";
import NewInquiry from "./pages/newInquiry";
import CAM from "./pages/cam";
import { useStyles } from "./style";

//This is temparoary

import { AuthProvider, AuthLoginController, ProtectedRoutes } from "auth";
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
            <Route path="/" element={<RedirectComponent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/newInquiry/*"
              element={<NewInquiry key="inquiryx" />}
            />
            <Route
              path="/newInquiryQuestion"
              element={<NewInquiry key="question" />}
            />
            <Route path="/inquiries" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cam" element={<CAM />} />
            {/*dummy routes*/}
            <Route path="/pages/:id" element={<Dummy />} />
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
            <ProtectedRoutes unauthenticatedRoute="./auth/login/customer">
              <DashbordPages />
            </ProtectedRoutes>
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
