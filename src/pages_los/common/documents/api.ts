import { LOSSDK, DOCCRUDTYPE } from "registry/fns/los";

export const uploadDocuments = ({
  moduleType,
  productType,
  docCategory,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (
  data: FormData,
  progressHandler: any = () => {},
  completeHandler: any = () => {}
) => {
  if (!LOSSDK.isAPIInitialized()) {
    return {
      status: "failure",
      data: "Invalid token or API not initialized",
    };
  }
  const newURL = new URL(
    Boolean(productType)
      ? `./${moduleType}/${productType}/document/${docCategory}/data/post`
      : `./${moduleType}/document/${docCategory}/data/post`,
    LOSSDK.getBaseURL() as URL
  ).href;
  let xhr = new XMLHttpRequest();
  data.append("refID", refID);
  data.append("serialNo", serialNo ?? "");
  xhr.open("POST", newURL, true);
  xhr.setRequestHeader("Authorization", `Bearer ${LOSSDK.getToken()}`);
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      var precentage = Math.round((e.loaded / e.total) * 100);
      progressHandler(precentage);
    } else {
      progressHandler(Infinity);
    }
  };
  xhr.onload = (e) => {
    try {
      const result = JSON.parse(xhr.responseText);
      if (result.status === "0") {
        completeHandler({ status: "success", data: result?.response_data });
      } else {
        completeHandler({ status: "failure", data: result?.error_data });
      }
    } catch (e) {
      completeHandler({
        status: "failure",
        data: { message: "unknown error occured" },
      });
    }
  };
  xhr.send(data);
};

export const listDocuments = async ({
  moduleType,
  productType,
  docCategory,
  refID,
  serialNo,
}: DOCCRUDTYPE) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${moduleType}/${productType}/document/${docCategory}/data/get`
      : `./${moduleType}/document/${docCategory}/data/get`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
        },
      }),
    }
  );
  if (status === "success") {
    return data?.request_data;
  } else {
    throw data?.error_data;
  }
};

export const deleteDocuments = ({
  moduleType,
  productType,
  docCategory,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (docUUID: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${moduleType}/${productType}/document/${docCategory}/data/delete`
      : `./${moduleType}/document/${docCategory}/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
          docUUID: docUUID,
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

export const updateDocuments = ({
  moduleType,
  productType,
  docCategory,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (updateData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${moduleType}/${productType}/document/${docCategory}/data/put`
      : `./${moduleType}/document/${docCategory}/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
          details: updateData,
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

export const verifyDocuments = ({
  moduleType,
  productType,
  docCategory,
  refID,
  serialNo,
}: DOCCRUDTYPE) => async (
  docUUID: any,
  remarks: any,
  docStatus: "Verify" | "Rejected"
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${moduleType}/${productType}/document/${docCategory}/data/verification`
      : `./${moduleType}/document/${docCategory}/data/verification`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          serialNo: serialNo,
          docUUID: docUUID,
          remarks: remarks,
          status:
            docStatus === "Verify" ? "Y" : docStatus === "Rejected" ? "R" : "X",
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

export const getDocumentGridMetaData = async ({
  moduleType,
  productType,
  docCategory,
  metaDataType,
}) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/document/${docCategory}/metaData/${metaDataType}`,
    {
      body: JSON.stringify({
        request_data: {},
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

export const generateDocumentDownloadURL = ({
  moduleType,
  productType,
  docCategory,
}) => (docUUID) => {
  if (!Array.isArray(docUUID)) {
    docUUID = [docUUID];
  }
  let docs = docUUID.join(",");
  return new URL(
    Boolean(productType)
      ? `./${moduleType}/${productType}/document/${docCategory}/data/download?docUUID=${docs}&tokenID=${LOSSDK.getToken()}`
      : `./${moduleType}/document/${docCategory}/data/download?docUUID=${docs}&tokenID=${LOSSDK.getToken()}`,
    LOSSDK.getBaseURL() as URL
  ).href;
};

export const previewDocument = ({
  moduleType,
  productType,
  docCategory,
}) => async (docUUID) => {
  if (!Array.isArray(docUUID)) {
    docUUID = [docUUID];
  }
  const url = new URL(
    Boolean(productType)
      ? `./${moduleType}/${productType}/document/${docCategory}/data/preview`
      : `./${moduleType}/document/${docCategory}/data/preview`,
    LOSSDK.getBaseURL() as URL
  ).href;
  try {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        request_data: {
          docUUID: docUUID,
        },
      }),
      headers: new Headers({
        Authorization: `Bearer ${LOSSDK.getToken()}`,
        "Content-Type": "application/json",
      }),
    });
    if (String(response.status) === "200") {
      let data = await response.blob();
      return data;
    } else {
      return new Error("Error getting file");
    }
  } catch (e) {
    return e;
  }
};

export const getDocumentCRUDTabsMetadata = async ({
  moduleType,
  productType,
  refID,
}) => {
  const { data, status } = await LOSSDK.internalFetcher(
    Boolean(productType)
      ? `./${moduleType}/${productType}/document/metaData/tabs`
      : `./${moduleType}/document/metaData/tabs`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
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
