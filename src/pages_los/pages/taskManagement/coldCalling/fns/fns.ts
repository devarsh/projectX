import { LOSSDK } from "registry/fns/los";

export const getProductSubCategory = async (dependentField) => {
  if (!Boolean(dependentField?.categoryID?.value)) {
    return [];
  }
  const { status, data } = await LOSSDK.internalFetcher(
    `./lead/options/getSubProductByValue`,
    {
      body: JSON.stringify({
        request_data: {
          fetchFrom: "PARENT_PRODUCT",
          productCode: dependentField?.categoryID?.value ?? "",
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

export const showSMEProductTypeField = async (_, dependentFields) => {
  if (
    dependentFields["productID"].value === "12300005" ||
    dependentFields["productID"].value === "12300006" ||
    dependentFields["productID"].value === "12300007" ||
    dependentFields["productID"].value === "12300008" ||
    dependentFields["productID"].value === "123000010" ||
    dependentFields["productID"].value === "123000013" ||
    dependentFields["productID"].value === "123000014" ||
    dependentFields["productID"].value === "123000015"
  ) {
    return true;
  }
  return false;
};
