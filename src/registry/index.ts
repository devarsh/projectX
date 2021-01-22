import { MiscSDK } from "./fns/misc";
import { CRMSDK } from "./fns/crm";
import { APISDK } from "./fns/sdk";
import { AuthSDK } from "./fns/auth";
import "./fns/registerFns";
import "./yup";
MiscSDK.inititateAPI(
  `${new URL("./misc/", process.env.REACT_APP_API_URL).href}` ?? ""
);
CRMSDK.inititateAPI(
  `${new URL("./crm/", process.env.REACT_APP_API_URL).href}` ?? ""
);
AuthSDK.inititateAPI(
  `${new URL("./auth/", process.env.REACT_APP_API_URL).href}` ?? ""
);

APISDK.createSession(process.env.REACT_APP_API_URL ?? "");
