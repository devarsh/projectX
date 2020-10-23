import { osName } from "react-device-detect";

const RaatnaFinAPI = (APIURL: string) => {
  let sessionObj: any = {
    baseUrl: new URL(APIURL),
    loginStatus: false,
    tokens: "",
  };

  const createSession = async (username: string, password: string) => {
    var myHeaders = new Headers();
    myHeaders.append("mac_id", "null");
    myHeaders.append("client_id", "null");
    myHeaders.append("host_name", "null");
    myHeaders.append("os_name", osName);
    myHeaders.append(
      "Authorization",
      `Basic ${btoa(`ratnaafin-acute-client:ratnaafin-acute-client-secret`)}`
    );
    var formdata = new FormData();
    formdata.append("grant_type", "password");
    formdata.append("username", "UUID");
    formdata.append("password", "Windows 8.1");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    const url = new URL("./oauth/token", sessionObj.baseUrl);
    return fetch(
      url.href,
      //@ts-ignore
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        verifyRequest(result);
      })
      .catch((error) => {
        verifyRequest(error);
      });
  };
  const verifyRequest = (data) => {
    if (data["access_token"] && data["refresh_token"]) {
      sessionObj.loginStatus = true;
      sessionObj.token = data;
    } else {
      sessionObj.loginStatus = false;
    }
  };
  const loginStatus = () => {
    return sessionObj.loginStatus;
  };

  return {
    createSession,
    loginStatus,
  };
};

(async function Self() {
  const API = RaatnaFinAPI("https://digix.aiplsolution.in/ratnaafin/");
  await API.createSession("", "");
  console.log(API.loginStatus());
})();
