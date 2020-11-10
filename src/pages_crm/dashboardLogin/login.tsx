import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { APISDK } from "registry/fns/sdk";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
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
    <Box
      display="flex"
      width={1}
      className="login-form-cover"
      style={{ marginTop: "150px" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className="LoginForm-right"
      >
        <h2>Customer Login</h2>
        <div className="text">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </div>

        {showPwddiv === true ? (
          <div className="form-cover">
            <form method="post">
              <TextField
                className="passwordwithview"
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
              >
                VERIFY & LOGIN
              </Button>
            </form>
          </div>
        ) : otpVerifydivShowing === true ? (
          <div className="form-cover">
            <form>
              <div className="otp-input">
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
              </div>
              <Button
                disabled={otp.length !== 6 ? true : false}
                onClick={verifyOtp}
              >
                VERIFY & LOGIN
              </Button>
            </form>
          </div>
        ) : (
          <div className="form-cover">
            <form method="post">
              <div className="loginMNinput">
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
              </div>
              <Button
                onClick={requestOtp}
                endIcon={loading ? <CircularProgress size={20} /> : null}
              >
                Login With OTP
              </Button>

              <Box display="flex" width={1}>
                <div className="text">Or</div>
              </Box>

              <Button onClick={showPassDiv}>Login With Password</Button>
            </form>
          </div>
        )}
      </Box>
    </Box>
  );
};
