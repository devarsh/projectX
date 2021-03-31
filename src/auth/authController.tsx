import { useReducer, useContext, useEffect, useCallback } from "react";
import Box from "@material-ui/core/Box";
import { useParams, useNavigate } from "react-router-dom";
import loginImg from "assets/images/login.svg";
import { useStyles } from "./style";
import { UsernameField } from "./username";
import { PasswordField } from "./password";
import { AuthContext } from "./authContext";
import * as API from "./api";
import logo from "assets/images/logo.svg";

const inititalState = {
  username: "",
  loading: false,
  isError: false,
  userMessage: "",
  currentFlow: "username",
  transactionID: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUsername": {
      return { ...state, username: action.payload.data };
    }
    case "setPassword": {
      return { ...state, password: action.payload.data };
    }
    case "inititateUserNameVerification":
    case "inititatePasswordVerification": {
      return { ...state, loading: true, isError: false, userMessage: "" };
    }
    case "passwordVerificationFailure":
    case "usernameVerificationFailure": {
      return {
        ...state,
        loading: false,
        isError: true,
        userMessage: action.payload.error,
      };
    }
    case "usernameVerificationSuccessful": {
      return {
        ...state,
        loading: false,
        currentFlow: "password",
        transactionID: action.payload.transactionID,
        username: action.payload.username,
      };
    }
    case "passwordVerificationSuccessful": {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};

export const AuthLoginController = () => {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const [loginState, dispath] = useReducer(reducer, inititalState);
  const loginType = params["type"];

  useEffect(() => {
    if (["customer", "employee", "partner"].indexOf(loginType) < 0) {
      navigate("/crm", { replace: true });
    }
    if (authContext?.isLoggedIn()) {
      navigate("/los");
    }
  }, [navigate]);

  const verifyUsername = async (username) => {
    if (!Boolean(username)) {
      dispath({
        type: "usernameVerificationFailure",
        payload: { error: "This is a required" },
      });
      return;
    }
    dispath({ type: "inititateUserNameVerification" });
    try {
      const result = await API.veirfyUsername(username, loginType);
      if (result.status === "success") {
        dispath({
          type: "usernameVerificationSuccessful",
          payload: {
            transactionID: result?.data?.transactionId,
            username: username,
          },
        });
      } else {
        dispath({
          type: "usernameVerificationFailure",
          payload: {
            error: result?.data?.error_msg ?? "Unknown error occured",
          },
        });
      }
    } catch (e) {
      dispath({
        type: "usernameVerificationFailure",
        payload: {
          error: e?.message ?? "Unknown error occured",
        },
      });
    }
  };

  const verifyPassword = async (password) => {
    if (!Boolean(password)) {
      dispath({
        type: "passwordVerificationFailure",
        payload: { error: "This is a required Field" },
      });
      return;
    }
    dispath({ type: "inititatePasswordVerification" });
    try {
      const result = await API.verifyPasswordAndLogin(
        loginState.transactionID,
        loginState.username,
        password,
        loginType
      );
      if (result.status === "success") {
        dispath({ type: "passwordVerificationSuccessful" });
        authContext?.login(result.data);
      } else {
        dispath({
          type: "passwordVerificationFailure",
          payload: {
            error: result?.data?.error_msg ?? "Unknown error occured",
          },
        });
      }
    } catch (e) {
      dispath({
        type: "passwordVerificationFailure",
        payload: {
          error: e?.message ?? "Unknown error occured",
        },
      });
    }
  };

  return (
    <Box display="flex" width={1} className={classes.wrapper}>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginLeft}
      >
        <img alt="" src={loginImg} className={classes.loginImg} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginRight}
      >
        <img src={logo} alt="Logo" width="100px" height="100px" />
        <h2>
          {loginType === "employee"
            ? "Employee Login"
            : loginType === "customer"
            ? "Customer Login"
            : loginType === "partner"
            ? "Partner Login"
            : "ERRR!!"}
        </h2>
        {loginState.currentFlow === "username" ? (
          <UsernameField
            key="username"
            loginType={loginType}
            classes={classes}
            loginState={loginState}
            verifyUsername={verifyUsername}
          />
        ) : (
          <PasswordField
            key="password"
            loginType={loginType}
            classes={classes}
            loginState={loginState}
            verifyPassword={verifyPassword}
          />
        )}
      </Box>
    </Box>
  );
};
