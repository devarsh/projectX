import { v4 } from "uuid";
import { osName, osVersion } from "react-device-detect";
import path from "path";

const RaatnaFinAPI = (APIURL: string) => {
  let sessionObj: any = {
    loginStatus: false,
  };
  const createSession = async (username: string, password: string) => {
    var myHeaders = new Headers();
    myHeaders.append("mac_id", "null");
    myHeaders.append("client_id", "null");
    myHeaders.append("host_name", "null");
    myHeaders.append("os_name", osName);
    myHeaders.append(
      "Authorization",
      `Basic ${btoa(`${username}:${password}`)}`
    );

    var formdata = new FormData();
    formdata.append("grant_type", "password");
    formdata.append("username", username);
    formdata.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      mode: "cors",
    };

    return new Promise((res, rej) => {
      fetch(
        "https://ratnaafin.aiplservices.com/ratnaafin/oauth/token",
        //@ts-ignore
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          verifyRequest(result);
          res(true);
        })
        .catch((error) => {
          verifyRequest(error);
          res(true);
        });
    });
  };
  const verifyRequest = (data) => {
    if (data["access_token"] && data["refresh_token"]) {
      sessionObj.loginStatus = true;
      sessionObj.session = data;
    } else {
      sessionObj.loginStatus = false;
    }
  };
  const printSession = () => {
    console.log(sessionObj);
  };
  const loginStatus = () => {
    console.log(sessionObj.loginStatus);
  };

  return {
    createSession,
    printSession,
    loginStatus,
  };
};

(async function Self() {
  const API = RaatnaFinAPI("");
  await API.createSession("UUID", "Windows 8.1");
  console.log(API.printSession());
})();
