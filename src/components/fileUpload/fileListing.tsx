import { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { FileListingControlType } from "./type";
import { computeSize } from "./utils";

export const FileListing: FC<FileListingControlType> = ({
  files,
  dense,
  handleDeleteFile = () => false,
  disabled,
}) => {
  let renderedFiles = [<div key="nada">No Files Selected for upload</div>];
  if (Array.isArray(files) && files.length > 0) {
    renderedFiles = files.map((one, index) => {
      return (
        <ListItem
          key={one.fingerprint ?? index}
          disabled={disabled}
          divider={true}
          dense={dense}
          //@ts-ignore
          button={Boolean(one.rejected) ? false : true}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText
            primary={one?.filePointer?.name}
            primaryTypographyProps={{
              style: Boolean(one.rejected)
                ? {
                    textDecoration: "line-through",
                  }
                : undefined,
            }}
            secondary={
              Boolean(one?.rejected)
                ? one.rejectReason
                : Boolean(one?.filePointer?.size)
                ? computeSize(one?.filePointer?.size)
                : undefined
            }
            secondaryTypographyProps={{
              style: Boolean(one.rejected) ? { color: "red" } : undefined,
            }}
          />
          <ListItemSecondaryAction
            style={{
              pointerEvents: Boolean(disabled) ? "none" : "all",
            }}
            onClick={() => handleDeleteFile(one.fingerprint)}
          >
            <DeleteIcon
              style={{
                opacity: Boolean(disabled) ? 0.5 : 1,
                pointerEvents: Boolean(disabled) ? "none" : "all",
              }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }
  return <List dense={dense}>{renderedFiles}</List>;
};
