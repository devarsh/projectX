import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router";

const inititalState = {
  username: "",
  lastLoggedIn: "",
  loginBranch: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "setUserDetails": {
      return {
        ...state,
        username: action?.payload?.username,
        lastLoggedIn: action?.payload?.lastLoggedIn,
        loginBranch: action?.payload?.loginBranch,
      };
    }
    case "removeUserDetails": {
      return inititalState;
    }
  }
};

export const AuthContext = createContext<{
  loginUser: any;
  logoutUser: any;
  isLoggedIn: any;
  userState: {
    username: string;
    lastLoggedIn: string;
    loginBranch: string;
  };
} | null>(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inititalState);
  const navigate = useNavigate();

  const loginUser = ({ username, lastLoggedIn, loginBranch, loginToken }) => {
    dispatch({
      action: "setUserDetails",
      payload: {
        username,
        lastLoggedIn,
        loginBranch,
      },
    });
    localStorage.setItem("authToken", `${loginToken}`);
    localStorage.setItem("losLoggedIn", "true");
  };
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("losLoggedIn");
    dispatch({
      action: "removeUserDetails",
    });
    navigate("/los");
  };
  const isLoggedIn = () => {
    if (localStorage.getItem("losLoggedIn") === "true") {
      return true;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        isLoggedIn,
        userState: state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthenticatedRoutes = ({ children, unauthenticatedRoute }) => {
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
