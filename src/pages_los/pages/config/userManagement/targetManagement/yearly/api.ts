import { LOSSDK } from "registry/fns/los";
import { YearlyTargetGridMetaData } from "./yearlyTargetGridMetadata";

export interface TargetCRUDTYPE {
  moduleType: string;
  productType: string;
  userID?: string;
  serialNo?: string;
}

export const insertUserData = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async (formData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/post`,
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
          ...formData,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getTargetGridData = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
        },
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const deleteTarget = ({
  moduleType,
  productType,
}: TargetCRUDTYPE) => async (serialNo: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          serialNo: serialNo,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const updateYearlyTargetData = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async (formData: any, serialNo?: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          userID: userID,
          serialNo: serialNo,
          ...formData,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getGridFormMetaData = () => async () => YearlyTargetGridMetaData;

export const getFormMetaData = ({
  moduleType,
  productType,
  userID,
}: TargetCRUDTYPE) => async (metadataType: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/${productType}/metadata/${metadataType}`,
    {
      body: JSON.stringify({
        request_data: {
          refID: userID,
        },
      }),
    }
  );
  if (status === "success") {
    const productTypes = [
      "retailVolume",
      "smeVolume",
      "infraVolume",
      "unsecuredVolume",
      "insuranceVolume",
    ];
    const ownProducts = ["retailVolume", "smeVolume"];
    transFormData(data?.response_data, productTypes, ownProducts);

    return transFormData;
  } else {
    throw data?.error_data;
  }
};

const transFormData = (metadata, others, ownProducts) => {
  let fields = metadata?.fields;
  let crossMetadata: any = [];

  let myMetaData = others.filter(function (myNew) {
    if (ownProducts.indexOf(myNew) >= 0) {
      return true;
    } else {
      crossMetadata.push(myNew);
      return false;
    }
  });
  let myNewMetadata = fields.filter((one) => {
    if (myMetaData.indexOf(one.name) >= 0) {
      return true;
    }
  });
  let crosNewMetadata = fields.filter((one) => {
    if (crossMetadata.indexOf(one.name) >= 0) {
      return true;
    }
  });
  let otherData = fields.filter((one) => {
    if (
      myNewMetadata.indexOf(one) === -1 &&
      crosNewMetadata.indexOf(one) === -1
    ) {
      return true;
    }
  });

  var crossMetadataGroup = crosNewMetadata.map((someValue) => {
    someValue.render.group = 2;
    return someValue;
  });

  let finalFields: any = [
    ...myNewMetadata,
    ...crossMetadataGroup,
    ...otherData,
  ];
  let finalMetaData = {
    form: metadata?.form,
    fields: finalFields,
  };
  if (crosNewMetadata.length > 0) {
    finalMetaData.form.render.groups = {
      ...finalMetaData.form.render.groups,
      2: "Cross",
    };
  }
  console.log(finalMetaData);
  return finalFields;
};
