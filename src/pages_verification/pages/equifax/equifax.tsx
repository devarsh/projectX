import { Fragment, useEffect, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import { useStyles } from "./style";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import loaderGif from "assets/images/loader.gif";

interface verifyOTPType {
  tokenID: any;
  transactionID: any;
  otp: any;
}

const verifyOTPFn = (verfiyOTPAPI) => async ({
  tokenID,
  transactionID,
  otp,
}: verifyOTPType) => {
  return verfiyOTPAPI(tokenID, transactionID, otp);
};

export const EquifaxVerification = ({ token }) => {
  return null;
};

export const EquifaxVerificationWrapper = () => {
  const { token } = useParams();
  const classes = useStyles();
  const verifyToken = useQuery<any, any, any>(
    "verifyToken",
    () => API.verifyToken(token),
    {
      cacheTime: 0,
      retry: 0,
    }
  );
  return verifyToken.isFetching || verifyToken.isLoading ? (
    <img src={loaderGif} width="50px" height="50px" />
  ) : verifyToken.isError ? (
    <span>{verifyToken.error?.error_msg ?? "unknown Error occured"}</span>
  ) : (
    <div className={classes.paper}>
      <div className={classes.paper2}>
        <EquifaxVerification token={token} />
      </div>
    </div>
  );
};
