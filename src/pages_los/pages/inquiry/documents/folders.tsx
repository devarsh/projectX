import { FC, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import { useFolderStyles } from "./styles";
import { DocumentContext } from "./context";
import { GroupItemType, GroupType } from "./types";

export const Folder: FC<GroupItemType> = ({
  docLabel,
  docDescription,
  status,
  docID,
}) => {
  const classes = useFolderStyles();
  const docContext: any = useContext(DocumentContext);
  let currentStatus = "empty";

  if (status === "P") {
    currentStatus = "pending";
  } else if (status === "R") {
    currentStatus = "rejected";
  } else if (status === "V") {
    currentStatus = "verified";
  }

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
          <IconButton className={classes.iconMargin}>
            <MoreVertIcon />
          </IconButton>
        ) : null}
      </Box>
      <CardActionArea
        onClick={() =>
          docContext.setCurrentView(
            currentStatus === "empty" ? "upload" : "filesView"
          )
        }
      >
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

//Rendering folders

const FoldersGroup: FC<{ oneGroup: GroupType }> = ({ oneGroup }) => {
  let renderedFolders = oneGroup.items.map((one) => (
    <Folder key={one.docID} {...one} />
  ));
  console.log(oneGroup);
  return (
    <div>
      <Typography variant="h6">
        {Boolean(oneGroup.groupLabel)
          ? oneGroup.groupLabel
          : oneGroup.groupName}
      </Typography>
      <div style={{ display: "flex", margin: "8px", flexWrap: "wrap" }}>
        {renderedFolders}
      </div>
    </div>
  );
};

export const AllFolders: FC<{ metaData: GroupType[] }> = ({ metaData }) => {
  const groups = metaData.map((one, index) => (
    <FoldersGroup oneGroup={one} key={index} />
  ));
  return <div>{groups}</div>;
};
