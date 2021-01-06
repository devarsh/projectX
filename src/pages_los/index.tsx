import { useState, Fragment } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import Dashboard from "./pages/dashboard";
import Lead from "./pages/lead";
import { Profile } from "./pages/profile";
import GridWrapper from "components/dataTable";
import { APITest } from "./pages/api";
import Login from "./pages/login";
import DynamicLead from "./pages/leads";
import LeadAction from "./pages/leadaction";
import View from "./pages/tabView";
import { useStyles } from "./style";
import { CC_ODFormWrapper } from "./pages/CAM/SMELoans/CC_OD/CC_ODFormWrapper";
import "react-perfect-scrollbar/dist/css/styles.css";
import { InquiryViewFormWrapper } from "./pages/inquiryFormActions/inquiryFormView";
import { InquiryEditFormWrapper } from "./pages/inquiryFormActions/inquiryFormEdit";
import { QuestionnaireViewFormWrapper } from "./pages/questionnaireFormActions/questionnaireFormView";
import { QuestionnaireEditFormWrapper } from "./pages/questionnaireFormActions/questionnaireFormEdit";

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
            <Route path="/leads" element={<Lead />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dgrid" element={<GridWrapper />} />
            <Route path="/cam" element={<CC_ODFormWrapper />} />
            <Route path="/api" element={<APITest />} />
            <Route path="/cam" element={<DynamicLead />} />
            <Route path="/pages/:id" element={<Dummy />} />
            <Route path="/leadAction" element={<LeadAction />} />
            <Route path="/view" element={<View />} />
            <Route path="/auth" element={<Login />} />

            <Route
              path="/inquiryFormView"
              element={<InquiryViewFormWrapper />}
            />
            <Route
              path="/inquiryFormEdit"
              element={<InquiryEditFormWrapper />}
            />
            <Route
              path="/questionnaireFormView"
              element={<QuestionnaireViewFormWrapper />}
            />
            <Route
              path="/questionnaireFormEdit"
              element={<QuestionnaireEditFormWrapper />}
            />
          </Routes>
        </Content>
      </div>
    </Fragment>
  );
};

export default DashbordPages;

const RedirectComponent = () => {
  const navigate = useNavigate();
  setTimeout(() => navigate("./dashboard"), 1);
  return null;
};

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
