import React, { useState } from "react";
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

  const [phoneNumber, setphoneNumber] = useState("");
  const [otp, setotp] = useState("");
  const [password, setpassword] = useState("");
  const [otpVerifydivShowing, setotpVerifydivShowing] = useState(false);
  const [showPwddiv, setshowPwddiv] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [id, setid] = useState("");
  const [expiryOtpTime, setexpiryOtpTime] = useState("");

  const requestOtp = async () => {
    debugger;
    if (phoneNumber !== "" && phoneNumber.length === 10) {
      try {
        setLoading(true);
        const result = await APISDK.requestForOTP(phoneNumber);
        // console.log("result", result);
        if (result.status === "success") {
          setid(result?.data?.id);
          setexpiryOtpTime(result?.data?.sdatetime);
          setotpVerifydivShowing(true);
          setLoading(false);
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

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const result = await APISDK.handleverifyOtp(otp, expiryOtpTime, id);
      if (result.status === "success") {
        setLoading(false);
        navigate("/thankyou");
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
    debugger;
    if (password.length !== 0 || password !== "") {
      try {
        setLoading(true);
        const result = await APISDK.handleverifyPwd(password, phoneNumber);
        // console.log("result for password", result);
        if (result.status === "success") {
          setLoading(false);
          navigate("/thankyou");
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
    if (error === "") {
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
                value={password}
                onChange={(e) => setpassword(e.target.value)}
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
                disabled={password !== "" ? false : true}
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
                value={otp}
                onChange={(e) => setotp(e.target.value)}
                autoComplete="off"
                inputProps={{ maxLength: 6 }}
                helperText={error ? error : ""}
                error={error ? true : false}
                onBlur={() => setError("")}
              />
              <Button
                disabled={otp.length !== 6 ? true : false}
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
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
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

              <Box display="flex" width={1}>
                <div className="text">Or</div>
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
