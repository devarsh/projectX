import { LOSSDK } from "registry/fns/los";

export const getProductSubCategory = async (dependentField) => {
  if (!Boolean(dependentField?.productCategory?.value)) {
    return [];
  }
  const { status, data } = await LOSSDK.internalFetcher(
    `./lead/options/getSubProductByValue`,
    {
      body: JSON.stringify({
        request_data: {
          fetchFrom: "PARENT_PRODUCT",
          productCode: dependentField?.productCategory?.value ?? "",
        },
      }),
    }
  );
  if (status === "success" && Array.isArray(data.response_data)) {
    const newArray = data.response_data.map((one) => ({
      value: one?.data_val,
      label: one?.display_val,
    }));
    return newArray;
  } else {
    throw data?.error_data;
  }
};

export const showSubProductTypeField = async (_, dependentFields) => {
  if (
    dependentFields["productType"].value === "123400021" ||
    dependentFields["productType"].value === "123400022"
  ) {
    return false;
  }
  return true;
};
