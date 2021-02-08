import { useState, Fragment, useEffect } from "react";
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import { Dashboard } from "./pages/dashboard";
import { Profile } from "./pages/profile";
import { Inquiry } from "./pages/inquiry";
import { Lead } from "./pages/lead";
import NewInquiry from "./pages/newInquiry";
import { AuthProvider, AuthLoginController, ProtectedRoutes } from "auth";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useStyles } from "./style";

//This is temparoary
// import CAM from "./pages/cam";
import { CAMIFrame } from "./pages/cam/camComponents/camIFrame";
import TestForm from "components/dyanmicForm/test";
import ArrayForm from "packages/form/examples/01-basic";
import { GridTable } from "pages_los/common/docs";
import { Form } from "registry/metaData/test";

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
            <Route path="/inquiries" element={<Inquiry />} />
            <Route path="/leads" element={<Lead />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cam" element={<CAMIFrame />} />
            <Route path="/leadForm" element={<Form />} />

            {/* ------------ */}

            <Route path="/array" element={<ArrayForm />} />
            <Route path="/test" element={<TestForm />} />
            <Route path="/grid" element={<GridTable />} />
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
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/los") {
      navigate("/los/dashboard");
    } else {
      navigate(location.pathname);
    }
  }, []);
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
