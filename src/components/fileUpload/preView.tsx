import { useState, Fragment, FC, useEffect, useRef } from "react";
import { FileListType } from "./type";
import { Document, Page, pdfjs } from "react-pdf";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import { downloadFile } from "./utils";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
//this should be the same version as pdfjs version
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdn.bootcss.com/pdf.js/2.5.207/pdf.worker.js";

export const PdfViewer: FC<{ fileObj: FileListType }> = ({ fileObj }) => {
  const urlObj = useRef(
    typeof fileObj?.file === "object"
      ? URL.createObjectURL(fileObj?.file)
      : fileObj?.file
  );
  const [numPages, setNumPages] = useState(0);
  useEffect(() => {
    return () => URL.revokeObjectURL(urlObj.current);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const pages = renderPages(numPages);
  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileObj.name}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton color="primary" onClick={() => downloadFile(fileObj)}>
          <GetAppRoundedIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Document
          file={urlObj.current}
          onLoadSuccess={onDocumentLoadSuccess}
          externalLinkTarget="_blank"
        >
          {pages}
        </Document>
      </DialogContent>
    </Fragment>
  );
};

const renderPages = (number) => {
  if (number <= 0) {
    return null;
  }
  let result: JSX.Element[] = [];
  for (let i = 1; i < number + 1; i++) {
    result.push(
      <>
        <Page key={i} pageNumber={i} wrap={false} />
        <div style={{ margin: "5px" }} />
      </>
    );
  }
  return result;
};

export const ImageViewer = ({ fileObj }) => {
  const urlObj = useRef(
    typeof fileObj?.file === "object"
      ? URL.createObjectURL(fileObj?.file)
      : fileObj?.file
  );
  useEffect(() => {
    return () => URL.revokeObjectURL(urlObj.current);
  }, []);
  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileObj.name}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton color="primary" onClick={() => downloadFile(fileObj)}>
          <GetAppRoundedIcon />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <img width="60%" src={urlObj.current} />
      </DialogContent>
    </Fragment>
  );
};

export const NoPreview = () => (
  <Typography variant="h6">Preview Not Available</Typography>
);
