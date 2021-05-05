import { Routes, Route } from "react-router-dom";
import Verification from "./otp";

export const Pages = () => {
  return (
    <Routes>
      <Route
        path="/mobile/:token"
        element={<Verification apiType="mobile" />}
      />
      <Route path="/email/:token" element={<Verification apiType="email" />} />
      <Route path="/cibil/:token" element={<div>CIBIL Page</div>} />
      <Route path="*" element={<div>Page not Exist</div>} />
    </Routes>
  );
};
