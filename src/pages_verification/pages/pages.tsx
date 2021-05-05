import { Routes, Route } from "react-router-dom";
import Verification from "./otp";
import CreditScore from "./equifax";

export const Pages = () => {
  return (
    <Routes>
      <Route
        path="/mobile/:token"
        element={<Verification apiType="mobile" />}
      />
      <Route path="/email/:token" element={<Verification apiType="email" />} />
      <Route path="/credit/:token" element={<CreditScore />} />
      <Route path="*" element={<div>Page not Exist</div>} />
    </Routes>
  );
};
