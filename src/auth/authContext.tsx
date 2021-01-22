import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router";

const inititalState = {
  username: "",
  lastLoggedIn: "",
  userBranch: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "setUserDetails": {
      return {
        username: action?.payload?.username,
        lastLoggedIn: action?.payload?.lastLoggedIn,
        userBranch: action?.payload?.loginBranch,
        userType: action?.payload?.userType,
      };
    }
    case "removeUserDetails": {
      return {
        username: "",
        lastLoggedIn: "",
        userBranch: "",
        userType: "",
      };
    }
    default: {
      return state;
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
    userBranch: string;
    userType: string;
  };
} | null>(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inititalState);
  const navigate = useNavigate();
  console.log(state);

  const loginUser = ({
    username,
    userType,
    lastLoggedIn,
    loginBranch,
    loginToken,
  }) => {
    dispatch({
      type: "setUserDetails",
      payload: {
        username,
        lastLoggedIn,
        loginBranch,
        userType,
      },
    });
    localStorage.setItem("authToken", `${loginToken}`);
    localStorage.setItem("losLoggedIn", "true");
    navigate("/los");
  };
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("losLoggedIn");
    dispatch({
      type: "removeUserDetails",
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
