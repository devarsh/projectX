import { StrictMode, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "typeface-roboto";
import "registry"; //register functions to be used across application
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ErrorBoundary from "errorBoundary/errorBoundary";
const LOS = lazy(() => import("app/los"));
const CRM = lazy(() => import("app/crm"));
const ErrorPage = lazy(() => import("app/error"));
const Middleware = lazy(() => import("app/middleware"));
const Verification = lazy(() => import("app/verification"));

require("dotenv").config();

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("crm/");
  }, [navigate]);
  return null;
};

const App = () => (
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          {/* <ErrorBoundary> */}
          <Routes>
            <Route path="/los/*" element={<LOS />} />
            <Route path="/crm/*" element={<CRM />} />
            <Route path="/verification/*" element={<Verification />} />
            <Route path="/error/*" element={<ErrorPage />} />
            <Route path="/middleware/*" element={<Middleware />} />
            <Route path="*" element={<Redirect />} />
          </Routes>
          {/* </ErrorBoundary> */}
        </Suspense>
      </BrowserRouter>
    </DndProvider>
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
