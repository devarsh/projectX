import { useEffect } from "react";

import { downloadFile } from "pages_los/common/download";
import { generateDocumentDownloadURL } from "../api";

export const Download = ({ closeDialog, row, moduleType }) => {
  const requestType = row?.data?.requestType;
  const transactionID = row?.data?.perfiosTransactionID;
  useEffect(() => {
    let url = generateDocumentDownloadURL(
      moduleType,
      requestType,
      transactionID
    );
    downloadFile(url, transactionID);
    closeDialog();
  }, [closeDialog, moduleType, requestType, transactionID]);
  return null;
};
