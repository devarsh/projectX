import { FC, useState, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import { FileListingControlType, FileListType } from "./type";
import { computeSize, downloadFile } from "./utils";
import { PdfViewer, ImageViewer, NoPreview } from "./preView";

export const FileListing: FC<FileListingControlType> = ({
  files,
  dense,
  handleDeleteFile = () => false,
  disabled,
}) => {
  const [currentView, setCurrentView] = useState<FileListType | null>(null);
  const handleDialogClose = () => {
    setCurrentView(null);
  };
  if (Array.isArray(files) && files.length > 0) {
    let renderedFiles = files.map((one) => (
      <FileListItem
        key={one.fingerprint}
        dense={dense}
        fileObj={one}
        disabled={disabled}
        handleDeleteFile={handleDeleteFile}
        setCurrentView={setCurrentView}
      />
    ));
    return (
      <Fragment>
        <List dense={dense}>{renderedFiles}</List>
        <Dialog
          open={currentView !== null}
          onClose={handleDialogClose}
          maxWidth="md"
        >
          {currentView !== null ? (
            currentView?.mimeType.indexOf("pdf") > -1 ? (
              <PdfViewer
                key={currentView?.fingerprint}
                fileObj={currentView as FileListType}
              />
            ) : currentView?.mimeType.indexOf("image") > -1 ? (
              <ImageViewer
                key={currentView?.fingerprint}
                fileObj={currentView as FileListType}
              />
            ) : (
              <NoPreview key={currentView?.fingerprint} />
            )
          ) : null}
        </Dialog>
      </Fragment>
    );
  }
  return null;
};

const FileListItem: FC<{
  fileObj: FileListType;
  disabled: boolean | undefined;
  dense: boolean | undefined;
  handleDeleteFile: any;
  setCurrentView: any;
}> = ({ fileObj, disabled, dense, handleDeleteFile, setCurrentView }) => {
  return (
    <ListItem
      key={fileObj.fingerprint}
      disabled={disabled}
      divider={true}
      dense={dense}
      //@ts-ignore
      button={Boolean(fileObj.rejected) ? false : true}
      onClick={() => setCurrentView(fileObj)}
    >
      <ListItemIcon>
        <FolderOpenRoundedIcon />
      </ListItemIcon>
      <ListItemText
        primary={fileObj?.name}
        primaryTypographyProps={{
          style: Boolean(fileObj.rejected)
            ? {
                textDecoration: "line-through",
              }
            : undefined,
        }}
        secondary={
          Boolean(fileObj.rejected)
            ? fileObj.rejectReason
            : Boolean(fileObj?.size)
            ? computeSize(fileObj?.size)
            : undefined
        }
        secondaryTypographyProps={{
          style: Boolean(fileObj.rejected) ? { color: "red" } : undefined,
        }}
      />
      <ListItemSecondaryAction
        style={{
          pointerEvents: Boolean(disabled) ? "none" : "all",
        }}
      >
        <GetAppRoundedIcon
          style={{
            opacity: Boolean(disabled) ? 0.5 : 1,
            pointerEvents: Boolean(disabled) ? "none" : "all",
          }}
          onClick={() => downloadFile(fileObj)}
        />
        <DeleteRoundedIcon
          style={{
            opacity: Boolean(disabled) ? 0.5 : 1,
            pointerEvents: Boolean(disabled) ? "none" : "all",
          }}
          onClick={() => handleDeleteFile(fileObj.fingerprint)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
