import { MiscSDK } from "./fns/misc";
import { CRMSDK } from "./fns/crm";
import { AuthSDK } from "./fns/auth";
import { LOSSDK } from "./fns/los";
import { VerificationSDK } from "./fns/verification";
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
LOSSDK.inititateAPI(
  `${new URL("./los/", process.env.REACT_APP_API_URL).href}` ?? ""
);
VerificationSDK.inititateAPI(
  `${new URL("./external/", process.env.REACT_APP_API_URL).href}` ?? ""
);
