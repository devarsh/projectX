import { useContext, useEffect } from "react";
import { CAMContext } from "./context";
import { downloadFile } from "pages_los/common/download";

export const DownloadCAM = ({ serialNo, closeDialog }) => {
  const { previewCAM } = useContext(CAMContext);
  const url = previewCAM.fn(previewCAM.args)({ serialNo: serialNo });
  useEffect(() => {
    downloadFile(url, `download-${new Date().getUTCMilliseconds()}`);
    closeDialog();
  }, [url]);
  return null;
};
