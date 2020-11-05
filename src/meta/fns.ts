import { OptionsProps } from "components/common/types";
import { APISDK as api } from "registry/fns/sdk";

let baseURL = new URL("http://10.0.0.9:8081/users/");

interface CommonFetcherResponse {
  data: any;
  status: "success" | "failure";
}

export async function commonFetcher(
  thirdParty: boolean,
  url: string,
  payload: any
): Promise<CommonFetcherResponse> {
  try {
    const fetcherURL = new URL(url, baseURL);
    let response;
    if (thirdParty) {
      response = await fetch(url, payload);
    } else {
      response = await fetch(fetcherURL.href, payload);
    }
    if (response.status == 200) {
      let data = await response.json();
      if (Array.isArray(data)) {
        data = data[0];
      }
      return {
        status:
          data.status == "0"
            ? "success"
            : data.Status == "Success"
            ? "success"
            : "failure",
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
}

export const getPincode = async (
  pincode: string
): Promise<{ options: OptionsProps[]; others: any }> => {
  const { status, data } = await commonFetcher(
    true,
    `https://api.postalpincode.in/pincode/${pincode}`,
    {
      method: "GET",
      redirect: "follow",
    }
  );
  if (status === "success") {
    if (Array.isArray(data.PostOffice)) {
      //console.log(data.PostOffice);
      const areaArray = data.PostOffice.map((dtl) => ({
        value: dtl?.Name,
        label: dtl?.Name,
      }));
      const otherValues = data.PostOffice.reduce((prev, dtl) => {
        const val = {
          city: dtl.Block,
          district: dtl.District,
          state: dtl.State,
          country: dtl.Country,
        };
        prev[dtl.Name] = val;
        return prev;
      }, {});
      //console.log(areaArray);
      return { options: areaArray, others: otherValues };
    } else {
      return {
        options: [
          {
            label: "oops error loading1..",
            value: 1,
          },
        ],
        others: {},
      };
    }
  } else {
    return {
      options: [
        {
          label: "oops error loading2..",
          value: 1,
        },
      ],
      others: {},
    };
  }
};

export const getProductType = async (
  _: any,
  productCode: string
): Promise<OptionsProps[]> => {
  const accessToken = await api.getAccessToken();
  const { status, data } = await commonFetcher(false, "./get_sub_product", {
    method: "POST",
    headers: new Headers({
      Authorization: accessToken,
    }),
    body: JSON.stringify({
      action: "get_sub_product",
      request_data: {
        code: productCode,
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.sub_prod_code,
        label: one?.sub_prod_desc,
      }));
      return newArray;
    } else {
      return [
        {
          label: "oops error loading..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  }
};

export async function getPropertyCity(): Promise<OptionsProps[]> {
  const accessToken = await api.getAccessToken();
  const { status, data } = await commonFetcher(false, "./get_property_city", {
    method: "POST",
    headers: new Headers({
      Authorization: accessToken,
    }),
    body: JSON.stringify({
      action: "get_property_city",
      request_data: {
        property_city: "",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "oops error loading..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  }
}

export async function getBankList(): Promise<OptionsProps[]> {
  const accessToken = await api.getAccessToken();
  const { status, data } = await commonFetcher(false, "./getBankList", {
    method: "POST",
    headers: new Headers({
      Authorization: accessToken,
    }),
    body: JSON.stringify({
      action: "get_bank_list",
      request_data: {
        get_bank_list: "",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.bank_cd,
        label: one?.bank_name,
      }));
      return newArray;
    } else {
      return [
        {
          label: "oops error loading..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  }
}

export const getMiscVal = (categCode: string) => async (): Promise<
  OptionsProps[]
> => {
  const accessToken = await api.getAccessToken();
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: accessToken,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: categCode,
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((one) => ({
        value: one?.data_val,
        label: one?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "oops error loading..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "oops error loading..",
        value: 1,
      },
    ];
  }
};
