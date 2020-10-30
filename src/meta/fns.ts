import { OptionsProps } from "components/common/types";

let token = "Bearer eaf78a37-d2f1-45cc-90a9-0fad6159af95";
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
  const { status, data } = await commonFetcher(false, "./get_sub_product", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
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
  const { status, data } = await commonFetcher(false, "./get_property_city", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
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
  const { status, data } = await commonFetcher(false, "./getBankList", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
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
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
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

// getOtherSourceIncome = getMiscVal("INCOME_SOURCE");
// getResidentialStatus = getMiscVal("RESI_STATUS");
// getWorkExpList = getMiscVal("PROF_YEARS");
// getBusinessNatureList = getMiscVal("BUSINESS_NATURE");
// getIndustryTypeList = getMiscVal("INDUSTRY_TYPE");
// getFirmTypeList = getMiscVal("FIRM_TYPE");
// getCurrenProfessionList = getMiscVal("PROFESSION");
// getCurrenProfessionYears = getMiscVal("PROF_YEARS");
// getProjectType = getMiscVal("PROJECT_TYPE");

/*comment by Milan Pithiya Please use getMiscVal Function don't create seperate function for misc
export async function getTotalExp(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "EXPERI_YEARS",
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

export async function getOtherSourceIncome(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "INCOME_SOURCE",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((incomeSource) => ({
        value: incomeSource?.data_val,
        label: incomeSource?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getResidentialStatus(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "RESI_STATUS",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((resiStatus) => ({
        value: resiStatus?.data_val,
        label: resiStatus?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getPropertyTypeList(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "PROPERTY_TYPE",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((resiStatus) => ({
        value: resiStatus?.data_val,
        label: resiStatus?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getCurrenProfessionList(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "PROFESSION",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((currentProfession) => ({
        value: currentProfession?.data_val,
        label: currentProfession?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getCurrenProfessionYears(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "PROF_YEARS",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((currentProfessionYears) => ({
        value: currentProfessionYears?.data_val,
        label: currentProfessionYears?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getFirmTypeList(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "FIRM_TYPE",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((firmType) => ({
        value: firmType?.data_val,
        label: firmType?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getWorkExpList(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "PROF_YEARS",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((workExp) => ({
        value: workExp?.data_val,
        label: workExp?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getBusinessNatureList(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "BUSINESS_NATURE",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((BusNature) => ({
        value: BusNature?.data_val,
        label: BusNature?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getIndustryTypeList(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "INDUSTRY_TYPE",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((IndType) => ({
        value: IndType?.data_val,
        label: IndType?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}

export async function getProjectType(): Promise<OptionsProps[]> {
  const { status, data } = await commonFetcher(false, "./getmiscval", {
    method: "POST",
    headers: new Headers({
      Authorization: token,
    }),
    body: JSON.stringify({
      action: "get_misc_val",
      request_data: {
        category_nm: "PROJECT_TYPE",
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    if (Array.isArray(data.response_data)) {
      const newArray = data.response_data.map((ProjectType) => ({
        value: ProjectType?.data_val,
        label: ProjectType?.display_val,
      }));
      return newArray;
    } else {
      return [
        {
          label: "Something went wrong..",
          value: 1,
        },
      ];
    }
  } else {
    return [
      {
        label: "Oops..",
        value: 1,
      },
    ];
  }
}
*/

//   .then(res => {
//       console.log(res)
//     for (let i = 0; i < res.response_data.length; i++) {
//       newData.push({
//         value: res.response_data[i].data_val,label: res.response_data[i].display_val
//       });
//     }
//     newDataValu = newData;
//   })
//   .catch(error => {
//     console.error('There was an error!', error);
//   });
// return new Promise((res) => {
//     setTimeout(()=> {
//       {
//         newDataValu.map((dataValue)=> {
//           res([
//             {label: dataValue.label, value: dataValue.value}
//           ])
//         })
//       }
//     },500)
