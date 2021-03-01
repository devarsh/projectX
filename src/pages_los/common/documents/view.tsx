import { useContext, useEffect, useState } from "react";
import {
  PDFViewer,
  ImageViewer,
  NoPreview,
} from "components/fileUpload/preView";
import { DOCCRUDContext } from "./context";
import loaderGif from "assets/images/loader.gif";

export const PreviewWrapper = ({
  fileType,
  fileName,
  docUUID,
  closeDialog,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { previewDocument } = useContext(DOCCRUDContext);
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (fileType.indexOf("pdf") >= 0 || fileType.indexOf("image") >= 0) {
      setError("Preview Not available");
      setLoading(false);
    }
    setLoading(true);
    previewDocument
      .fn(previewDocument.args)(docUUID)
      .then((blob) => {
        if (blob instanceof Error) {
          setError(blob.message);
        } else {
          const pdfBlob = new Blob([blob], { type: fileType });
          setBlob(pdfBlob);
          setError("");
        }
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(true);
      });
  }, []);
  return loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : Boolean(error) ? (
    <NoPreview onClose={closeDialog} fileName={fileName} message={error} />
  ) : fileType.indexOf("pdf") >= 0 ? (
    //@ts-ignore
    <PDFViewer blob={blob} fileName={fileName} onClose={closeDialog} />
  ) : fileType.indexOf("image") >= 0 ? (
    //@ts-ignore
    <ImageViewer blob={blob} fileName={fileName} onClose={closeDialog} />
  ) : (
    <NoPreview onClose={closeDialog} fileName={fileName} />
  );
};
