import React, { useEffect, useState, useReducer } from "react";
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

  const [fields, setFields] = useState({
    phoneNumber: "",
    otp: "",
    password: "",
    createPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    commonError: "",
    passworderror: "",
  });
  const [otpVerifydivShowing, setotpVerifydivShowing] = useState(false);
  const [showPwddiv, setshowPwddiv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expiryOtpTime, setexpiryOtpTime] = useState("");
  const [time, setTime] = useState(0);
  const [passwordGenerateDiv, setpasswordGenerateDiv] = useState(false);

  let expiryTime = 60;

  const handleChange = (input) => ({ target: { value } }) => {
    debugger;
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

  const requestOtp = async (toVerifyUser) => {
    if (fields.phoneNumber !== "" && fields.phoneNumber.length === 10) {
      try {
        setLoading(true);
        const result = await APISDK.requestForOTP(fields.phoneNumber);
        // console.log("result request otp", result);
        if (result.status === "success") {
          setErrors({ ...errors, commonError: result?.data?.error_msg });
          setexpiryOtpTime(result?.data?.sdatetime);
          setotpVerifydivShowing(true);
          setLoading(false);
          displayIntervale();
        } else {
          setErrors({ ...errors, commonError: result?.data?.error_msg });
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log("in catch");
      }
    } else {
      setErrors({
        ...errors,
        commonError: "mobile number should be 10 digits",
      });
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

  const verifyOtp = async (toVerifyUser) => {
    debugger;
    try {
      setLoading(true);
      const result = await APISDK.handleverifyOtp(
        fields.phoneNumber,
        fields.otp
      );
      // console.log("result verify otp", result);
      if (result.status === "success") {
        setLoading(false);
        if (toVerifyUser === "Yes") {
          setshowPwddiv(false);
          setpasswordGenerateDiv(true);
        } else {
          navigate("/dashboard");
        }
      } else {
        setErrors({ ...errors, commonError: result?.data?.error_msg });
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
          setErrors({ ...errors, commonError: result?.data?.error_msg });
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
    if (errors.commonError === "" && fields.phoneNumber.length === 10) {
      setshowPwddiv(true);
    }
  };

  const updateNewPassword = async () => {
    if (
      fields.createPassword !== "" &&
      fields.confirmPassword !== "" &&
      fields.createPassword === fields.confirmPassword
    ) {
      try {
        setLoading(true);
        const result = await APISDK.updateUserPassword(
          fields.password,
          fields.phoneNumber
        );
        // console.log("result for password", result);
        if (result.status === "success") {
          setLoading(false);
          navigate("/dashboard");
        } else {
          setErrors({ ...errors, passworderror: result?.data?.error_msg });
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log("in catch");
      }
    } else {
      setLoading(false);
      if (fields.createPassword === "" && fields.confirmPassword === "") {
        setErrors({ ...errors, passworderror: "Password should not be empty" });
      } else {
        setErrors({ ...errors, passworderror: "Password not matched" });
      }
    }
  };

  const checkUserNumberAndPasswordExist = async () => {
    if (errors.commonError === "" && fields.phoneNumber.length === 10) {
      debugger;
      try {
        setLoading(true);
        const result = await APISDK.checkPhoneNumberExists(fields.phoneNumber);
        console.log("checkUserNumberAndPasswordExist", result);
        if (result.status === "success") {
          if (
            result?.data?.user_mobile === "Y" &&
            result?.data?.user_password === "N"
          ) {
            var toVerifyUser = "Yes";
            setLoading(false);
            requestOtp(toVerifyUser);
            // setshowPwddiv(false);
            // setpasswordGenerateDiv(true);
          } else if (
            result?.data?.user_mobile === "Y" &&
            result?.data?.user_password === "Y"
          ) {
            setshowPwddiv(true);
            setLoading(false);
          }
          setLoading(false);
        } else {
          if (result?.data?.error_cd === "-999") {
            setErrors({ ...errors, commonError: result?.data?.error_msg });
            setLoading(false);
          }
        }
      } catch (e) {
        setLoading(false);
        console.log("in catch");
      }
    } else {
      setLoading(false);
      setErrors({ ...errors, commonError: "Please enter valid mobile number" });
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
        <h2>Cutomer Login</h2>
        <div className="text">
          Login with your registered mobile number to access your Ratnaafin
          account.
        </div>

        {showPwddiv === true ? (
          <div className={classes.formWrap}>
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
              helperText={errors.commonError ? errors.commonError : ""}
              error={errors.commonError ? true : false}
              onBlur={() => setErrors({ ...errors, commonError: "" })}
            />

            <Button
              onClick={verifyPwd}
              disabled={fields.password !== "" ? false : true}
              endIcon={loading ? <CircularProgress size={20} /> : null}
              className={classes.loginBtn}
            >
              VERIFY & LOGIN
            </Button>
          </div>
        ) : otpVerifydivShowing === true ? (
          <div className={classes.formWrap}>
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
              inputProps={{ maxLength: 6 }}
              error={Boolean(errors.commonError)}
              helperText={
                Boolean(errors.commonError) ? errors.commonError : null
              }
              onBlur={() => setErrors({ ...errors, commonError: "" })}
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
              disabled={fields.otp.length !== 6 ? true : false}
              onClick={verifyOtp}
              className={classes.loginBtn}
            >
              VERIFY & LOGIN
            </Button>
          </div>
        ) : passwordGenerateDiv === true ? (
          <div className={classes.formWrap}>
            <TextField
              label="New Password"
              placeholder="Enter new password"
              autoComplete="off"
              type="password"
              name="createPassword"
              value={fields.createPassword}
              onChange={handleChange("createPassword")}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              helperText={errors.passworderror ? errors.passworderror : ""}
              error={errors.passworderror ? true : false}
              onBlur={() => setErrors({ ...errors, passworderror: "" })}
            />

            <TextField
              label="Confirm Password"
              placeholder="Enter confirm password"
              autoComplete="off"
              type="password"
              name="confirmPassword"
              value={fields.confirmPassword}
              onChange={handleChange("confirmPassword")}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              helperText={errors.passworderror ? errors.passworderror : ""}
              error={errors.passworderror ? true : false}
              onBlur={() => setErrors({ ...errors, passworderror: "" })}
            />

            <Button
              onClick={updateNewPassword}
              disabled={
                fields.createPassword !== "" || fields.confirmPassword !== ""
                  ? false
                  : true
              }
              endIcon={loading ? <CircularProgress size={20} /> : null}
              className={classes.loginBtn}
            >
              VERIFY & LOGIN
            </Button>
          </div>
        ) : (
          <div className={classes.formWrap}>
            <TextField
              label="Mobile Number"
              placeholder="Enter mobile number"
              fullWidth
              className="mobileNumber"
              type="email"
              name="phoneNumber"
              value={fields.phoneNumber}
              onChange={handleChange("phoneNumber")}
              error={Boolean(errors.commonError)}
              helperText={
                Boolean(errors.commonError) ? errors.commonError : null
              }
              onBlur={() => setErrors({ ...errors, commonError: "" })}
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
              endIcon={loading ? <CircularProgress size={20} /> : null}
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
        )}
      </Box>
    </Box>
  );
};
