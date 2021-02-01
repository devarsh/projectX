import { OptionsProps } from "components/common/types";
import { CommonFetcherResponse } from "../type";

const MiscAPI = () => {
  let baseURL: URL | null = null;
  const inititateAPI = (APIURL: string) => {
    baseURL = new URL(APIURL);
  };
  const internalFetcher = async (
    url: string,
    payload: any
  ): Promise<CommonFetcherResponse> => {
    try {
      if (baseURL === null) {
        return {
          status: "failure",
          data: "API not inititated",
        };
      }
      let response = await fetch(new URL(url, baseURL).href, {
        method: "GET",
        ...payload,
      });
      if (String(response.status) === "200") {
        let data = await response.json();
        return {
          status: String(data.status) === "0" ? "success" : "failure",
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

  //dropdown value - dynamic form
  const getMiscVal = (categCode: string) => async (): Promise<
    OptionsProps[]
  > => {
    const { status, data } = await internalFetcher(`./data/${categCode}`, {});
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

  //dropdown value - dynamic form
  const getProductType = async (
    _: any,
    formState: any
  ): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher(
      `./productType/${formState?.formCode}`,
      {}
    );
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

  //dropdown value - dynamic form
  const getSubProductDtl = async (fieldData) => {
    if (fieldData.value.length !== 0) {
      let codes = await getProductType(null, { formCode: fieldData.value });
      return {
        subProductType: {
          options: codes,
          value: "00",
        },
      };
    } else if (fieldData.value === "") {
      return {
        subProductType: {
          options: [],
          value: "",
        },
      };
    }
  };

  //dropdown value - dynamic form
  const getPropertyCity = async (): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher("./propertyCityList", {});
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

  //dropdown value - dynamic form
  const getBankList = async (): Promise<OptionsProps[]> => {
    const { status, data } = await internalFetcher("./bankList", {});
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

  //dropdown value - dynamic form
  const getPincodeExternal = async (
    pincode: string
  ): Promise<{ options: OptionsProps[]; others: any }> => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
        {
          method: "GET",
          redirect: "follow",
        }
      );
      let data = await response.json();
      if (Array.isArray(data) && data.length === 1) {
        let result = data[0];
        if (String(result.Status).toLowerCase() === "success") {
          let areaArray = result.PostOffice.map((dtl) => ({
            value: dtl?.Name,
            label: dtl?.Name,
          }));
          areaArray = [{ label: "Select option", value: "00" }, ...areaArray];
          const otherValues = result.PostOffice.reduce(
            (accumlator, current) => {
              const val = {
                city: current.Block,
                district: current.District,
                state: current.State,
                country: current.Country,
              };
              accumlator[current.Name] = val;
              return accumlator;
            },
            {}
          );
          return { options: areaArray, others: otherValues };
        }
      }
      return {
        options: [{ label: "Error fetching pincode", value: "0" }],
        others: null,
      };
    } catch (e) {
      return {
        options: [{ label: "Error fetching pincode", value: "0" }],
        others: null,
      };
    }
  };

  return {
    inititateAPI,
    getMiscVal,
    getProductType,
    getSubProductDtl,
    getPropertyCity,
    getBankList,
    getPincodeExternal,
  };
};

export const MiscSDK = MiscAPI();
