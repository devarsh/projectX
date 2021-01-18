import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField } from "components/styledComponent/textfield";
import Button from "@material-ui/core/Button";
import { APISDK } from "registry/fns/sdk";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./style";

export const LoginWithPassword = ({ userName }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [password, sePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyPwd = async () => {
    try {
      setLoading(true);
      const result = await APISDK.verifyPwd(userName, password);
      if (result.status === "success") {
        setLoading(false);
        navigate("/thankyou");
      } else {
        setLoading(false);
        setError(result.data.error_msg);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleChange = (e) => {
    sePassword(e.target.value);
  };

  // password= "superacute@1234";

  return (
    <div className={classes.formWrap}>
      <TextField
        label="Password"
        placeholder="Enter Password"
        autoComplete="off"
        type="password"
        name="password"
        value={password}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
        fullWidth
        error={Boolean(error)}
        helperText={error}
      />

      <Button
        onClick={verifyPwd}
        disabled={password !== "" ? false : true}
        endIcon={loading ? <CircularProgress size={20} /> : null}
        className={classes.loginBtn}
      >
        LOGIN
      </Button>
    </div>
  );
};
