import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { APISDK } from "registry/fns/sdk";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams, useNavigate } from "react-router-dom";
import loginImg from "assets/images/login.svg";
import { useStyles } from "./style";
import { LoginWithOTPOrPwd } from "./loginOtpPassword";

export const CustomerLogin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const [userName, setUserName] = useState("");
  const [passwordOrOTP, setPasswordOrOTP] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionId, setTransactionID] = useState("");
  const [showOTPPage, setShowOTPPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginType = params["type"];

  const requestOtp = async () => {
    try {
      setLoading(true);
      const result = await APISDK.authCustomerPartnerOtpRequest(
        userName,
        loginType
      );
      if (result.status === "success") {
        setLoading(false);
        setShowOTPPage(true);
        setTransactionID(result.data.transactionId);
      } else {
        setLoading(false);
        setError(result?.data?.error_msg ?? "Unknown error occured");
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  const verifyOtp = async () => {
    setErrorMessage("");
    if (passwordOrOTP.length === 6 && passwordOrOTP !== "") {
      try {
        setLoading(true);
        const result = await APISDK.authCustomerPartnerOtpVerify(
          transactionId,
          passwordOrOTP,
          loginType
        );
        if (result.status === "success") {
          setLoading(false);
          navigate("./dashboard");
        } else {
          setLoading(false);
          setErrorMessage(result?.data?.error_msg ?? "Unknown error occured");
        }
      } catch (e) {
        setLoading(false);
        setErrorMessage(e.message);
      }
    } else {
      setErrorMessage("OTP should be 6 digits only..");
    }
  };

  const verifyPwd = async () => {
    setErrorMessage("");
    try {
      setLoading(true);
      const result = await APISDK.verifyPwd(userName, passwordOrOTP);
      if (result.status === "success") {
        setLoading(false);
        navigate("./dashboard");
      } else {
        setLoading(false);
        setErrorMessage(result?.data?.error_msg ?? "Unknown error occured");
      }
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.message);
    }
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleOTPOrPassword = (e) => {
    setPasswordOrOTP(e.target.value);
  };

  return (
    <>
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
          <>
            {loginType === "customer" ? (
              <h2>Cutomer Login</h2>
            ) : (
              <h2>Employee Login</h2>
            )}
            <div className="text">
              Login with your registered{" "}
              {`${loginType === "employee" ? "Email ID " : " Mobile Number "}`}
              to access your Ratnaafin account.
            </div>
            <div className={classes.formWrap}>
              <TextField
                label="Enter UserID"
                placeholder="Enter UserID"
                fullWidth
                type={loginType === "customer" ? "number" : "email"}
                className="mobileNumber"
                name="phoneNumber"
                value={userName}
                onChange={handleChange}
                error={Boolean(error)}
                helperText={error}
                InputLabelProps={{ shrink: true }}
              />
            </div>

            {showOTPPage ? (
              <LoginWithOTPOrPwd
                verifyOTPMethod={verifyOtp}
                verifyPasswordMethod={verifyPwd}
                handleChange={handleOTPOrPassword}
                value={passwordOrOTP}
                loginType={loginType}
                errorMessage={errorMessage}
                loading={loading}
              ></LoginWithOTPOrPwd>
            ) : (
              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button
                  onClick={requestOtp}
                  disabled={loading ? true : false}
                  endIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        </Box>
      </Box>
    </>
  );
};
