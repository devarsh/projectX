import React, { useState, useReducer } from "react";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { APISDK } from "registry/fns/sdk";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";
import loginImg from "assets/images/login.svg";
import { InputMaskCustom } from "components/derived/inputMask";
import { useStyles } from "./style";
export interface FormDialogProps {
  submitProps: any;
}

export const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [userPhoneNumberVerified, setUserPhoneNumberVerified] = useState("");

  const initialState = {
    currentScreens: "initiateLoginProcessWithPasswordAndOtp",
    apiOTPId: "",
    loading: false,
    apiResult: "",
    apiResultStatus: "",
    transactionID: "",
    URL: "",
    phoneNumber: "",
    otp: "",
    password: "",
    createPassword: "",
    confirmPassword: "",
  };

  const reducer = (state, action) => {
    debugger;
    switch (action.type) {
      case "fields":
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case "startInitiateLoginProcessWithPasswordAndOtp":
        return {
          ...state,
          loading: action.loading,
          apiResultStatus: action.apiResultStatus,
        };
      case "initiateLoginProcessWithOtp":
        return {
          ...state,
          currentScreens: "verifyOtp",
          loading: action.loading,
          apiResult: action.apiResult,
          apiResultStatus: action.apiResultStatus,
        };
      case "initiateLoginWithPassword":
        return {
          ...state,
          currentScreens: "loginWithPassword",
          loading: action.loading,
          apiResult: action.apiResult,
          apiResultStatus: action.apiResultStatus,
        };
      case "InitiateCreateNewPassword":
        return {
          ...state,
          currentScreens: "createNewPassword",
          loading: action.loading,
          apiResult: action.apiResult,
          apiResultStatus: action.apiResultStatus,
        };
      default:
        return state;
    }
  };

  const expiryTime = 60;

  const requestOtp = async () => {
    if (state.phoneNumber !== "" && state.phoneNumber.length === 10) {
      try {
        dispatch({
          type: "startInitiateLoginProcessWithPasswordAndOtp",
          loading: true,
        });
        const result = await APISDK.requestForLocalOTP(state.phoneNumber);
        if (result.status === "success") {
          dispatch({
            type: "initiateLoginProcessWithOtp",
            currentScreens: "verifyOtp",
            loading: false,
            apiOTPId: result?.data?.id,
            apiResult: result.status,
            apiResultStatus: "",
          });
          // setexpiryOtpTime(result?.data?.sdatetime);
          displayIntervale();
        } else {
          dispatch({
            type: "startInitiateLoginProcessWithPasswordAndOtp",
            loading: false,
            apiResultStatus: result?.data?.error_msg,
          });
        }
      } catch (e) {
        dispatch({
          type: "startInitiateLoginProcessWithPasswordAndOtp",
          loading: false,
          apiResultStatus: e,
        });
      }
    }
  };

  const displayIntervale = () => {
    const timerId = setInterval(() => {
      setTime((time) => {
        if (time === expiryTime) {
          clearInterval(timerId);
          return time;
        } else {
          return time + 1;
        }
      });
    }, 1000);
  };

  const formatTime = (time) =>
    `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
      time % 60
    ).padStart(2, "0")}`;

  const Timer = ({ time }) => {
    const timeRemain = expiryTime - (time % expiryTime);
    return (
      <>
        <div className={classes.OTPTimer}>
          {time === expiryTime ? (
            <div onClick={requestOtp} className={classes.resendLink}>
              Resend OTP
            </div>
          ) : (
            formatTime(timeRemain)
          )}
        </div>
      </>
    );
  };

  const verifyOtp = async () => {
    try {
      dispatch({
        type: "startInitiateLoginProcessWithPasswordAndOtp",
        loading: true,
      });
      let sdatetime = "20200915110135";
      const result = await APISDK.verifyLocalOTP(
        state.apiOTPId,
        state.otp,
        sdatetime
      );
      if (result.status === "success") {
        if (userPhoneNumberVerified === "Yes") {
          dispatch({
            type: "InitiateCreateNewPassword",
            currentScreens: "createNewPassword",
            loading: false,
            apiResult: result.status,
            apiResultStatus: result?.data?.message,
          });
        } else {
          navigate("/dashboard");
        }
      } else {
        dispatch({
          type: "startInitiateLoginProcessWithPasswordAndOtp",
          loading: false,
          apiResultStatus: result?.data?.error_msg,
        });
      }
    } catch (e) {
      console.log("in catch");
    }
  };

  const updateNewPassword = async () => {
    if (
      state.createPassword !== "" &&
      state.confirmPassword !== "" &&
      state.createPassword === state.confirmPassword
    ) {
      try {
        dispatch({
          type: "startInitiateLoginProcessWithPasswordAndOtp",
          loading: true,
        });
        const result = await APISDK.updateUserPassword(
          state.confirmPassword,
          state.phoneNumber
        );
        if (result.status === "success") {
          navigate("/dashboard");
        } else {
          dispatch({
            type: "startInitiateLoginProcessWithPasswordAndOtp",
            loading: false,
            apiResultStatus: result?.data?.error_msg,
          });
        }
      } catch (e) {
        dispatch({
          type: "startInitiateLoginProcessWithPasswordAndOtp",
          loading: false,
          apiResultStatus: e,
        });
      }
    }
  };

  const checkUserNumberAndPasswordExist = async () => {
    if (state.apiResultStatus === "" && state.phoneNumber.length === 10) {
      try {
        const result = await APISDK.checkPhoneNumberExists(state.phoneNumber);
        if (result.status === "success") {
          if (
            result?.data?.user_mobile === "Y" &&
            result?.data?.user_password === "N"
          ) {
            setUserPhoneNumberVerified("Yes");
            requestOtp();
          } else if (
            result?.data?.user_mobile === "Y" &&
            result?.data?.user_password === "Y"
          ) {
            dispatch({
              type: "initiateLoginWithPassword",
              currentScreens: "loginWithPassword",
              loading: false,
              apiResult: result.status,
              apiResultStatus: result?.data?.message,
            });
          }
        } else {
          if (result?.data?.error_cd === "-999") {
            dispatch({
              type: "startInitiateLoginProcessWithPasswordAndOtp",
              loading: false,
              apiResultStatus: result?.data?.error_msg,
            });
          }
        }
      } catch (e) {
        dispatch({
          type: "startInitiateLoginProcessWithPasswordAndOtp",
          loading: false,
          apiResultStatus: e,
        });
      }
    }
  };

  const verifyPwd = async () => {
    if (state.password.length !== 0 || state.password !== "") {
      try {
        const result = await APISDK.handleverifyPwd(
          state.password,
          state.phoneNumber
        );
        if (result.status === "success") {
          navigate("/dashboard");
        } else {
          dispatch({
            type: "startInitiateLoginProcessWithPasswordAndOtp",
            loading: false,
            apiResultStatus: result?.data?.error_msg,
          });
        }
      } catch (e) {
        dispatch({
          type: "startInitiateLoginProcessWithPasswordAndOtp",
          loading: false,
          apiResultStatus: e,
        });
      }
    }
  };

  // password= "superacute@1234";
  const [state, dispatch] = useReducer(reducer, initialState);
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
        <h2>Cutomer Login</h2>
        <div className="text">
          Login with your registered mobile number to access your Ratnaafin
          account.
        </div>

        {state.currentScreens === "initiateLoginProcessWithPasswordAndOtp" ? (
          <div className={classes.formWrap}>
            <TextField
              label="Mobile Number"
              placeholder="Enter mobile number"
              fullWidth
              className="mobileNumber"
              type="text"
              name="phoneNumber"
              onChange={(e) =>
                dispatch({
                  type: "fields",
                  fieldName: "phoneNumber",
                  payload: e.target.value,
                })
              }
              value={state.phoneNumber}
              error={Boolean(state.apiResultStatus)}
              helperText={
                Boolean(state.apiResultStatus) ? state.apiResultStatus : null
              }
              InputProps={{
                inputComponent: InputMaskCustom,
                inputProps: {
                  MaskProps: {
                    mask: "0000000000",
                  },
                },
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
            <Button
              onClick={requestOtp}
              endIcon={state.loading ? <CircularProgress size={20} /> : null}
              className={classes.loginBtn}
            >
              Login With OTP
            </Button>

            <Box display="flex" justifyContent="center" width={1}>
              <div className="text text-center">Or</div>
            </Box>

            <Button
              onClick={checkUserNumberAndPasswordExist}
              className={classes.loginBtn}
            >
              Login With Password
            </Button>
          </div>
        ) : state.currentScreens === "verifyOtp" ? (
          <div className={classes.formWrap}>
            <TextField
              label="OTP"
              placeholder="OTP for verification"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              type="email"
              name="otp"
              onChange={(e) =>
                dispatch({
                  type: "fields",
                  fieldName: "otp",
                  payload: e.target.value,
                })
              }
              value={state.otp}
              inputProps={{ maxLength: 6 }}
              error={Boolean(state.apiResultStatus)}
              helperText={
                Boolean(state.apiResultStatus) ? state.apiResultStatus : null
              }
              InputProps={{
                inputComponent: InputMaskCustom,
                inputProps: {
                  MaskProps: {
                    mask: "0 0 0 0 0 0",
                  },
                },
              }}
            />
            <Timer time={time} />
            <Button
              disabled={state.otp.length !== 6 ? true : false}
              onClick={verifyOtp}
              className={classes.loginBtn}
            >
              VERIFY & LOGIN
            </Button>
          </div>
        ) : state.currentScreens === "createNewPassword" ? (
          <div className={classes.formWrap}>
            <TextField
              label="Create Password"
              placeholder="Create password"
              autoComplete="off"
              type="password"
              name="createPassword"
              onChange={(e) =>
                dispatch({
                  type: "fields",
                  fieldName: "createPassword",
                  payload: e.target.value,
                })
              }
              value={state.createPassword}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              helperText={state.apiResultStatus ? state.apiResultStatus : ""}
              error={state.apiResultStatus ? true : false}
            />

            <TextField
              label="Confirm Password"
              placeholder="Confirm password"
              autoComplete="off"
              type="password"
              name="confirmPassword"
              onChange={(e) =>
                dispatch({
                  type: "fields",
                  fieldName: "confirmPassword",
                  payload: e.target.value,
                })
              }
              value={state.confirmPassword}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              helperText={state.apiResultStatus ? state.apiResultStatus : ""}
              error={state.apiResultStatus ? true : false}
            />

            <Button
              onClick={updateNewPassword}
              disabled={
                state.createPassword !== "" || state.confirmPassword !== ""
                  ? false
                  : true
              }
              endIcon={state.loading ? <CircularProgress size={20} /> : null}
              className={classes.loginBtn}
            >
              VERIFY & LOGIN
            </Button>
          </div>
        ) : state.currentScreens === "loginWithPassword" ? (
          <div className={classes.formWrap}>
            <TextField
              label="Password"
              placeholder="Password for verification"
              autoComplete="off"
              type="password"
              name="password"
              onChange={(e) =>
                dispatch({
                  type: "fields",
                  fieldName: "password",
                  payload: e.target.value,
                })
              }
              value={state.password}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              helperText={state.apiResultStatus ? state.apiResultStatus : ""}
              error={state.apiResultStatus ? true : false}
            />

            <Button
              onClick={verifyPwd}
              disabled={state.password !== "" ? false : true}
              endIcon={state.loading ? <CircularProgress size={20} /> : null}
              className={classes.loginBtn}
            >
              VERIFY & LOGIN
            </Button>
          </div>
        ) : null}
      </Box>
    </Box>
  );
};
