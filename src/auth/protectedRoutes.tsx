import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./authContext";

export const ProtectedRoutes = ({ children, unauthenticatedRoute }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (authContext !== null && authContext.isLoggedIn()) {
    return children;
  } else {
    setTimeout(() =>
      navigate(unauthenticatedRoute ?? "/los/auth/login/customer")
    );
    return null;
  }
};
