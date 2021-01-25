import { FC, Fragment, useContext, useState, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import { useFolderStyles } from "./styles";
import { DocumentContext } from "./context";
import { GroupItemType, GroupType } from "./types";
import { retriveFileStatus } from "./utils";

export const Folder: FC<
  GroupItemType & { groupLabel: string; groupID: string }
> = ({ docLabel, docDescription, status, docID, groupLabel, groupID }) => {
  const classes = useFolderStyles();
  const docContext: any = useContext(DocumentContext);
  let currentStatus = retriveFileStatus(status);

  const defaultView = useCallback(
    (currentStatus) => {
      if (currentStatus === "empty") {
        docContext.setUploadPath({
          groupID: groupID,
          docID: docID,
          path: [groupLabel, docLabel],
        });
      } else {
        docContext.setViewPath({
          groupID: groupID,
          docID: docID,
          path: [groupLabel, docLabel],
        });
      }
    },
    [groupID, groupLabel, docID, docLabel]
  );

  return (
    <Card className={classes.root}>
      <Box display="flex">
        <Chip
          className={clsx(classes.chip, classes[currentStatus])}
          size="small"
          label={currentStatus}
          variant="outlined"
        />
        <Box flexGrow={1} />
        {currentStatus !== "empty" ? (
          <FolderOptions
            classes={classes}
            reuploadDocsFn={() => defaultView("empty")}
          />
        ) : null}
      </Box>
      <CardActionArea onClick={() => defaultView(currentStatus)}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {docLabel}
          </Typography>
          <Typography gutterBottom variant="body1">
            {docDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

//Rendering folders under a group

const FoldersGroup: FC<{ oneGroup: GroupType }> = ({ oneGroup }) => {
  let renderedFolders = oneGroup.items.map((one) => (
    <Folder
      key={one.docID}
      {...one}
      groupLabel={oneGroup.groupLabel}
      groupID={oneGroup.groupCode}
    />
  ));
  return (
    <div>
      <Typography variant="h6">{oneGroup.groupLabel}</Typography>
      <div style={{ display: "flex", margin: "8px", flexWrap: "wrap" }}>
        {renderedFolders}
      </div>
    </div>
  );
};

//rendering all folders with groups
export const Folders: FC<{ metaData: GroupType[] }> = ({ metaData }) => {
  const groups = metaData.map((one, index) => (
    <FoldersGroup oneGroup={one} key={index} />
  ));
  return <div>{groups}</div>;
};

const FolderOptions = ({ classes, reuploadDocsFn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <IconButton className={classes.iconMargin} onClick={openMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        <MenuItem key="reupload" onClick={reuploadDocsFn}>
          Reupload
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
