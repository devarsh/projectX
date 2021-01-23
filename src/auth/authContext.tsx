import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContextType, AuthStateType, ActionType } from "./type";
import { AuthSDK } from "registry/fns/auth";
import { LOSSDK } from "registry/fns/los";

const inititalState: AuthStateType = {
  token: "",
  tokenType: "",
  isLoggedIn: false,
  user: {
    lastName: "",
    firstName: "",
    lastLogin: "",
    branch: "",
    type: "",
  },
};

const authReducer = (
  state: AuthStateType,
  action: ActionType
): AuthStateType => {
  switch (action.type) {
    case "login": {
      return action.payload;
    }
    case "logout": {
      return {
        token: "",
        tokenType: "",
        isLoggedIn: false,
        user: {
          lastName: "",
          firstName: "",
          lastLogin: "",
          branch: "",
          type: "",
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inititalState);
  const [authenticating, setAuthenticating] = useState(true);
  const navigate = useNavigate();

  const login = (payload: AuthStateType, stopNavigation?: boolean) => {
    dispatch({
      type: "login",
      payload: { ...payload, isLoggedIn: true },
    });
    LOSSDK.setToken(payload.token);
    localStorage.setItem("authDetails", JSON.stringify(payload));
    if (!Boolean(stopNavigation)) {
      navigate("/los");
    }
  };
  const logout = () => {
    localStorage.removeItem("authDetails");
    dispatch({
      type: "logout",
      payload: {},
    });
    LOSSDK.removeToken();
    navigate("/los");
  };

  const isLoggedIn = () => {
    return state.isLoggedIn;
  };

  window.addEventListener("storage", () => {
    let result = localStorage.getItem("authDetails");
    if (result === null) {
      logout();
    }
  });

  useEffect(() => {
    let result = localStorage.getItem("authDetails");
    if (result !== null) {
      let localStorageAuthState: AuthStateType = JSON.parse(result);
      if (
        Boolean(localStorageAuthState?.token ?? "") &&
        Boolean(localStorageAuthState?.user.type ?? "")
      ) {
        AuthSDK.verifyToken(
          localStorageAuthState.user.type,
          localStorageAuthState.token
        ).then((result) => {
          if (result.status === "success") {
            login(localStorageAuthState, true);
          } else {
            logout();
          }
          setAuthenticating(false);
        });
      } else {
        logout();
        setAuthenticating(false);
      }
    } else {
      logout();
      setAuthenticating(false);
    }
  }, []);

  return authenticating ? (
    <div>loading...</div>
  ) : (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        authState: state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
