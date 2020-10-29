import { OptionsProps } from "components/common/types";
import {
  getBankList,
  getPincode,
  getProductType,
  getPropertyCity,
} from "meta/fns";
import { osName } from "react-device-detect";

interface CommonFetcherResponse {
  data: any;
  status: "success" | "failure";
}
type ExternalResponse = any;

const RaatnaFinAPI = (APIURL: string) => {
  let sessionObj: any = {
    baseUrl: new URL(APIURL),
    loginStatus: false,
    tokens: "",
  };

  const externalFetcher = async (
    url: string,
    payload: any
  ): Promise<ExternalResponse> => {
    try {
      let response = await fetch(url, payload);
      let data = await response.json();
      return data;
    } catch (e) {
      return new Error(`Error fetching data-${e.message}`);
    }
  };
  const getPincode = async (
    pincode: string
  ): Promise<{ options: OptionsProps[]; others: any }> => {
    const data = await externalFetcher(
      `https://api.postalpincode.in/pincode/${pincode}`,
      {
        method: "GET",
        redirect: "follow",
      }
    );
    if (Array.isArray(data) && data.length === 1) {
      let result = data[0];
      if (String(result.status).toLowerCase() === "success") {
        const areaArray = result.PostOffice.map((dtl) => ({
          value: dtl?.Name,
          label: dtl?.Name,
        }));
        const otherValues = result.PostOffice.reduce((accumlator, current) => {
          const val = {
            city: current.Block,
            district: current.District,
            state: current.State,
            country: current.Country,
          };
          accumlator[current.Name] = val;
          return accumlator;
        }, {});
        //console.log(areaArray);
        return { options: areaArray, others: otherValues };
      }
    }
    return {
      options: [{ label: "Error fetching pincode", value: "0" }],
      others: null,
    };
  };

  const createSession = async () => {
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
  const printLoginStatus = () => {
    console.log(sessionObj);
  };
  const internalFetcher = async (
    url: string,
    payload: any
  ): Promise<CommonFetcherResponse> => {
    try {
      if (sessionObj.loginStatus === false) {
        return {
          status: "failure",
          data: new Error("session expired"),
        };
      }
      let response = await fetch(new URL(url, sessionObj.baseUrl).href, {
        method: "POST",
        ...payload,
        headers: new Headers({
          Authorization: `Bearer ${sessionObj.token.access_token}`,
        }),
      });
      if (response.status == 200) {
        let data = await response.json();
        return {
          status: data.status == "0" ? "success" : "failure",
          data: data,
        };
      } else {
        return {
          status: "failure",
          data: "",
        };
      }
    } catch (e) {
      return {
        status: "failure",
        data: e,
      };
    }
  };

  const getProductType = async (
    _: any,
    productCode: string
  ): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher("./users/get_sub_product", {
      body: JSON.stringify({
        action: "get_sub_product",
        request_data: {
          code: productCode,
        },
        channel: "W",
      }),
    });
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.sub_prod_code,
        label: one?.sub_prod_desc,
      }));
      return newArray;
    }
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  };
  const getPropertyCity = async (): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher(
      "./users/get_property_city",
      {
        body: JSON.stringify({
          action: "get_property_city",
          request_data: {
            property_city: "",
          },
          channel: "W",
        }),
      }
    );
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
      }));
      return newArray;
    }
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  };
  const getBankList = async (): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher("./users/getBankList", {
      body: JSON.stringify({
        action: "get_bank_list",
        request_data: {
          get_bank_list: "",
        },
        channel: "W",
      }),
    });
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.bank_cd,
        label: one?.bank_name,
      }));
      return newArray;
    }
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  };

  const getMiscVal = (categCode: string) => async (): Promise<
    OptionsProps[]
  > => {
    const { status, data } = await internalFetcher("./users/getmiscval", {
      body: JSON.stringify({
        action: "get_misc_val",
        request_data: {
          category_nm: categCode,
        },
        channel: "W",
      }),
    });
    if (status === "success" && Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
      }));
      return newArray;
    }
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  };

  return {
    createSession,
    loginStatus,
    printLoginStatus,
    getPincode,
    getProductType,
    getPropertyCity,
    getBankList,
    getMiscVal,
  };
};

(async function Self() {
  const API = RaatnaFinAPI("http://10.0.0.9:8081/");
  await API.createSession();
  console.log(API.loginStatus());
  console.log(API.printLoginStatus());

  // let result = await API.getPincode("380015");
  // console.log(result);

  //@ts-ignore
  let productType = await API.getProductType("", "12300001");
  console.log(productType);

  let propertyCity = await API.getPropertyCity();
  console.log(propertyCity);

  let bankList = await API.getBankList();
  console.log(bankList);

  let miscValue = await API.getMiscVal("PROPERTY_TYPE")();
  console.log(miscValue);
})();
