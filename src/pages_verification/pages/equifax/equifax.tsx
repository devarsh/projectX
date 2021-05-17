import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import loaderGif from "assets/images/loader.gif";
import Box from "@material-ui/core/Box";
import * as API from "./api";
import { useStyles } from "../style";
import { Verification } from "./step1";
import { Alternate } from "./step2";
import { Mobile } from "./mobileNo";

interface flowType {
  screen: "INIT" | "Mobile" | "Alternate";
  data?: any;
}

export const EquifaxVerificationWrapper = () => {
  const classes = useStyles();
  const [flow, setFlow] = useState<flowType>({
    screen: "INIT",
  });
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
        {flow.screen === "INIT" ? (
          <Verification token={token} setFlow={setFlow} />
        ) : flow.screen === "Mobile" ? (
          <Mobile setFlow={setFlow} flow={flow} />
        ) : flow.screen === "Alternate" ? (
          <Alternate token={token} flow={flow} />
        ) : null}
      </Box>
    </Box>
  );
};
