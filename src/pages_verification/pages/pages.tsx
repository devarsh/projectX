import { Routes, Route } from "react-router-dom";
import Verification from "./otp";
import CreditScore from "./equifax";

export const Pages = () => {
  return (
    <Routes>
      <Route
        path="/mobile/:token"
        element={<Verification apiType="mobile" otpLength={5} />}
      />
      <Route
        path="/email/:token"
        element={<Verification apiType="email" otpLength={5} />}
      />
      <Route path="/credit/:token" element={<CreditScore otpLength={5} />} />
      <Route path="*" element={<div>Page not Exist</div>} />
    </Routes>
  );
};
