import { Fragment, FC, useEffect, useRef } from "react";
import { FileListType } from "./type";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import { downloadFile } from "./utils";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export const PdfViewer: FC<{ fileObj: FileListType }> = ({ fileObj }) => {
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
        <object
          data={`${urlObj.current}#zoom=100&toolbar=0&statusbar=0&navpanes=0`}
          type="application/pdf"
          height="100%"
          width="100%"
        />
      </DialogContent>
    </Fragment>
  );
};

export const ImageViewer: FC<{ fileObj: FileListType }> = ({ fileObj }) => {
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
