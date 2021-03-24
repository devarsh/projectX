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
import {
  CrossInquiry,
  AssignedInquiry,
  IncomingInquiry,
  UnmappedInqiry,
} from "./pages/inquiry";
import { Lead } from "./pages/lead";
import { DetailsTabViewBank } from "./pages/config/bank";
import { UserManagement } from "./pages/config/userManagement";
import { NewInquiry } from "./pages/newInquiry";
import { AuthProvider, AuthLoginController, ProtectedRoutes } from "auth";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useStyles } from "./style";
import { CAMLOSWrapper } from "./pages/cam";
import TestForm from "components/dyanmicForm/test";

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
            {/*New Inquiries */}
            <Route
              path="/newInquiry/*"
              element={<NewInquiry key="inquiryx" />}
            />
            <Route
              path="/newInquiryQuestion"
              element={<NewInquiry key="question" />}
            />

            {/* Inquiries */}
            <Route path="/inquiry/myInquiries" element={<AssignedInquiry />} />
            <Route
              path="/inquiry/myCrossInquiries"
              element={<CrossInquiry />}
            />
            <Route
              path="/inquiry/incomingInquiries"
              element={<IncomingInquiry />}
            />
            <Route
              path="/inquiry/unmappedInquiries"
              element={<UnmappedInqiry />}
            />

            <Route path="/leads" element={<Lead />} />
            <Route path="/config/banks" element={<DetailsTabViewBank />} />
            <Route path="/config/userManagement" element={<UserManagement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cam" element={<CAMLOSWrapper />} />
            {/*dummy routes*/}
            <Route path="/testForm" element={<TestForm />} />
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
        <Route path="/auth/login/:type" element={<AuthLoginController />} />
        <Route
          path="/*"
          element={
            <ProtectedRoutes unauthenticatedRoute="./auth/login/customer">
              <DashbordPages />
            </ProtectedRoutes>
          }
        />
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
  }, [navigate, location.pathname]);
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
