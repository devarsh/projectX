import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { APISDK } from "registry/fns/sdk";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation } from "react-router-dom";
import loginImg from "assets/images/login.svg";
import { InputMaskCustom } from "components/derived/inputMask";
import { useStyles } from "./style";

import { LoginWithOTP } from "./loginWithOTP";
import { LoginWithPassword } from "./logintWithPassword";

export const CustomerLogin = () => {
  const classes = useStyles();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionID] = useState("");
  const [showOTPPage, setShowOTPPage] = useState(false);
  const [showPasswordPage, setShowPasswordPage] = useState(false);
  const [loading, setLoading] = useState(false);
  let refId = "1044";

  const { state: navigationState } = location;

  //@ts-ignore
  const loginType = navigationState?.metaProps?.action;

  const requestOtp = async () => {
    try {
      setLoading(true);
      const result = await APISDK.requestOTP(refId);

      if (result.status === "success") {
        setLoading(false);
        if (loginType === "customer") {
          setShowOTPPage(true);
        } else {
          setShowPasswordPage(true);
        }
        setTransactionID(result.data.transactionId);
      } else {
        setLoading(false);
        setError(result.data.error_msg);
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
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
          {loginType === "customer" ? (
            <>
              <h2>Cutomer Login</h2>
              <div className="text">
                Login with your registered mobile number to access your
                Ratnaafin account.
              </div>
              <div className={classes.formWrap}>
                <TextField
                  label="Enter Mobile Number"
                  placeholder="Enter Mobile Number"
                  fullWidth
                  type="number"
                  className="mobileNumber"
                  name="phoneNumber"
                  value={userName}
                  onChange={handleChange}
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
                  error={Boolean(error)}
                  helperText={error}
                />
              </div>

              {showOTPPage ? (
                <LoginWithOTP transactionId={transactionId}></LoginWithOTP>
              ) : (
                <div>
                  <Button
                    onClick={requestOtp}
                    disabled={loading ? true : false}
                    endIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    Login With OTP
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              <h2>Employee Login</h2>
              <div className="text">
                Login with your registered mobile email to access your Ratnaafin
                account.
              </div>
              <div className={classes.formWrap}>
                <TextField
                  label="Enter Email"
                  placeholder="Enter Email"
                  fullWidth
                  type="email"
                  className="mobileNumber"
                  name="phoneNumber"
                  value={userName}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(error)}
                  helperText={error}
                />
              </div>
              {showPasswordPage ? (
                <LoginWithPassword userName={userName}></LoginWithPassword>
              ) : (
                <div>
                  <Button
                    onClick={requestOtp}
                    disabled={loading ? true : false}
                    endIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    Login With Password
                  </Button>
                </div>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
