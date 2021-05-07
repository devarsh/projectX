import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import Box from "@material-ui/core/Box";
import * as API from "./api";
import { useStyles } from "../style";
import { Verification1 } from "./equifaxStep1";

export const EquifaxVerificationWrapper = () => {
  const classes = useStyles();
  const [registeredNumberScreen, setRegisteredNumberScreen] = useState(true);
  const { token } = useParams();
  const verifyToken = useQuery<any, any, any>(
    "verifyToken",
    () => API.verifyToken(token),
    {
      cacheTime: 0,
      retry: 0,
    }
  );
  return verifyToken.isFetching || verifyToken.isLoading ? (
    <img src={loaderGif} width="50px" height="50px" alt="loader" />
  ) : verifyToken.isError ? (
    <span>{verifyToken.error?.error_msg ?? "unknown Error occured"}</span>
  ) : (
    <Box display="flex" width={1} className={classes.wrapper}>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginRight}
      >
        {registeredNumberScreen ? (
          <Verification1
            token={token}
            setRegisteredNumberScreen={setRegisteredNumberScreen}
          />
        ) : null}
      </Box>
    </Box>
  );
};
