import { FC, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { GroupItemType } from "./types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import clsx from "clsx";
import { DocumentContext } from "./context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    margin: theme.spacing(1),
  },
  iconMargin: {
    padding: theme.spacing(1),
  },
  typoMargin: {
    padding: theme.spacing(1),
    paddingLeft: 0,
  },
  fullHeight: {
    height: "100%",
  },
  chip: {
    borderRadius: 0,
    border: "0px",
    fontWeight: "bold",
  },
  rejected: {
    color: "#dc3545",
  },
  pending: {
    color: "#007bff",
  },
  verified: {
    color: "#26a456",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));

export const GroupItem: FC<GroupItemType> = ({
  docLabel,
  docDescription,
  status,
  docID,
}) => {
  const classes = useStyles();
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
