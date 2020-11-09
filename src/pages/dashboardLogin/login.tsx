import React, { FC, useState } from "react";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { APISDK } from "registry/fns/sdk";

export interface FormDialogProps {
  submitProps: any;
}

export const LoginForm = () => {
  const [phoneNumber, setphoneNumber] = useState("");
  const [otp, setotp] = useState("");
  const [password, setpassword] = useState("");
  const [divShowing, setdivShowing] = useState(false);
  const [btnShowing, setbtnShowing] = useState(false);
  const [showPwddiv, setshowPwddiv] = useState(false);

  return (
    <Box
      display="flex"
      width={1}
      className="login-form-cover"
      style={{ marginTop: "100px" }}
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
                name="password"
                value={password}
                onChange={(e) =>
                  console.log("sgfgd", setpassword(e.target.value))
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
              <Button className="btn1" type="submit">
                VERIFY & LOGIN
              </Button>
            </form>
          </div>
        ) : divShowing === true ? (
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
                  autoComplete="off"
                  inputProps={{ maxLength: 6 }}
                />
              </div>
              <Button className="btn1" type="submit">
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
                  inputProps={{
                    maxLength: 10,
                  }}
                  placeholder="Enter mobile number to get OTP"
                  fullWidth
                  className="mobileNumber"
                  type="number"
                  name="phoneNumber"
                  autoComplete="off"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                />
              </div>
              <Button
                className="btn1 option-link"
                type="submit"
                onClick={() => APISDK.sendOTP(phoneNumber)}
              >
                Login With OTP
              </Button>

              <Box display="flex" width={1} className="OrLoginWith">
                <div className="text">Or</div>
              </Box>

              <Button className="btn3 option-link">Login With Password</Button>
            </form>
          </div>
        )}
      </Box>
    </Box>
  );
};
