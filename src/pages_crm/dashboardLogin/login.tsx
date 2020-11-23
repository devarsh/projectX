import React, { useEffect, useState, useReducer } from "react";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { APISDK } from "registry/fns/sdk";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";
import { string } from "yup";
import loginImg from "assets/images/login.svg";
import { makeStyles, Theme } from "@material-ui/core/styles";

import {
  loginPageStyle,
  LoginPageStyleProps,
  LoginPageNameProps,
} from "./style";

export interface FormDialogProps {
  submitProps: any;
}

const useStyles = makeStyles<Theme, LoginPageStyleProps>(loginPageStyle);

export const Login = () => {
  const classes: LoginPageNameProps = useStyles({} as LoginPageStyleProps);
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    phoneNumber: "",
    otp: "",
    password: "",
  });
  const [otpVerifydivShowing, setotpVerifydivShowing] = useState(false);
  const [showPwddiv, setshowPwddiv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [id, setid] = useState("");
  const [expiryOtpTime, setexpiryOtpTime] = useState("");
  const [time, setTime] = useState(0);

  let expiryTime = 60;

  const handleChange = (input) => ({ target: { value } }) => {
    setFields({ ...fields, [input]: value });

    switch (input) {
      case "phoneNumber":
        return { value };
      case "otp":
        return { value };
      case "password":
        return { value };
      default:
        break;
    }
  };
  // console.log("phone number", fields.phoneNumber);

  const requestOtp = async () => {
    if (fields.phoneNumber !== "" && fields.phoneNumber.length === 10) {
      try {
        setLoading(true);
        const result = await APISDK.requestForOTP(fields.phoneNumber);
        // console.log("result request otp", result);
        if (result.status === "success") {
          setid(result?.data?.id);
          setexpiryOtpTime(result?.data?.sdatetime);
          setotpVerifydivShowing(true);
          setLoading(false);
          displayIntervale();
        } else {
          setError(result?.data?.error_msg);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log("in catch");
      }
    } else {
      setError("mobile number should be 10 digits");
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
      setLoading(true);
      const result = await APISDK.handleverifyOtp(
        fields.otp,
        expiryOtpTime,
        id
      );
      // console.log("result verify otp", result);
      if (result.status === "success") {
        setLoading(false);
        navigate("/dashboard");
      } else {
        setError(result?.data?.error_msg);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("in catch");
    }
  };

  // password= "superacute@1234";
  const verifyPwd = async () => {
    if (fields.password.length !== 0 || fields.password !== "") {
      try {
        setLoading(true);
        const result = await APISDK.handleverifyPwd(
          fields.password,
          fields.phoneNumber
        );
        // console.log("result for password", result);
        if (result.status === "success") {
          setLoading(false);
          navigate("/dashboard");
        } else {
          // console.log("in else", result?.data?.error_msg);
          setError(result?.data?.error_msg);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log("in catch");
      }
    } else {
      setLoading(false);
      console.log("Password should not be empty");
    }
  };

  const showPassDiv = () => {
    if (error === "" && fields.phoneNumber.length === 10) {
      setshowPwddiv(true);
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
        <h2>Employee Login</h2>
        <div className="text">
          Login with your registered mobile number to access your Ratnaafin
          account.
        </div>

        {showPwddiv === true ? (
          <div className={classes.formWrap}>
            <form method="post">
              <TextField
                label="Password"
                placeholder="Password for verification"
                autoComplete="off"
                type="password"
                name="password"
                value={fields.password}
                onChange={handleChange("password")}
                // onChange={(e) => setpassword(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                helperText={error ? error : ""}
                error={error ? true : false}
                onBlur={() => setError("")}
              />

              <Button
                onClick={verifyPwd}
                disabled={fields.password !== "" ? false : true}
                endIcon={loading ? <CircularProgress size={20} /> : null}
                className={classes.loginBtn}
              >
                VERIFY & LOGIN
              </Button>
            </form>
          </div>
        ) : otpVerifydivShowing === true ? (
          <div className={classes.formWrap}>
            <form>
              <TextField
                label="OTP"
                placeholder="OTP for verification"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                type="number"
                name="otp"
                value={fields.otp}
                onChange={handleChange("otp")}
                // onChange={(e) => setotp(e.target.value)}
                autoComplete="off"
                inputProps={{ maxLength: 6 }}
                helperText={error ? error : ""}
                error={error ? true : false}
                onBlur={() => setError("")}
              />
              <Timer time={time} />
              <Button
                disabled={fields.otp.length !== 6 ? true : false}
                onClick={verifyOtp}
                className={classes.loginBtn}
              >
                VERIFY & LOGIN
              </Button>
            </form>
          </div>
        ) : (
          <div className={classes.formWrap}>
            <form method="post">
              <TextField
                label="Mobile Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                placeholder="Enter mobile number to get OTP"
                fullWidth
                className="mobileNumber"
                type="number"
                name="phoneNumber"
                autoComplete="off"
                defaultValue={fields.phoneNumber}
                onChange={handleChange("phoneNumber")}
                // onChange={(e) => setphoneNumber(e.target.value)}
                helperText={error ? error : ""}
                error={error ? true : false}
                onBlur={() => setError("")}
              />
              <Button
                onClick={requestOtp}
                endIcon={loading ? <CircularProgress size={20} /> : null}
                className={classes.loginBtn}
              >
                Login With OTP
              </Button>

              <Box display="flex" justifyContent="center" width={1}>
                <div className="text text-center">Or</div>
              </Box>

              <Button onClick={showPassDiv} className={classes.loginBtn}>
                Login With Password
              </Button>
            </form>
          </div>
        )}
      </Box>
    </Box>
  );
};
